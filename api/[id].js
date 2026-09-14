const API_URL = 'https://api.tenrai.org/v1';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: 'Anime ID is required',
    });
  }

  try {
    const response = await fetch(`${API_URL}/anime/${id}`);

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
    console.error('Tenrai API error:', error);

    return res.status(500).json({
      error: 'Failed to fetch anime',
    });
  }
}