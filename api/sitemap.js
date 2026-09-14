const SITE_URL = 'https://react-vert-theta.vercel.app';
const API_URL = 'https://api.tenrai.org/v1';

export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_URL}/top/anime?page=1`);

    if (!response.ok) {
      throw new Error('Failed to fetch anime');
    }

    const result = await response.json();

    const animeList = result.data || [];

    const urls = [
      `${SITE_URL}/`,
      ...animeList
        .filter((anime) => anime.mal_id)
        .map(
          (anime) =>
            `${SITE_URL}/anime/${anime.mal_id}`
        ),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join('\n')}
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