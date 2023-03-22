import Link from 'next/link'
import Image from 'next/image'

export default function Stories(posts) {
  return Object.values(posts).map((post, index) => (
    <Link href={`/stories/${post.slug}`} key={index}>
      <Image src={post.logo.src} alt={post.logo.alt} width={160} height={56} />
    </Link>
  ))
}
