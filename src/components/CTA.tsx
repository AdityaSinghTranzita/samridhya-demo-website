'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const footerLinks = [
    'Instant Personal Loan',
    'Instant Business Loan',
    'EMI Calculator',
    'Best Instant Loan App Online',
    'Loan in 10 Minutes',
    'Apply for Business Loan Online',
    'Emergency Loan App',
    'Online Digital Loan App',
    'Personal Loan App',
    'Instant Loan App',
    'Small Business Loan App',
    'Loan Without CIBIL Check',
];

const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
];

export default function CTA() {
    return (
        <footer className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
            {/* Fancy top arc background */}
            <div className="absolute top-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg className="relative block w-[calc(150%+1.3px)] h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.39C206.47,31.09,102.72,15.3,0,0V120H1200V0C1054.91,12.52,927.58,32.18,785.18,57.62,643.61,83,487.43,115.94,321.39,56.39Z" fill="currentColor" className="text-[#1e3a8a]"/>
                </svg>
            </div>

            {/* Animated blobs */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-lighten blur-3xl animate-[ping_12s_infinite]" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-lighten blur-3xl animate-[ping_18s_infinite_1s]" />
                <div className="absolute bottom-1/2 left-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-lighten blur-3xl animate-[ping_16s_infinite_2s]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo & Summary */}
                    <div>
                        <h4 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                            Samridhya
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                            ONDC-registered digital loan platform. Secure, fast, and paperless loans backed by leading financial institutions. 100% compliant and trusted by thousands.
                        </p>
                        <div className="flex mt-6 space-x-3">
                            {socialLinks.map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="text-white/70 hover:text-white hover:scale-110 transition-transform duration-200 text-2xl"
                                    title={social.name}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-cyan-300">Quick Links</h5>
                        <ul className="space-y-3">
                            {footerLinks.slice(0, 6).map((link, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-white/70 hover:text-white transition duration-200 text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Services */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-purple-300">More Services</h5>
                        <ul className="space-y-3">
                            {footerLinks.slice(6).map((link, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-white/70 hover:text-white transition duration-200 text-sm">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 text-green-300">Subscribe</h5>
                        <p className="text-white/70 text-sm mb-3">Get the latest on offers, tips, and updates</p>
                        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent px-4 py-2 w-full text-sm text-white placeholder-white/50 focus:outline-none"
                            />
                            <button className="bg-gradient-to-r from-cyan-400 to-purple-400 px-4 text-white hover:scale-105 transition-transform">
                                →
                            </button>
                        </div>
                        <div className="mt-6 space-y-2 text-sm text-white/70">
                            <p>✓ RBI Regulated</p>
                            <p>✓ 256-bit SSL Secured</p>
                            <p>✓ ONDC Registered</p>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="mt-16 pt-6 border-t border-white/10 text-sm text-white/60 flex flex-col md:flex-row justify-between gap-4">
                    <span>© {new Date().getFullYear()} Samridhya. All rights reserved.</span>
                    <div className="flex flex-wrap gap-4">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Cookie Policy</Link>
                        <Link href="#" className="hover:text-white">Support</Link>
                    </div>
                </div>
            </div>

            {/* Bottom arc */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(150%+1.3px)] h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.39C206.47,31.09,102.72,15.3,0,0V120H1200V0C1054.91,12.52,927.58,32.18,785.18,57.62,643.61,83,487.43,115.94,321.39,56.39Z" fill="white"/>
                </svg>
            </div>
        </footer>
    );
}