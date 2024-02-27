import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const user = searchParams.get('user')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  // query is "hello" for /api/search?query=hello
  const url = `http://localhost:8080/stats/weekly/?user=${user}&start=${start}&end=${end}` // stubs
  // const url = `http://localhost:5050/stats/weekly/?user=${user}&start=${start}&end=${end}`
  const response = await fetch(url, {
    headers: {
      'API-Key': process.env.DATA_API_KEY!,
    },
  })
  return response
}
