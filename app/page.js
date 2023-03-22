'use client'

import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect, useState, Suspense } from 'react'
import Stories from '@/components/stories'
import Solutions from '@/components/solutions'

export default function Home() {
  const [stories, setStories] = useState(null)
  const [solutions, setSolutions] = useState(null)

  const lenis = useLenis(undefined, undefined, undefined)

  function handleClick(target) {
    lenis.scrollTo(target)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    fetch('http://localhost:3000/api/stories')
      .then((res) => res.json())
      .then((data) => setStories(data))

    fetch('http://localhost:3000/api/solutions')
      .then((res) => res.json())
      .then((data) => setSolutions(data))
  }, [])

  return (
    <ReactLenis
      root
      options={{
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <header className="pointer-events-none fixed flex w-full items-center justify-between p-4 lg:p-10">
        <Link
          href={''}
          className="brand pointer-events-auto"
          onClick={() => handleClick(0)}
        >
          <Image
            src={'/logo.svg'}
            alt={'logo'}
            width={160}
            height={40}
            style={{ width: 'auto' }}
          />
          <span className="sr-only">Global Electronics</span>
        </Link>
        <p className="w-36 text-right font-display text-lg font-black uppercase leading-4 tracking-wide lg:w-40 lg:text-xl lg:leading-5">
          Celebrating <span className="text-primary">30 years</span> of{' '}
          <span className="text-primary">innovation</span>
        </p>
      </header>

      <button className="fixed bottom-4 left-4 h-14 w-14 rounded-full bg-primary lg:hidden">
        <span className="sr-only">Menu</span>
      </button>

      <main>
        <article
          id="journey"
          className="container grid h-screen place-items-center text-center"
          aria-labelledby="journey-title"
        >
          <div className="max-w-md lg:max-w-2xl">
            <h1
              id="journey-title"
              className="mb-3 overflow-hidden text-6xl lg:mb-6 lg:text-9xl lg:leading-[0.8275]"
            >
              Journey from
              <br />
              micro to macro
            </h1>
            <p className="lg:px-20 lg:text-xl">
              Making an impact in creating successful electronics since 1993.
            </p>
          </div>
        </article>
        <article
          id="introduction"
          className="container grid h-screen place-items-center text-center"
          aria-labelledby="introduction-title"
        >
          <div className="max-w-lg lg:max-w-3xl">
            <h1 id="introduction-title" className="sr-only">
              Introduction
            </h1>
            <p className="lg:px-20 lg:text-xl">
              With the increasing advancements in technology, components are
              getting smaller and faster every day.
              <br />
              <br />
              Despite their reducing size, they have a significant impact on our
              lives, vastly improving the way we communicate and interact with
              the world around us, from medical advances to transportation,
              communications and entertainment.
            </p>
          </div>
        </article>
        <article
          id="solutions"
          className="container grid h-screen place-items-center text-center"
          aria-labelledby="introduction-title"
        >
          <div className="max-w-md lg:max-w-2xl">
            <h1
              id="solutions-title"
              className="mb-3 overflow-hidden text-6xl lg:mb-6 lg:text-9xl lg:leading-[0.8275]"
            >
              Solutions
            </h1>
            <p className="px-10 lg:px-20 lg:text-xl">
              From prototyping to assembling successful products.
            </p>
          </div>
          <Solutions {...solutions} />
        </article>
        <article
          id="stories"
          className="container grid h-screen items-center justify-start"
          aria-labelledby="stories-title"
        >
          <div className="max-w-md lg:max-w-2xl">
            <h1
              id="stories-title"
              className="mb-3 overflow-hidden text-6xl lg:mb-6 lg:text-9xl lg:leading-[0.8275]"
            >
              Stories
            </h1>
            <p className="lg:pr-40 lg:text-xl">
              We assemble electronics for renowned clients in the high-tech
              market. Since 1993 we have evolved from EMS to a full fulfillment
              partner. As a committed partner, we realize the assembly of
              high-quality products at the lowest possible cost.
            </p>
            <Stories {...stories} />
          </div>
        </article>
        <article
          id="expertise"
          className="container grid h-screen items-end justify-end pb-40"
          aria-labelledby="expertise-title"
        >
          <div className="max-w-md lg:max-w-2xl">
            <h1
              id="expertise-title"
              className="mb-3 overflow-hidden text-6xl lg:mb-6 lg:pl-40 lg:text-9xl lg:leading-[0.8275]"
            >
              Expertise
            </h1>
            <p className="lg:pl-40 lg:text-xl">
              Our team of skilled engineers and technicians have the technical
              expertise to design and produce high quality, reliable electronics
              that meet the client&apos;s needs.
              <br />
              <br />
              We use the latest methods, materials and test equipment to ensure
              the long-term reliability of our products.
            </p>
          </div>
        </article>
        <article
          id="ideas"
          aria-labelledby="ideas-title"
          className="container relative grid h-screen place-items-center text-center"
        >
          <div className="max-w-md lg:max-w-3xl">
            <h1
              id="ideas-title"
              className="text-9xl leading-none lg:mb-6 lg:text-[400px] lg:leading-[0.8275]"
            >
              Ideas
            </h1>
            <p className="lg:px-20 lg:text-xl">
              As technology advances, it will open up new opportunities for
              companies to innovate and build even more efficient products.
            </p>
          </div>
          {/*<Image*/}
          {/*  className='absolute left-4 top-1/2 aspect-[3/2] scale-50 object-cover lg:scale-100'*/}
          {/*  src='https://images.unsplash.com/photo-1501522774256-bd04816aaf24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'*/}
          {/*  alt=''*/}
          {/*  width={440}*/}
          {/*  height={360}*/}
          {/*/>*/}

          {/*<Image*/}
          {/*  className='absolute left-1/4 bottom-1/2 -z-20 aspect-[1/1] object-cover'*/}
          {/*  src='https://images.unsplash.com/photo-1532356884227-66d7c0e9e4c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'*/}
          {/*  alt=''*/}
          {/*  width={320}*/}
          {/*  height={320}*/}
          {/*/>*/}

          {/*<Image*/}
          {/*  className='absolute right-[5%] top-1/4 -z-10 aspect-[1/1] object-contain'*/}
          {/*  src='https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'*/}
          {/*  alt=''*/}
          {/*  width={440}*/}
          {/*  height={360}*/}
          {/*/>*/}
        </article>
        <article
          id="connections"
          className="container grid h-screen place-items-center text-center"
          aria-labelledby="connections-title"
        >
          <div className="max-w-md lg:max-w-2xl">
            <h1
              id="connections-title"
              className="mb-3 overflow-hidden text-6xl lg:mb-6 lg:text-9xl lg:leading-[0.8275]"
            >
              Connections
              <br /> & Future
            </h1>
            <p className="lg:px-20 lg:text-xl">
              The world is changing rapidly and so do we. The future of EMS will
              open up new possibilities and make our on-demand experience more
              efficient and seamless.
            </p>
          </div>
        </article>
      </main>
      <footer className="container grid h-screen place-items-center text-center">
        <div className="">
          <h1 className="overflow-hidden text-6xl lg:mb-6 lg:text-9xl lg:leading-[0.8275]">
            READY TO BUILD A<br /> FUTURE WITH US
          </h1>
          <p className="mb-8 lg:px-20 lg:text-xl">We love to be challenged.</p>
          <a
            href="#"
            className="inline-block bg-primary px-8 py-4 font-display text-xl font-medium uppercase leading-[0.8275]"
          >
            Get in touch
          </a>
        </div>
      </footer>
    </ReactLenis>
  )
}
