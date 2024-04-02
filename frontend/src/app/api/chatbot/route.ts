import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Await the resolution of the entire request body as an ArrayBuffer
  const body = await request.arrayBuffer(); 

  // Decode and parse the body as JSON
  const message = JSON.parse(new TextDecoder().decode(body));

  const url = `${process.env.OPENAI_API_URL}/chat/completions`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: 'system', content: 'You are a user' }, { role: 'user', content: message }],
    }),
  });
  const { choices } = await response.json();
  const reply = choices[0].message.content;

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const user = searchParams.get('user')
  const url = `${process.env.OPENAI_API_URL}/chat/${user}`
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });
  return response;
}