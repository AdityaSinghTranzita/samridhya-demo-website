"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    review: "The loan process was quick and hassle-free. Got approved in just a day!",
    name: "Amit Sharma",
    role: "Small Business Owner",
    rating: 5,
    avatar: "AS",
  },
  {
    review: "I've never experienced such a seamless experience for a personal loan.",
    name: "Sneha Reddy",
    role: "IT Professional",
    rating: 5,
    avatar: "SR",
  },
  {
    review: "Great customer service and easy-to-understand terms. Highly recommend!",
    name: "Ravi Verma",
    role: "Freelancer",
    rating: 5,
    avatar: "RV",
  },
  {
    review: "The app is super intuitive and helpful. I got my loan in no time.",
    name: "Meena Joshi",
    role: "Homemaker",
    rating: 5,
    avatar: "MJ",
  },
  {
    review: "Simple process, low interest, and instant support. Loved the experience.",
    name: "Tushar Jain",
    role: "Startup Founder",
    rating: 5,
    avatar: "TJ",
  },
  {
    review: "I was hesitant at first, but it was way easier than expected.",
    name: "Neha Kulkarni",
    role: "Marketing Manager",
    rating: 5,
    avatar: "NK",
  },
]

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [total])

  // Touch gesture handlers
  let touchStartX = 0
  let touchEndX = 0
  const minSwipeDistance = 50

  function onTouchStart(e: React.TouchEvent) {
    touchStartX = e.changedTouches[0].screenX
  }

  function onTouchMove(e: React.TouchEvent) {
    touchEndX = e.changedTouches[0].screenX
  }

  function onTouchEnd() {
    if (touchStartX - touchEndX > minSwipeDistance) {
      setCurrent((prev) => (prev + 1) % total)
    }
    if (touchEndX - touchStartX > minSwipeDistance) {
      setCurrent((prev) => (prev - 1 + total) % total)
    }
  }

  const goLeft = () => setCurrent((prev) => (prev - 1 + total) % total)
  const goRight = () => setCurrent((prev) => (prev + 1) % total)

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = -1; i <= 1; i++) {
      const index = (current + i + total) % total
      visible.push({ ...testimonials[index], position: i, originalIndex: index })
    }
    return visible
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-32 px-4 sm:px-10 lg:px-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their
            experience.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <motion.button
            onClick={goLeft}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </motion.button>

          <motion.button
            onClick={goRight}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </motion.button>

          {/* Testimonial Cards */}
          <div
            className="relative h-[420px] flex items-center justify-center overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {getVisibleTestimonials().map((testimonial, idx) => {
              const isCenter = testimonial.position === 0
              const isLeft = testimonial.position === -1
              const isRight = testimonial.position === 1

              return (
                <motion.div
                  key={`${testimonial.originalIndex}-${current}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    x: testimonial.position * 340,
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : 0.6,
                    zIndex: isCenter ? 30 : 10,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 35,
                    mass: 0.8,
                  }}
                  className="absolute w-80 max-w-sm"
                >
                  <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out group">
                    {/* Quote Icon */}
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-lg">
                        <Quote className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>

                    {/* Stars */}
                    <motion.div
                      className="flex justify-center mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.4 + i * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Review Text */}
                    <motion.p
                      className="text-gray-700 leading-relaxed mb-8 italic font-medium text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                      "{testimonial.review}"
                    </motion.p>

                    {/* User Info */}
                    <motion.div
                      className="flex items-center justify-center space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </motion.div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/5 to-indigo-400/5 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                  idx === current ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: idx === current ? 1.25 : 1,
                  opacity: idx === current ? 1 : 0.7,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="text-lg text-gray-600 mb-6">Ready to join thousands of satisfied customers?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
