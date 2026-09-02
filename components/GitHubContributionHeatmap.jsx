import React, { useEffect, useState } from 'react';

const LEVEL_COLORS = [
  '#161b33', // level 0 (empty)
  '#0e4429', // level 1
  '#006d32', // level 2
  '#26a641', // level 3
  '#39d353'  // level 4
];

export default function GitHubContributionHeatmap({ username = 'patil-08' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        let res = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`);
        if (!res.ok) {
          // Fallback if local API route is not hosted
          res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load GitHub activity');
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [username]);

  if (loading) {
    return (
      <div style={{ padding: '1rem', fontFamily: 'var(--mono, monospace)', fontSize: '11px', color: 'var(--t2, #6d7e9c)' }}>
        Loading real GitHub contribution activity...
      </div>
    );
  }

  if (error || !data?.contributions) {
    return (
      <div style={{ padding: '1rem', fontFamily: 'var(--mono, monospace)', fontSize: '11px', color: '#ef4444' }}>
        Unable to load contributions ({error}). Please check GitHub username @{username}.
      </div>
    );
  }

  // Group contributions into 7-day columns (weeks)
  const days = data.contributions;
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const totalContributions = data.total?.lastYear ?? days.reduce((acc, d) => acc + (d.count || 0), 0);

  return (
    <div className="github-heatmap-container" style={{ marginTop: '1.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--mono, monospace)', color: 'var(--blue, #3b82f6)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          GitHub Contributions // @{username}
        </div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--mono, monospace)', color: 'var(--t2, #6d7e9c)' }}>
          <b style={{ color: 'var(--t0, #f0f3fa)' }}>{totalContributions}</b> contributions in the last year
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '0.4rem' }}>
        <div style={{ display: 'inline-flex', gap: '3px', background: 'var(--bg1, #0a0d1a)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--bd, #1c233d)' }}>
          {weeks.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
                    transition: 'transform 0.15s ease'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.6rem', fontSize: '10px', fontFamily: 'var(--mono, monospace)', color: 'var(--t3, #3b4666)' }}>
        <span>Less</span>
        {LEVEL_COLORS.map((col, idx) => (
          <div key={idx} style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: col }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
