import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
      <header className="pointer-events-none fixed z-50 flex w-full items-center justify-between p-4 lg:p-10">
        <Link href={''} className="brand pointer-events-auto">
          <Image
            src={'/logo.svg'}
            alt={'logo'}
            width={160}
            height={40}
            style={{ width: 'auto' }}
          />
          <span className="sr-only">Global Electronics</span>
        </Link>
      </header>
      <main
        className="main relative isolate grid h-screen items-end justify-center after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:to-black"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div className="container max-w-4xl pb-32">
          <Image
            className="mb-4"
            src={post.logo.src}
            alt={post.logo.alt}
            width={160}
            height={56}
          />
          <p className="lg:text-xl lg:leading-normal">{post.description}</p>
        </div>
        <Image
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={post.image.src}
          alt={post.image.alt}
          width={1920}
          height={1080}
        />
      </main>
    </>
  )
}
