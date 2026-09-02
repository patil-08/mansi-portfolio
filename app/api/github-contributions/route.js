export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'patil-08';

  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: `GitHub contributions API returned ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch GitHub contributions', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
