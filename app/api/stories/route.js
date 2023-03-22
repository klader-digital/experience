import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const data = [
    {
      title: 'Bronkhorst',
      slug: 'bronkhorst',
      description:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nunc.',
      logo: {
        src: '/images/stories/logo/bronkhorst.svg',
        alt: 'Bronkhorst logo',
      },
      image: {
        src: '/images/stories/bronkhorst.png',
        alt: 'Bronkhorst image',
      },
    },
  ]

  if (slug) {
    // find the solution
    const stories = data.find((storie) => storie.slug === slug)
    return NextResponse.json(stories)
  }

  return new Response(JSON.stringify(data))
}
