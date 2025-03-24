import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const subscription = await request.json();

  // Forward the subscription to the backend server
  const response = await fetch('http://localhost:3001/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}