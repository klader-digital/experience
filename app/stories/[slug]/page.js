import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = await fetch(`http://localhost:3000/api/stories/`).then((res) =>
    res.json()
  )

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function getPost(slug) {
  return await fetch(`http://localhost:3000/api/stories/?slug=${slug}`).then(
    (res) => res.json()
  )
}

export default async function Page({ params: { slug } }) {
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <main className="container">
        <Image
          src={post.logo.src}
          alt={post.logo.alt}
          width={160}
          height={56}
        />
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <Image
          src={post.image.src}
          alt={post.image.alt}
          width={720}
          height={560}
        />
      </main>
    </>
  )
}