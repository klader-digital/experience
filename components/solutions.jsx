import Link from 'next/link'
import Image from 'next/image'

export default function Solutions(posts) {
  return Object.values(posts).map((post, index) => (
    <Link href={`/solutions/${post.slug}`} key={index}>
      <Image
        src={post.image.src}
        alt={post.image.alt}
        width={320}
        height={320}
      />
    </Link>
  ))
}
