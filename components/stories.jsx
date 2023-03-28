import Link from 'next/link'
import Image from 'next/image'

export default function Stories(posts) {
  return (
    <div className="mt-10 flex flex-wrap gap-10">
      {Object.values(posts).map((post, index) => (
        <Link href={`/stories/${post.slug}`} key={index} className="group">
          <Image
            src={post.logo.src}
            alt={post.logo.alt}
            width={160}
            height={56}
            className="h-14 w-40 object-contain opacity-50 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        </Link>
      ))}
      <small className="basis-full leading-snug opacity-25">
        *New tech initiatives and companies can also get in touch to start with
        an initial capacity of 5-25 PCBA product series.
      </small>
    </div>
  )
}
