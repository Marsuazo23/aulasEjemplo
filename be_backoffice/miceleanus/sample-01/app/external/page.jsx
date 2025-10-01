'use client';
import React, { useEffect, useState } from 'react';

export default function RolesPage() {
  const [data, setData] = useState({ idToken: '', accessToken: '', idTokenRoles: [], accessTokenRoles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/roles')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando roles...</p>;

  return (
    <div>
      <h3>Roles ID Token:</h3>
      <ul>
        {data.idTokenRoles.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <h3>Roles Access Token:</h3>
      <ul>
        {data.accessTokenRoles.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <h3>ID Token:</h3>
      <pre>{data.idToken}</pre>

      <h3>Access Token:</h3>
      <pre>{data.accessToken}</pre>
    </div>
  );
}
