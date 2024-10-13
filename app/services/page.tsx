"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Users, Baby, Building2, ShoppingBag } from 'lucide-react'

const services = [
  { id: 1, name: 'Wedding Photography', price: 50000, offerPrice: 45000, image: '/wedding/_05A4300.jpg', icon: Users },
  { id: 2, name: 'Prewedding Photography', price: 10000, offerPrice: 8500, image: '/engagement/2.jpg', icon: Camera },
  { id: 3, name: 'Kids/Baby Photography', price: 15000, offerPrice: 13000, image: '/baby/_05A0574.jpg', icon: Baby },
  { id: 4, name: 'Architecture Photography', price: 25000, offerPrice: 22000, image: '/archicture/26ka_ku26-20241011-0003.webp', icon: Building2 },
  { id: 5, name: 'Commercial Photography', price: 20000, offerPrice: 18000, image: '/commericial/26ka_ku26-20241011-0005.jpg', icon: ShoppingBag },
]

export default function ServicesPage() {
  const [cart, setCart] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error('Error parsing cart:', error)
        setCart([])
      }
    }
  }, [])

  const addToCart = (service) => {
    const newCart = [...cart, service]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    toast({
      title: "Service added to cart",
      description: `${service.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      <motion.p 
        className="text-xl text-center mb-12 text-muted-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore our range of professional photography services tailored to capture your special moments.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <service.icon className="w-6 h-6 mr-2" />
                      {service.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="relative h-48 mb-4 overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300"
                    />
                  </motion.div>
                  <p className="text-muted-foreground mb-2">Professional {service.name.toLowerCase()} services to capture your precious moments.</p>
                  <p className="text-lg font-semibold">
                    <span className="line-through text-muted-foreground">₹{service.price.toLocaleString('en-IN')}</span>
                    {' '}
                    <span className="text-primary">₹{service.offerPrice.toLocaleString('en-IN')}</span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => addToCart(service)} 
                    className="w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-2xl w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedService.name}</h2>
              <Image
                src={selectedService.image}
                alt={selectedService.name}
                width={600}
                height={400}
                className="rounded-lg mb-4"
              />
              <p className="text-lg mb-2">
                <span className="line-through text-muted-foreground">₹{selectedService.price.toLocaleString('en-IN')}</span>
                {' '}
                <span className="text-primary font-semibold">₹{selectedService.offerPrice.toLocaleString('en-IN')}</span>
              </p>
              <p className="mb-4">Detailed description of {selectedService.name} service...</p>
              <Button onClick={() => {
                addToCart(selectedService)
                setSelectedService(null)
              }}>
                Add to Cart
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}