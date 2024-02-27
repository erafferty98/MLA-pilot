import { generateToken } from '../../../utils/tokenUtils'

export async function POST(request: Request) {
  const body = await request.json()
  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
    body: JSON.stringify(body),
  })

  if (res.status === 200) {
    const data = await res.text()
    console.log(data)
    const token = await generateToken(body.username)

    const response = new Response(data, {
      status: 200,
      headers: { 'Set-Cookie': `authToken=${token}; Path=/` },
    })
    return response
  } else {
    return res
  }
}
