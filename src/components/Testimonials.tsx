'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        review: "The loan process was quick and hassle-free. Got approved in just a day!",
        name: "Amit Sharma",
        role: "Small Business Owner",
        rating: 5,
        avatar: "AS",
    },
    {
        review: "I’ve never experienced such a seamless experience for a personal loan.",
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
];

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function TestimonialSection() {
    const repeated = [...testimonials, ...testimonials];
    const motionX = Array.from({ length: repeated.length }, (_, i) => -i * 360);
    motionX.push(0);

    return (
        <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-32 px-6 sm:px-10 lg:px-20  paddings-y-150">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
            </div>

            {/* Glassmorphism edge overlays */}

            <div className="relative max-w-7xl mx-auto text-center">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="overflow-visible relative">

                    <motion.div
                        className="flex gap-10 w-max"
                        animate={{ x: motionX }}
                        transition={{
                            duration: motionX.length * 4,
                            ease: "linear" as const,
                            repeat: Infinity,
                        }}
                    >
                        {repeated.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    rotateX: 3,
                                    rotateY: 3,
                                    y: -10,
                                    transition: {
                                        type: "spring" as const,
                                        stiffness: 200,
                                        damping: 20,
                                    },
                                }}
                                className="group relative min-w-[320px] max-w-sm bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 transition-all duration-300"
                            >
                                {/* Hover gradient border */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                                {/* Quote icon */}
                                <div className="absolute -top-3 left-8">
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-lg">
                                        <Quote className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex justify-center mb-6 mt-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="text-lg text-gray-700 leading-relaxed mb-8 italic font-medium">
                                    "{testimonial.review}"
                                </p>

                                {/* User info */}
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                        {testimonial.avatar}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Subtle glow on hover */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        ))}
                    </motion.div>
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
    );
}
