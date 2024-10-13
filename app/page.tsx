'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Category {
  name: string
  image: string
  gallery: string[]
}

interface Testimonial {
  text: string
  author: string
}

const categories: Category[] = [
  { 
    name: 'Wedding', 
    image: '/wedding/_05A9694.jpg',
    gallery: [
      '/wedding/_05A4271.jpg',
      '/wedding/_05A7557.jpg',
      '/wedding/_05A9547.jpg',
      '/wedding/_AK_8634 (1).jpg',
      '/wedding/6.jpg',
      '/wedding/11.jpg',
    ]
  },
  { 
    name: 'Prewedding', 
    image: '/engagement/4.jpg',
    gallery: [
      '/engagement/1.jpg',
      '/engagement/3.jpg',
      '/engagement/5.jpg',
      '/engagement/7.jpg',
      '/engagement/14.jpeg',
      '/engagement/11.jpg',
    ]
  },
  { 
    name: 'Kids/Baby', 
    image: '/baby/1.jpg',
    gallery: [
      '/baby/_05A0564.jpg',
      '/baby/_05A0574.jpg',
      '/baby/_05A8814.jpg',
      '/baby/2.jpg',
      '/baby/15.jpg',
      '/baby/4.jpg',
    ]
  },
]

const testimonials: Testimonial[] = [
  {
    text: "FairyTalesByKuku captured our wedding beautifully. The photos are stunning and full of emotion. Highly recommended!",
    author: "Samantha"
  },
  {
    text: "The portrait session exceeded my expectations. The photographer made me feel comfortable and the results are amazing!",
    author: "Rajesh"
  },
  {
    text: "As an architect, I appreciate the attention to detail in their architectural photography. They truly understand how to showcase spaces.",
    author: "Mohan Kumar"
  },
  {
    text: "Our family photoshoot was a delightful experience. The photos perfectly capture our bond and personalities.",
    author: "Sanjana"
  },
  {
    text: "The event coverage was exceptional. They didn&apos;t miss a single important moment throughout the night.",
    author: "Kumar"
  },
  {
    text: "I&apos;m in awe of how they captured the essence of our newborn. These photos will be treasured forever.",
    author: "New Parents"
  }
]

const backgroundImages: string[] = [
  '/wedding/_05A4300.jpg',
  '/engagement/2.jpg',
  '/engagement/1.jpg',
  '/baby/_05A0574.jpg',
  '/baby/_05A8814.jpg'
]

interface InfiniteScrollProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children, speed = 50, direction = 'left' }) => {
  const [looperInstances, setLooperInstances] = useState(1)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const setupInstances = () => {
    if (!innerRef?.current || !outerRef?.current) return

    const { width } = innerRef.current.getBoundingClientRect()
    const { width: parentWidth } = outerRef.current.getBoundingClientRect()
    const instanceWidth = width / innerRef.current.children.length

    if (width < parentWidth + instanceWidth) {
      setLooperInstances(looperInstances + Math.ceil((parentWidth + instanceWidth - width) / width))
    }
  }

  useEffect(() => {
    setupInstances()
    window.addEventListener('resize', setupInstances)
    return () => {
      window.removeEventListener('resize', setupInstances)
    }
  }, [])

  useAnimationFrame((t, delta) => {
    if (!innerRef?.current) return
    const xTranslation = Number(innerRef.current.getAttribute('data-translation') || 0) + delta / speed
    innerRef.current.style.transform = `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${direction === 'left' || direction === 'up' ? '-' : ''}${xTranslation}px)`
    innerRef.current.setAttribute('data-translation', xTranslation.toString())
  })

  return (
    <div ref={outerRef} className="relative overflow-hidden">
      <div ref={innerRef} className="flex">
        {Array(looperInstances).fill(children).map((_, i) => (
          <div key={i} className="flex">
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  useEffect(() => {
    const changeBackground = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 5000)

    return () => clearInterval(changeBackground)
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    cursorX.set(event.clientX - 16)
    cursorY.set(event.clientY - 16)
  }

  return (
    <div className="container mx-auto px-4 py-16" onMouseMove={handleMouseMove}>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary mix-blend-difference pointer-events-none z-50"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />

      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Welcome to FairyTalesByKuku</h1>
        <p className="text-xl text-muted-foreground mb-12">Capturing life&apos;s precious moments with creativity and passion</p>
        <div className="relative h-[70vh] mb-12 overflow-hidden">
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentBgIndex ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={image}
                alt={`Background ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Elevate Your Moments</h2>
              <p className="text-xl mb-8">Professional photography services for every occasion</p>
              <Link href="/services">
                <Button size="lg" className="text-lg px-8 py-6">Explore Our Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-4xl font-semibold mb-12 text-center">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className="relative h-96 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={category.image}
                alt={`${category.name} photography`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-3xl font-semibold">{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-3xl font-semibold mb-8 text-center">{selectedCategory.name} Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {selectedCategory.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative h-64"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={image}
                    alt={`${selectedCategory.name} photograph ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      <section className="text-center mb-24">
        <h2 className="text-4xl font-semibold mb-6">Ready to capture your moments?</h2>
        <p className="text-xl text-muted-foreground mb-12">Let&apos;s create beautiful memories together</p>
        <Link href="/contact">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">Get in Touch</Button>
        </Link>
      </section>

      <section className="mb-24">
        <h2 className="text-4xl font-semibold mb-12 text-center">What Our Clients Say</h2>
        <InfiniteScroll>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-secondary p-6 rounded-lg cursor-pointer mx-4 w-80"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg mb-4">&apos;{testimonial.text}&apos;</p>
              <p className="font-semibold">- {testimonial.author}</p>
            </motion.div>
          ))}
        </InfiniteScroll>
      </section>
    </div>
  )
}