'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Prepare email content
    const emailSubject = `Contact Form Submission - ${formData.subject}`;
    const emailBody = `Dear Samridhya Team,

I would like to get in touch regarding the following:

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
        <title>Contact Us - Get in Touch | Samridhya</title>
        <meta name="description" content="Contact Samridhya for any queries about our loan services. We're here to help you with your financial needs." />
        <meta name="keywords" content="contact us, customer support, loan queries, financial assistance" />
        <meta property="og:title" content="Contact Us - Get in Touch | Samridhya" />
        <meta property="og:description" content="Contact Samridhya for any queries about our loan services. We're here to help you with your financial needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samridhya.com/contact" />
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
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-blue-400/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm sm:text-base">24/7 Customer Support</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Get in Touch
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                  We're Here to Help
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Have questions about our loan services? Need assistance with your application? 
                Our dedicated team is ready to help you.
              </motion.p>
            </motion.div>

            {/* Contact Info Cards - Desktop Only */}
            <motion.div
              className="hidden lg:grid grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {contactInfo.map((info, idx) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={idx}
                    className="bg-white/95 backdrop-blur-sm border border-blue-300 rounded-2xl p-6 text-center shadow-lg"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-2">
                      {info.details.map((detail, detailIdx) => (
                        <p key={detailIdx} className="text-gray-700 text-sm">{detail}</p>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{info.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600 text-xs sm:text-sm">We'll get back to you within 24 hours</p>
                </div>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-green-800 font-bold text-base sm:text-lg mb-2">Form Submitted Successfully!</h3>
                  <p className="text-green-700 text-sm sm:text-base mb-3">
                    {isMobile 
                      ? "Email content has been copied to your clipboard. Please follow the instructions below."
                      : "Gmail has been opened with your message. Please send the email to complete your inquiry."
                    }
                  </p>
                  
                  {isMobile && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                      <h4 className="font-semibold text-blue-900 mb-2">📱 Mobile Instructions:</h4>
                      <ol className="text-sm text-blue-800 space-y-1">
                        <li>1. Open your email app (Gmail, Mail, etc.)</li>
                        <li>2. Create a new email</li>
                        <li>3. Send to: <strong>support@samridhya.com</strong></li>
                        <li>4. Subject: <strong>Contact Form Submission - {formData.subject}</strong></li>
                        <li>5. Paste the copied content in the email body</li>
                        <li>6. Send the email</li>
                      </ol>
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs text-gray-600 mb-1">📋 Copied Email Content:</p>
                        <textarea
                          value={emailContent}
                          readOnly
                          className="w-full h-20 text-xs border border-gray-300 rounded p-2 resize-none bg-gray-50"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="loan-inquiry">Loan Inquiry</option>
                        <option value="application-support">Application Support</option>
                        <option value="technical-issue">Technical Issue</option>
                        <option value="general-inquiry">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-gray-900 placeholder-gray-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Mobile Contact Cards */}
                <div className="lg:hidden">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactInfo.map((info, idx) => {
                      const IconComponent = info.icon;
                      return (
                        <motion.div
                          key={idx}
                          className="bg-white/95 backdrop-blur-sm border border-blue-300 rounded-2xl p-4 text-center shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-gray-900 font-bold text-sm mb-2">{info.title}</h4>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIdx) => (
                              <p key={detailIdx} className="text-gray-700 text-xs">{detail}</p>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                        </motion.div>
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

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-sm sm:text-base">Find answers to common questions about our services</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">{faq.question}</h4>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />
      </div>
    </>
  );
} 