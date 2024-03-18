import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const user = searchParams.get('user')
  // query is "hello" for /api/search?query=hello
  const url = `${process.env.ANALYTICS_SERVICE_PATH}/stats/${user}`
  const response = await fetch(url, {
    headers: {
      'API-Key': process.env.DATA_API_KEY!,
    },
  })
  return response
}
