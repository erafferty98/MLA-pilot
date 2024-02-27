export async function POST(request: Request) {
  const body = await request.json()
  const url = `http://activity-tracking/exercises/add`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
    body: JSON.stringify(body),
  })

  return res
}
