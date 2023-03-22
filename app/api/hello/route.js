export async function GET(request) {
  const data = {
    name: 'World',
  }
  return new Response(JSON.stringify(data))
}
