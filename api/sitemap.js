const SITE_URL = 'https://react-vert-theta.vercel.app';
const API_URL = 'https://api.tenrai.org/v1';

export default async function handler(req, res) {
  try {
    const page = Number(req.query.page || 0);

    // /api/sitemap
    // Returns a sitemap index.
    if (page === 0) {
      const response = await fetch(`${API_URL}/anime?page=1`);

      if (!response.ok) {
        throw new Error('Failed to fetch anime pagination');
      }

      const result = await response.json();

      const lastPage =
        result.pagination?.last_visible_page ||
        result.pagination?.last_page ||
        1;

      const sitemapUrls = [];

      for (let i = 1; i <= lastPage; i++) {
        sitemapUrls.push(`
  <sitemap>
    <loc>${SITE_URL}/api/sitemap?page=${i}</loc>
  </sitemap>`);
      }

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/api/sitemap?page=1</loc>
  </sitemap>
${sitemapUrls.slice(1).join('\n')}
</sitemapindex>`;

      res.setHeader('Content-Type', 'application/xml');
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
      );

      return res.status(200).send(xml);
    }

    // /api/sitemap?page=N
    // Returns the actual anime URLs for that page.
    const response = await fetch(`${API_URL}/anime?page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch anime page');
    }

    const result = await response.json();

    const animeList = result.data || [];

    const urls = animeList
      .filter((anime) => anime.mal_id)
      .map(
        (anime) => `  <url>
    <loc>${SITE_URL}/anime/${anime.mal_id}</loc>
  </url>`
      );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
  </url>
${urls.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );

    return res.status(200).send(xml);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send('Failed to generate sitemap');
  }
}