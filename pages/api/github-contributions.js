export default async function handler(req, res) {
  const username = req.query?.username || 'patil-08';
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
    if (!response.ok) {
      return res.status(response.status).json({ error: `GitHub contributions API returned ${response.status}` });
    }
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch GitHub contributions', message: error.message });
  }
}
