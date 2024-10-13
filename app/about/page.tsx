"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Camera, Award, Users, Heart, Aperture, Zap, Focus, Mountain, ScanEye } from 'lucide-react'


const stats = [
  { icon: Camera, value: '100+', label: 'Photo Shoots' },
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: Users, value: '100+', label: 'Happy Clients' },
  { icon: Heart, value: '100+', label: '5-Star Reviews' },
]

const equipment = [
  { icon: Camera, name: 'Canon EOS R5', description: 'High-resolution full-frame mirrorless camera' },
  { icon: Aperture, name: 'Sony A7 III', description: 'Versatile full-frame mirrorless camera' },
  { icon: ScanEye, name: 'DJI Mavic 3', description: 'Professional-grade aerial photography drone' },
  { icon: Zap, name: 'Profoto B10 Plus', description: 'Portable studio lighting solution' },
  { icon: Focus, name: 'Canon RF 50mm f/1.2L USM', description: 'Premium portrait lens' },
  { icon: Mountain, name: 'Sony FE 16-35mm f/2.8 GM', description: 'Wide-angle zoom lens for landscapes' },
]

export default function AboutPage() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About FairyTalesByKaku
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div 
          className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/images/admin.jpeg"
            alt="Karthik - Photographer"
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
        <div>
          <motion.h2 
            className="text-4xl font-semibold mb-6 text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Meet Karthik
          </motion.h2>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              "Hello! I'm Karthik, the passionate photographer behind FairyTalesByKaku. With a keen eye for detail and a love for capturing life's beautiful moments, I've dedicated my career to creating stunning visual stories for my clients.",
              "My journey in photography began over a decade ago, and since then, I've had the privilege of working with countless clients across various genres, including weddings, portraits, architecture, and commercial projects.",
              "At FairyTalesByKaku, we believe that every moment is worth capturing, and every image tells a unique story. Our mission is to provide you with timeless, high-quality photographs that you'll cherish for years to come.",
              "Whether you're looking to document your special day, create stunning portraits, or showcase your business through professional imagery, we're here to bring your vision to life. Let's create something beautiful together!",
            ].map((paragraph, index) => (
              <motion.p 
                key={index} 
                className="text-lg mb-4 text-muted-foreground"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-secondary py-16 rounded-lg shadow-inner mb-16" ref={ref}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={controls}
                  variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1, transition: { delay: index * 0.1 + 0.2, type: 'spring', stiffness: 100 } },
                  }}
                >
                  <stat.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                </motion.div>
                <motion.h3 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: index * 0.1 + 0.4 } },
                  }}
                >
                  {stat.value}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: index * 0.1 + 0.6 } },
                  }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-secondary p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.5 + index * 0.1 } },
              }}
            >
              <div className="flex items-center mb-4">
                <item.icon className="w-8 h-8 mr-4 text-primary" />
                <h3 className="text-xl font-semibold">{item.name}</h3>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
