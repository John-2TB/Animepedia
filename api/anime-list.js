const API_URL = 'https://api.tenrai.org/v1';

export default async function handler(req, res) {
  try {
    const { q, genres, page = 1 } = req.query;

    let url;

    if (q) {
      url = `${API_URL}/anime?q=${encodeURIComponent(q)}&page=${page}`;
    } else if (genres) {
      url = `${API_URL}/anime?genres=${encodeURIComponent(genres)}&page=${page}`;
    } else {
      url = `${API_URL}/top/anime?page=${page}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch anime from Tenrai',
      });
    }

    const data = await response.json();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error('Tenrai anime list error:', error);

    return res.status(500).json({
      error: 'Failed to fetch anime',
    });
  }
}