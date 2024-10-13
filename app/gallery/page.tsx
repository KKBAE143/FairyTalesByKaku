"use client"

import { useState, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const categories = ['All', 'Wedding', 'Prewedding', 'Kids/Baby', 'Architecture', 'Commercial']

interface ImageItem {
  id: number
  src: string
  category: string
}

const initialImages: ImageItem[] = [
  { id: 1, src: '/wedding/1.jpg', category: 'Wedding' },
  { id: 2, src: '/wedding/_05A4300.jpg', category: 'Wedding'},
  { id: 3, src: '/wedding/_05A4271.jpg', category: 'Wedding'},
  { id: 4, src: '/engagement/4.jpg', category: 'Prewedding' },
  { id: 5, src: '/engagement/2.jpg', category: 'Prewedding' },
  { id: 6, src: '/engagement/1.jpg', category: 'Prewedding'  },
  { id: 7, src: '/baby/14.jpg', category: 'Kids/Baby' },
  { id: 8, src: '/baby/_05A0574.jpg', category: 'Kids/Baby'},
  { id: 9, src: '/baby/_05A8814.jpg', category: 'Kids/Baby' },
  { id: 10, src:'/archicture/26ka_ku26-20241011-0005.webp', category: 'Architecture'},
  { id: 11, src:'/archicture/26ka_ku26-20241011-0002.webp', category: 'Architecture'},
  { id: 12, src:'/archicture/26ka_ku26-20241011-0004.webp', category: 'Architecture'},
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(image => image.category === activeCategory)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          const newImage: ImageItem = {
            id: images.length + 1,
            src: result,
            category: activeCategory === 'All' ? 'Other' : activeCategory
          }
          setImages([...images, newImage])
          toast({
            title: "Image uploaded",
            description: "Your image has been successfully added to the gallery.",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">Explore our diverse portfolio of stunning photographs across various categories.</p>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className="text-lg px-6 py-3"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="mb-12 text-center">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <Button onClick={() => fileInputRef.current?.click()} className="text-lg px-6 py-3">
          Upload New Image
        </Button>
      </div>
      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              className="relative h-80 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              layout
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={`${image.category} photograph`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <p className="text-lg font-semibold">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full h-full max-h-[80vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={`${selectedImage.category} photograph`}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}