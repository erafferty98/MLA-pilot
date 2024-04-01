import { NextRequest, NextResponse } from 'next/server';

// Function to handle POST requests specifically for chatbot interactions
export async function POST(request: NextRequest) {
  // Extracting the JSON body from the incoming request
  const body = await request.json();
  // Using the analytics service path for chatbot interactions
  const chatbotUrl = `${process.env.ANALYTICS_SERVICE_PATH}/chatbot`;

  const response = await fetch(chatbotUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!, // Assuming your analytics service requires an API key
    },
    body: JSON.stringify(body), 
  });

  const data = await response.json(); // Parsing the response from your chatbot service

  // Returning a new Response object to conform with Next.js middleware requirements
  return new Response(JSON.stringify(data), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}