"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Tag, X } from 'lucide-react'
import confetti from 'canvas-confetti'

const services = [
  { id: 1, name: 'Wedding Photography', price: 50000, offerPrice: 45000 },
  { id: 2, name: 'Portrait Session', price: 10000, offerPrice: 8500 },
  { id: 3, name: 'Event Coverage', price: 25000, offerPrice: 22000 },
  { id: 4, name: 'Product Photography', price: 15000, offerPrice: 13000 },
  { id: 5, name: 'Aerial Photography', price: 20000, offerPrice: 18000 },
]

const coupons = {
  'SUMMER10': 0.1,
  'FLASH20': 0.2,
  'SPECIAL30': 0.3,
}

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        // Ensure all cart items have the necessary properties
        const validCart = parsedCart.filter(item => 
          item && typeof item === 'object' && 'id' in item && 'name' in item && 'price' in item && 'offerPrice' in item
        )
        setCart(validCart)
      } catch (error) {
        console.error('Error parsing cart:', error)
        setCart([])
      }
    }
  }, [])

  const addToCart = (service) => {
    const newCart = [...cart, { ...service }]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    toast({
      title: "Service added to cart",
      description: `${service.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const getTotalPrice = () => {
    const subtotal = cart.reduce((total, item) => total + (item.offerPrice || 0), 0)
    return subtotal * (1 - appliedDiscount)
  }

  const applyCoupon = () => {
    if (coupons[couponCode]) {
      setAppliedDiscount(coupons[couponCode])
      toast({
        title: "Coupon applied",
        description: `You got a ${coupons[couponCode] * 100}% discount!`,
      })
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (!name || !email || !phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Simulate sending email
    console.log('Sending email to Kakufotography@gmail.com')
    console.log('Order details:', { cart, name, email, phone, total: getTotalPrice() })

    toast({
      title: "Order placed",
      description: "Thank you for your order. We'll contact you soon!",
    })

    // Clear cart and show celebration
    localStorage.removeItem('cart')
    setCart([])
    setShowCelebration(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">
                      <span className="line-through text-muted-foreground">₹{service.price.toLocaleString('en-IN')}</span>
                      {' '}
                      <span className="text-primary">₹{service.offerPrice.toLocaleString('en-IN')}</span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => addToCart(service)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">₹{item.offerPrice?.toLocaleString('en-IN') || 'N/A'}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="destructive" onClick={() => removeFromCart(index)}>Remove</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Your Phone"
                type="tel"
                value={phone}
                