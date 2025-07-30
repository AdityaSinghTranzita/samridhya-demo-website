"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { handleAppDownload } from '@/utils/appStore';

const testimonials = [
  {
    review: "This app made getting a loan incredibly easy. The process was quick, straightforward, and completely transparent—no hidden fees or confusing terms. I was approved fast and got the funds I needed without the usual hassle. Highly recommended for anyone looking for quick, stress-free financing!",
    name: "Ankita Jaiswal",
    role: "25 July 2025",
    rating: 5,
    avatar: "AJ",
  },
  {
    review: "I really like the UI/UX of the Samridhya loan app. The app is clean and super easy to use. The loan process is smooth and quick. Loved the simple design — no confusion, no hassle. Good job!",
    name: "Manjeet Kumar",
    role: "24 July 2025",
    rating: 5,
    avatar: "MK",
  },
  {
    review: "I recently used the Samridhya app to apply for a loan of ₹4 lakhs, and I must say, I am extremely impressed with the entire process! The application was smooth and user friendly. What amazed me the most was the lightning-fast approval — my loan was approved within just 2 hours!",
    name: "Unnati Pandey",
    role: "25 July 2025",
    rating: 5,
    avatar: "UP",
  },
  {
    review: "Great app! Smooth interface, user-friendly, reliable performance, useful features, and responsive support. Highly recommended for daily use!",
    name: "Chandan Pandey",
    role: "24 July 2025",
    rating: 5,
    avatar: "CP",
  },
  {
    review: "The App is fast, secure, and user-friendly for hassle-free loan processing. Quick approval, minimal documentation, and great customer support. Highly recommended",
    name: "Aditya Kumar",
    role: "25 July 2025",
    rating: 5,
    avatar: "AK",
  },
  {
    review: "Samridhya seems legit! They offer super quick and secure loans through the ONDC network, all paperless and hassle-free. Definitely worth checking out if you need a loan ASAP!",
    name: "Rajesh",
    role: "24 July 2025",
    rating: 4,
    avatar: "RA",
  },
  {
    review: "This app is a quick, reliable loan app perfect for instant financial help.",
    name: "Pranshu Agrahari",
    role: "24 July 2025",
    rating: 5,
    avatar: "PA",
  },
  {
    review: "Samridhya made the loan application process smooth and stress-free. The platform felt secure, transparent, and was easy to navigate. With ONDC's backing, trust and accessibility were clearly prioritized.",
    name: "Abhi Saxena",
    role: "25 July 2025",
    rating: 5,
    avatar: "AS",
  },
  {
    review: "Transparent process and smooth experience. No hidden charges, everything clearly explained. A reliable app for instant loans.👍",
    name: "Priya Yadav",
    role: "25 July 2025",
    rating: 5,
    avatar: "PY",
  },
  {
    review: "Easy KYC, flexible EMIs, and disbursal within hours. Trusted by salaried and self-employed individuals. Great for millennials.",
    name: "Virat Saxena",
    role: "24 July 2025",
    rating: 4,
    avatar: "VS",
  },
  {
    review: "Great app. hassle free loans.",
    name: "Divyanshu Maurya",
    role: "25 July 2025",
    rating: 5,
    avatar: "DM",
  },
  {
    review: "Best Instant Personal Loan App - Fast, Secure and Paperless. Its made my loan experience super smooth and hassle-free. The entire process was 100% digital with quick approval and minimal documentation. Its take only 10 mints for approval. If you're looking for instant personal loan or business loan, this app is a great choice. Its Easy to use, safe, and offers multiple lender options with flexible EMIs. Highly recommended for anyone needing a quick and secure digital loan!",
    name: "Nidawaseem",
    role: "24 July 2025",
    rating: 5,
    avatar: "NI",
  },
  {
    review: "Low interest rates. Finally I can get loan offers from all major players in one place. Took a 3 lakhs personal loan and amount was received in my account within an hour. Also I can track my EMI and outstanding amount in the app.",
    name: "Get2abhi",
    role: "24 July 2025",
    rating: 5,
    avatar: "GA",
  },
  {
    review: "Samridhya is a really helpful loan app that makes the whole process stress-free. The app is simple to use, with a clean design and no unnecessary steps. Loan approvals are quick, and the entire process feels smooth from start to finish. Definitely a great option if you need quick financial help without any hassle.",
    name: "RoboJanbaz",
    role: "25 July 2025",
    rating: 5,
    avatar: "RJ",
  },
  {
    review: "Lifesaver during emergencies. I needed urgent money for a medical emergency and this app came through instantly. No long waits, no hidden conditions. Super easy to use and very helpful. Thank you for making the process stress-free.",
    name: "Madhuri1803",
    role: "24 July 2025",
    rating: 5,
    avatar: "MA",
  },
  {
    review: "Fast & Reliable Loan App! Quick approval, easy-to-use interface, and instant disbursal. No hidden charges and great customer support. Highly recommended!",
    name: "Nas.sidd",
    role: "24 July 2025",
    rating: 5,
    avatar: "NS",
  },
  {
    review: "FAST AND RELIABLE. User Experience was amazing, Easy to Understand things, without too much explainatory stuff like other banking apps. Features like referral reward was also amazing.",
    name: "Aditya Kumar Singh",
    role: "22 July 2025",
    rating: 5,
    avatar: "AKS",
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
          <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/*<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />*/}
        {/*<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />*/}
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-[#2b004b] mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#276ef4] to-green-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
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
                      x: testimonial.position * 400,
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
                  className="absolute w-96 max-w-md"
                >
                  <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out group">
                    {/* Quote Icons */}
                    <motion.div
                      className="flex justify-between items-start mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <motion.div
                        className="text-gray-600 opacity-60"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <Quote className="w-6 h-6 transform rotate-180" />
                      </motion.div>
                      <motion.div
                        className="text-gray-600 opacity-60"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.4,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <Quote className="w-6 h-6" />
                      </motion.div>
                    </motion.div>

                    {/* User Info */}
                    <motion.div
                      className="flex flex-col items-center justify-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="text-center mb-3">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                      
                      {/* Stars */}
                      <motion.div
                        className="flex justify-center"
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
                    </motion.div>

                    {/* Review Text */}
                    <motion.div
                      className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                      <p className="text-gray-700 leading-relaxed italic font-medium text-center text-sm sm:text-base">
                        "{testimonial.review}"
                      </p>
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

          {/* Dots Indicator - Hidden on mobile */}
          <div className="hidden sm:flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 sm:w-2 md:w-3 sm:h-2 md:h-3 rounded-full transition-all duration-500 ease-out ${
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
          <p className="text-sm sm:text-base text-gray-600 mb-6">Ready to join thousands of satisfied customers?</p>
          <motion.button
            onClick={handleAppDownload}
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
