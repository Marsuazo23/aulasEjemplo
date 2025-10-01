// app/api/user/roles/route.js
import { getSession, getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const session = await getSession(req, {});
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { accessToken } = await getAccessToken(
    req,
    {},
    {
      audience: 'YOUR_API_IDENTIFIER' // reemplaza con tu API Identifier
    }
  );

  const decodeToken = token => {
    if (!token) return {};
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch {
      return {};
    }
  };

  const namespace = 'https://example.com/claims/';
  const idTokenPayload = decodeToken(session.idToken);
  const accessTokenPayload = decodeToken(accessToken);

  const idTokenRoles = idTokenPayload[namespace + 'roles'] || [];
  const accessTokenRoles = accessTokenPayload[namespace + 'roles'] || [];

  return NextResponse.json({
    idToken: session.idToken,
    accessToken,
    idTokenRoles,
    accessTokenRoles
  });
}
