'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Users, TrendingUp, Star, Phone, Mail, MapPin, Award, Clock, Zap, Globe, Percent, Target, CreditCard, FileText, BarChart3, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import LoanNavbar from '@/components/LoanNavbar';
import CTA from '@/components/CTA';

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentCount = Math.floor(progress * (end - start) + start);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, start, duration]);

  return { count, ref };
};

const features = [
  {
    text: 'Quick Online Loan App – Apply in minutes, get instant approval',
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'text-blue-600'
  },
  {
    text: 'Affordable Interest Rates – Starting at just 9.99% p.a.',
    icon: Percent,
    gradient: 'from-green-500 to-emerald-500',
    accent: 'text-green-600'
  },
  {
    text: 'Custom Offers – Tailored rates based on your financial profile',
    icon: Target,
    gradient: 'from-purple-500 to-violet-500',
    accent: 'text-purple-600'
  },
  {
    text: 'Flexible EMI Options – Choose repayment plans that work for you',
    icon: CreditCard,
    gradient: 'from-orange-500 to-amber-500',
    accent: 'text-orange-600'
  },
  {
    text: '100% Paperless Process – No physical documents needed',
    icon: FileText,
    gradient: 'from-teal-500 to-cyan-500',
    accent: 'text-teal-600'
  },
  {
    text: 'Real-Time Loan Tracking – Stay updated every step of the way',
    icon: BarChart3,
    gradient: 'from-pink-500 to-rose-500',
    accent: 'text-pink-600'
  },
  {
    text: 'Multiple Lender Offers – Compare loans from top banks & NBFCs',
    icon: Building2,
    gradient: 'from-indigo-500 to-blue-500',
    accent: 'text-indigo-600'
  },
  {
    text: 'Business Loans for MSMEs & Self-Employed – Designed for India\'s growth engine',
    icon: TrendingUp,
    gradient: 'from-red-500 to-pink-500',
    accent: 'text-red-600'
  }
];

const stats = [
  { number: 100, label: 'Happy Customers', icon: Users, suffix: '+' },
  { number: 50, label: 'Loans Disbursed', icon: TrendingUp, suffix: 'Lakh+', prefix: '₹' },
  { number: 24, label: 'Customer Support', icon: Phone, suffix: '/7' },
  { number: 4.8, label: 'Customer Rating', icon: Star, suffix: '★', decimal: true }
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    content: 'Samridhya made getting a personal loan incredibly easy. The digital process was smooth and I got approved within minutes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Priya Patel',
    role: 'Business Owner',
    content: 'As a small business owner, I needed quick funding. Samridhya delivered exactly what they promised - fast and hassle-free.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Amit Kumar',
    role: 'Entrepreneur',
    content: 'The comparison feature helped me choose the best loan offer. Highly recommended for anyone looking for transparent financing.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

const team = [
  {
    name: 'Rajesh Mehta',
    role: 'CEO & Founder',
    description: '15+ years in fintech, former executive at leading NBFCs',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face'
  },
  {
    name: 'Sunita Desai',
    role: 'CTO',
    description: 'Expert in digital lending platforms and AI-driven credit assessment',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face'
  },
  {
    name: 'Vikram Singh',
    role: 'Head of Operations',
    description: 'Specializes in regulatory compliance and customer experience',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  }
];

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
      <LoanNavbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-300/40 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          <div className="text-center mb-8 sm:mb-12">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-medium">ONDC Registered & RBI Compliant</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About Samridhya
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                Your Trusted Financial Partner
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Samridhya is an ONDC-registered, RBI-compliant digital loan platform offering fast, 100% paperless approvals. Compare loan offers from top banks and NBFCs — all in one place. Whether personal, business, or GST loans, we simplify smart financing.

            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                const { count, ref } = useCountUp(stat.number, 2000);
                
                const formatNumber = (num: number) => {
                  if (stat.decimal) {
                    return num.toFixed(1);
                  }
                  if (num >= 1000) {
                    return (num / 1000).toFixed(0) + 'K';
                  }
                  return num.toString();
                };

                return (
                  <div key={idx} ref={ref} className="bg-white/90 backdrop-blur-sm border border-blue-300 rounded-2xl p-4 text-center shadow-lg">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700 mb-1">
                      {stat.prefix || ''}{formatNumber(count)}{stat.suffix || ''}
                    </div>
                    <div className="text-blue-500 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-6">
              Our Mission & Vision
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-blue-25 to-cyan-25 rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#2b004b] mb-6">Our Mission</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                To democratize access to credit by making borrowing simple, transparent, and accessible to every Indian. 
                We believe financial inclusion is the key to economic growth and prosperity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Make credit accessible to all</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Provide transparent and fair lending</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Build trust through technology</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo-25 to-purple-25 rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#2b004b] mb-6">Our Vision</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                To become India's most trusted digital lending platform, empowering millions of individuals 
                and businesses with smart, flexible, and affordable financing solutions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Lead the digital lending revolution</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Enable financial inclusion at scale</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="text-indigo-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-700">Create lasting impact on society</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#276EF4]/20 to-cyan-400/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#276EF4]/30 to-purple-400/15 rounded-full blur-2xl -z-10 animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12 text-center">
          <motion.div
            className="mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-6 leading-tight">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-[#276EF4] to-cyan-500 bg-clip-text text-transparent">
                Samridhya
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative bg-white/80 backdrop-blur-sm border border-white/60 hover:border-white/80 p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                  <div className="relative z-10 flex items-start space-x-5">
                    {/* Enhanced icon */}
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-500`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                        {feature.text}
                      </p>

                      {/* Subtle progress indicator */}
                      <div className="mt-4 flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full flex-1 mr-3`}></div>
                        <span className={`text-xs font-semibold ${feature.accent}`}>Verified</span>
                      </div>
                    </div>

                    {/* Check mark positioned absolutely */}
                    <div className="hidden sm:flex hidden md:flex  w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-full items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>

                  </div>

                  {/* Bottom right accent */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom statistics section */}
          <motion.div
            className="mt-12 sm:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-[#276ef4] to-green-500 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Trusted by Thousands of Happy Customers
                </h3>
                <p className="text-white/90 text-lg">
                  Join the growing community of satisfied borrowers who chose Samridhya
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                  <div className="text-white/80">Loans Disbursed</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">₹500Cr+</div>
                  <div className="text-white/80">Amount Funded</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">4.8★</div>
                  <div className="text-white/80">Customer Rating</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">10 Min</div>
                  <div className="text-white/80">Avg. Approval Time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-25 to-blue-25">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-6">
              Meet Our Leadership
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-white/95 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-blue-200/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                  unoptimized
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-6">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white/95 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2b004b] mb-6">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#276EF4] to-cyan-500 rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Call Us</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">1800-123-4567</p>
              <p className="text-xs text-gray-500">24/7 Support</p>
            </motion.div>

            <motion.div
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Email Us</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">support@samridhya.com</p>
              <p className="text-xs text-gray-500">Quick Response</p>
            </motion.div>

            <motion.div
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Visit Us</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Mumbai, Maharashtra</p>
              <p className="text-xs text-gray-500">Head Office</p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
} 