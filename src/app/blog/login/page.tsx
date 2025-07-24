'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.');
      } else {
        // TODO: Redirect to dashboard or use router.replace()
        console.log('Login success:', data);
      }
    } catch (err) {
      setError('Unexpected error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-blue-50"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Image
            src='https://framerusercontent.com/images/eoFn6ZAhFTjiRuWZQ7B34zClMM.png?scale-down-to=512'
            alt="Samridhya Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-blue-800">Welcome to Samridhya Blog</h1>
          <p className="text-blue-600 mt-2">Share your ideas with the world</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-700 mb-2">Email</label>
            <input
              type="email"
              className="text-black w-full p-3 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-700 mb-2">Password</label>
            <input
              type="password"
              className="text-black w-full p-3 border border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white p-3 rounded-lg transition mb-6`}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </form>

        <div className="text-center text-sm text-blue-600">
          <p>
            Not registered?{" "}
            <Link href="/register" className="font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
