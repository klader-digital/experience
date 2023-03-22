import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const data = [
    {
      title: 'Supply chain management.',
      slug: 'supply-chain-management',
      description:
        'Organizations that are part of integrated chains are able to supply more quickly and flexibly. Moreover, they face less inventory and failure costs, score higher in terms of customer satisfaction, are better able to generate sustainability and have more innovative power.',
      image: {
        src: '/images/solutions/supply-chain-management.png',
        alt: 'Supply chain management',
      },
    },
    {
      title: 'Full product assembly',
      slug: 'full-product-assembly',
      description:
        'Work preparation then ensures the rapid integration of data into our systems, so that all departments can get to work quickly. From purchasing to machine programmers and from quality control to final shipment, even worldwide. Your project manager will keep you informed throughout the journey that the product makes.',
      image: {
        src: '/images/solutions/full-product-assembly.png',
        alt: 'Full product assembly',
      },
    },
    {
      title: 'New product introduction',
      slug: 'new-product-introduction',
      description:
        'When introducing a new product (NPI) you obviously want to deliver as soon as possible. This is only feasible if the right choices are made regarding purchase and production. Our project group will pick up your question, analyse the data and then take the necessary steps, together with you.',
      image: {
        src: '/images/solutions/new-product-introduction.png',
        alt: 'New product introduction',
      },
    },
    {
      title: 'Restoring',
      slug: 'restoring',
      description:
        'We work transparently, so the total costs are clear from the start. Through unique software connections with our suppliers (APIs) we quickly understand the most competitive prices, available stocks and the best delivery times.',
      image: {
        src: '/images/solutions/restoring.png',
        alt: 'Restoring',
      },
    },
  ]

  // dynamic route for a single solution
  if (slug) {
    // find the solution
    const solution = data.find((solution) => solution.slug === slug)
    return NextResponse.json(solution)
  }

  // return the post
  return NextResponse.json(data)
}
