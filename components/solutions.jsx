import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Solutions(posts) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.image-map',
        start: 'top bottom+=50%',
        end: 'bottom -25%',
        scrub: true,
        markers: true,
      },
    })
  }, [])

  return (
    <div className="image-map absolute inset-0" ref={ref}>
      {Object.values(posts).map((post, index) => {
        // switch case for index
        let classes =
          'absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-full object-cover'

        switch (index) {
          case 0:
            classes += ' image-one w-[292px] h-[292px]'
            break
          case 1:
            classes += ' image-two w-[81px] h-[81px]'
            break
          case 2:
            classes += ' image-three w-[144px] h-[144px]'
            break
          case 3:
            classes += ' image-four w-[192px] h-[192px]'
            break
        }

        return (
          <div key={post.slug} className={classes}>
            <Link href={`/solutions/${post.slug}`}>
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
