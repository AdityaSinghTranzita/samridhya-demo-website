'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackEvent, trackButtonClick, trackFormSubmission } from '@/utils/analytics';

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 6366234524'],
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Mon-Sat: 9:30 AM - 6:30 PM'
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['support@samridhya.com'],
    gradient: 'from-green-500 to-emerald-500',
    description: 'Response within 24 hours'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['No.1207/343 & 1207/1/343/1, Sierra Cartel, 9th Main,7th Sector, HSR Layout, Bengaluru Urban, Karnataka, 560102'],
    gradient: 'from-purple-500 to-pink-500',
    description: 'By appointment only'
  }
];

const faqs = [
  {
    question: 'How can I apply for a loan?',
    answer: 'Download our mobile app, create an account, and follow the simple application process.'
  },
  {
    question: 'What documents do I need?',
    answer: 'PAN card, Aadhaar card, bank statements, and salary slips or business documents.'
  },
  {
    question: 'How long does approval take?',
    answer: 'Most applications are approved within 10-15 minutes with disbursal within 24 hours.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track contact form submission
    trackFormSubmission('contact_form', {
      form_data: formData,
      submission_source: 'contact_page'
    });
    trackButtonClick('submit_contact_form', 'contact_page', {
      form_type: 'contact_form',
      button_position: 'contact_page'
    });
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Prepare email content
    const emailSubject = `Contact Form Submission - ${formData.subject}`;
    const emailBody = `Dear Samridhya Team,

A new contact form submission has been received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}

I look forward to hearing from you.

Best regards,
${formData.name}`;

    setEmailContent(emailBody);

    // Handle email opening based on device
    if (isMobile) {
      // For mobile, copy email content to clipboard and show instructions
      try {
        navigator.clipboard.writeText(emailBody);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    } else {
      // For desktop, use Gmail web
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=support@samridhya.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailLink, '_blank');
    }
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <>
      <Head>
        <title>Contact Us - Samridhya | Get in Touch for Loan Support</title>
        <meta name="description" content="Contact Samridhya for loan support, queries, and assistance. Call us at +91 6366234524 or email support@samridhya.com. Get expert help with your loan application." />
        <meta name="keywords" content="contact samridhya, loan support, customer service, loan queries, loan assistance, samridhya contact, loan help" />
        <meta name="author" content="Samridhya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Contact Us - Samridhya | Get in Touch for Loan Support" />
        <meta property="og:description" content="Contact Samridhya for loan support, queries, and assistance. Call us at +91 6366234524 or email support@samridhya.com." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/contact/" />
        <meta property="og:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Samridhya - Loan Support" />
        <meta property="og:site_name" content="Samridhya" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Samridhya | Get in Touch for Loan Support" />
        <meta name="twitter:description" content="Contact Samridhya for loan support, queries, and assistance. Call us at +91 6366234524 or email support@samridhya.com." />
        <meta name="twitter:image" content="https://samridhya.com/samridhya-preview.png" />
        <meta name="twitter:image:alt" content="Contact Samridhya - Loan Support" />
        <meta name="twitter:site" content="@samridhya" />
        <meta name="twitter:creator" content="@samridhya" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://samridhya.com/contact/" />

        {/* Mobile Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samridhya" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Samridhya",
              "description": "Contact Samridhya for loan support, queries, and assistance",
              "url": "https://samridhya.com/contact/",
              "mainEntity": {
                "@type": "Organization",
                "name": "Samridhya",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+91-6366234524",
                    "contactType": "customer service",
                    "email": "support@samridhya.com",
                    "availableLanguage": "English"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "No.1207/343 & 1207/1/343/1, Sierra Cartel, 9th Main,7th Sector, HSR Layout",
                  "addressLocality": "Bengaluru Urban",
                  "addressRegion": "Karnataka",
                  "postalCode": "560102",
                  "addressCountry": "IN"
                }
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get in Touch
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                  We're Here to Help
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Have questions about our loan services? Need assistance with your application? 
                Our dedicated team is here to help you every step of the way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <MessageSquare className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    Send us a Message
                  </h2>
                  
                  <p className="text-gray-600 text-sm sm:text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 text-sm">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select a subject</option>
                          <option value="Loan Application">Loan Application</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Mobile Contact Information */}
                <div className="lg:hidden">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  <p className="text-gray-700 leading-relaxed mb-8 text-sm sm:text-base">
                    We're committed to providing exceptional customer service and support. 
                    Our dedicated team is here to help you with any questions or concerns.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, idx) => {
                      const IconComponent = info.icon;
                      return (
                        <div key={idx} className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">{info.title}</h4>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIdx) => (
                                <p key={detailIdx} className="text-gray-700 text-sm">{detail}</p>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop Contact Information */}
                <div className="hidden lg:block">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  <p className="text-gray-700 leading-relaxed mb-8 text-sm sm:text-base">
                    We're committed to providing exceptional customer service and support. 
                    Our dedicated team is here to help you with any questions or concerns.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, idx) => {
                      const IconComponent = info.icon;
                      return (
                        <div key={idx} className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">{info.title}</h4>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIdx) => (
                                <p key={detailIdx} className="text-gray-700 text-sm">{detail}</p>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Business Hours
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Monday - Friday</span>
                      <span className="text-gray-700">9:30 AM - 6:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Saturday</span>
                      <span className="text-gray-700">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Sunday</span>
                      <span className="text-gray-700">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />
      </div>
    </>
  );
}
