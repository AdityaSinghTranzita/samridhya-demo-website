'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Star,
  ArrowLeft,
  Phone,
  User,
  Mail,
  FileText,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CTA from '@/components/CTA';
import { trackCreditScoreCheck, trackEvent, trackButtonClick } from '@/utils/analytics';

interface CreditScoreData {
  credit_score: number;
  report?: any;
  fetched_at?: any;
}

interface UserDetails {
  name: string;
  pan: string;
  email: string;
  gender: string;
}

// API Endpoints
const API_BASE_URL = 'https://buyer.prod.samridh.ai/credit';
const GENERATE_OTP_URL = `${API_BASE_URL}/generate-otp`;
const VERIFY_OTP_URL = `${API_BASE_URL}/verify-otp`;
const SUBMIT_DETAILS_URL = `${API_BASE_URL}/submit-details`;
const GET_SCORE_URL = `${API_BASE_URL}/get-score`;

// Add data validation helper functions
const validateCreditScoreData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  if (!data.credit_score || typeof data.credit_score !== 'number') return false;
  return true;
};

const safeGet = (obj: any, path: string, defaultValue: any = 'N/A') => {
  try {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === null || result === undefined || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[key];
    }
    
    // Handle different data types
    if (result === null || result === undefined) return defaultValue;
    if (typeof result === 'number') return result === 0 ? '0' : result.toString();
    if (typeof result === 'string') return result.trim() === '' ? defaultValue : result;
    return result.toString();
  } catch (error) {
    console.warn(`Error accessing path ${path}:`, error);
    return defaultValue;
  }
};

const safeGetNumber = (obj: any, path: string, defaultValue: number = 0): number => {
  try {
    const value = safeGet(obj, path, defaultValue);
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? defaultValue : num;
    }
    return defaultValue;
  } catch (error) {
    console.warn(`Error getting number for path ${path}:`, error);
    return defaultValue;
  }
};

const hasValidReportData = (creditScoreData: CreditScoreData | null): boolean => {
  if (!creditScoreData || !creditScoreData.report) return false;
  
  // Check if we have any meaningful data in the report
  const hasPersonalInfo = !!creditScoreData.report.Current_Application?.Current_Application_Details?.Current_Applicant_Details;
  const hasAccountData = !!creditScoreData.report.CAIS_Account?.CAIS_Account_DETAILS;
  const hasSummaryData = !!creditScoreData.report.CAIS_Account?.CAIS_Summary;
  
  return hasPersonalInfo || hasAccountData || hasSummaryData;
};

export default function CreditScoreChecker() {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    pan: '',
    email: '',
    gender: 'male'
  });
  const [creditScoreData, setCreditScoreData] = useState<CreditScoreData | null>(null);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [noCreditRecord, setNoCreditRecord] = useState(false);

  // Set mounted state for client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for existing data on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const savedData = getSessionStorage('cibilReportData');
    const savedToken = getSessionStorage('authToken');
    const savedMobile = getSessionStorage('mobileNumber');
    const savedUserDetails = getSessionStorage('userDetails');
    const savedNoCreditRecord = getSessionStorage('noCreditRecord');



    if (savedData) {
      try {
        const scoreData = JSON.parse(savedData);
        setCreditScoreData(scoreData);

        // Also restore auth token and user details if they exist
        if (savedToken) {
          setAuthToken(savedToken);
        }
        if (savedMobile) {
          setMobileNumber(savedMobile);
        }
        if (savedUserDetails) {
          try {
            const userDetails = JSON.parse(savedUserDetails);
            setUserDetails(userDetails);
          } catch (e) {
            console.error('Error parsing saved user details:', e);
          }
        }

        setCurrentStep(5);

      } catch (e) {
        console.error('Error loading saved data:', e);
        removeSessionStorage('cibilReportData');
      }
    } else if (savedNoCreditRecord === 'true') {
      // User has no credit record
      if (savedToken) {
        setAuthToken(savedToken);
      }
      if (savedMobile) {
        setMobileNumber(savedMobile);
      }
      if (savedUserDetails) {
        try {
          const userDetails = JSON.parse(savedUserDetails);
          setUserDetails(userDetails);
        } catch (e) {
          console.error('Error parsing saved user details:', e);
        }
      }
      setNoCreditRecord(true);
      setCurrentStep(6);
    } else if (savedToken && savedMobile && savedUserDetails) {
      // User has token and details but no credit score data, fetch it
      try {
        const userDetails = JSON.parse(savedUserDetails);
        setAuthToken(savedToken);
        setMobileNumber(savedMobile);
        setUserDetails(userDetails);
        setCurrentStep(4);

        // Use setTimeout to ensure state is set before calling fetchCreditScore
        setTimeout(() => {
          fetchCreditScore(savedToken);
        }, 100);
      } catch (e) {
        console.error('Error loading saved user data:', e);
        // Clear invalid data
        clearAllSessionData();
      }
    } else {

    }
  }, []);

  // Sync session data when important state changes
  useEffect(() => {
    if (mounted && (authToken || mobileNumber || userDetails.name || creditScoreData || noCreditRecord)) {
      syncSessionData();
    }
  }, [authToken, mobileNumber, userDetails, creditScoreData, noCreditRecord, mounted]);

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, otpTimer]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const generateOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${GENERATE_OTP_URL}/${mobileNumber}`);
      const data = await response.json();

      if (data.message === 'Success') {
        setCurrentStep(2);
        setOtpTimer(30);
        // Track OTP generation success
        trackEvent('otp_generated', 'credit_score_check', 'mobile_verification');
      } else {
        setError(data.message || 'Failed to send OTP');
        // Track OTP generation failure
        trackEvent('otp_generation_failed', 'credit_score_check', data.message || 'unknown_error');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      // Track OTP generation error
      trackEvent('otp_generation_error', 'credit_score_check', 'network_error');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }


    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${VERIFY_OTP_URL}/${mobileNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();


      if (data.message === 'Success') {
        const token = data.data;
        setAuthToken(token);

        // Store token for future use
        setSessionStorage('authToken', token);
        setSessionStorage('mobileNumber', mobileNumber);

        // Track OTP verification success
        trackEvent('otp_verified', 'credit_score_check', 'mobile_verification');

        // Check if user details exist in the response
        // The API might return user details in different structures
        const userDetails = data.userDetails || data.data?.userDetails || data.user_details;

        if (userDetails && userDetails.name && userDetails.pan) {
          // User details exist, automatically fetch credit score
          const userData = {
            name: userDetails.name,
            pan: userDetails.pan,
            email: userDetails.email || '',
            gender: userDetails.gender || ''
          };

          setUserDetails(userData);

          // Store user details for future use
          setSessionStorage('userDetails', JSON.stringify(userData));

          // Automatically fetch credit score
          setCurrentStep(4);
          await fetchCreditScore(token);
        } else {
          // No user details, proceed to step 3 for manual input
          setCurrentStep(3);
        }

        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
        // Track OTP verification failure
        trackEvent('otp_verification_failed', 'credit_score_check', data.message || 'invalid_otp');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitDetails = async () => {
    if (!userDetails.name || !userDetails.pan || !userDetails.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (userDetails.pan.length !== 10) {
      setError('Please enter a valid 10-character PAN number');
      return;
    }

    setIsLoading(true);
    setError('');
    setCurrentStep(4);

    try {


      // Submit user details
      const submitResponse = await fetch(SUBMIT_DETAILS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: userDetails.name,
          pan: userDetails.pan
        }),
      });

      const submitData = await submitResponse.json();


      // Check for various success messages
      const isSuccess = submitData.message && (
          submitData.message.includes('Success') ||
          submitData.message.includes('successfully') ||
          submitData.message.includes('updated successfully')
      );

      if (isSuccess) {
        // Store user details for future use
        setSessionStorage('userDetails', JSON.stringify(userDetails));

        // Fetch credit score using the new function
        await fetchCreditScore(authToken);
      } else {
        throw new Error(submitData.message || 'Failed to submit details');
      }
    } catch (error) {
      console.error('Submit details error:', error);
      setCurrentStep(3);
      setError('Error submitting details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreditScore = async (token: string) => {
    try {
      console.log('Fetching credit score with token:', token);

      // Get credit score
      const scoreResponse = await fetch(GET_SCORE_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const scoreData = await scoreResponse.json();
      console.log('Credit score API response:', scoreData);

      // Check for various success messages
      const isSuccess = scoreData.message && (
          scoreData.message.includes('Success') ||
          scoreData.message.includes('successfully') ||
          scoreData.message.includes('updated successfully')
      );

      // Check for no credit record messages
      const isNoCreditRecord = scoreData.message && (
          scoreData.message.toLowerCase().includes('no credit record') ||
          scoreData.message.toLowerCase().includes('no credit history') ||
          scoreData.message.toLowerCase().includes('credit record not found') ||
          scoreData.message.toLowerCase().includes('no data found') ||
          scoreData.message.toLowerCase().includes('no record found')
      );

      if (isSuccess && scoreData.data) {
        // Validate the credit score data
        if (!validateCreditScoreData(scoreData.data)) {
          console.error('Invalid credit score data structure:', scoreData.data);
          throw new Error('Invalid credit score data received');
        }

        // Log the data structure for debugging
        console.log('Credit score data structure:', {
          credit_score: scoreData.data.credit_score,
          has_report: !!scoreData.data.report,
          report_keys: scoreData.data.report ? Object.keys(scoreData.data.report) : [],
          has_personal_info: !!scoreData.data.report?.Current_Application?.Current_Application_Details?.Current_Applicant_Details,
          has_account_data: !!scoreData.data.report?.CAIS_Account?.CAIS_Account_DETAILS,
          has_summary: !!scoreData.data.report?.CAIS_Account?.CAIS_Summary
        });

        setCreditScoreData(scoreData.data);
        setSessionStorage('cibilReportData', JSON.stringify(scoreData.data));

        // Track successful credit score retrieval
        trackCreditScoreCheck();
        trackEvent('credit_score_retrieved', 'credit_score_check', 'success', scoreData.data.credit_score);

        // Ensure all session data is stored for future use
        if (authToken) {
          setSessionStorage('authToken', authToken);
        }
        if (mobileNumber) {
          setSessionStorage('mobileNumber', mobileNumber);
        }
        if (userDetails.name) {
          setSessionStorage('userDetails', JSON.stringify(userDetails));
        }

        setCurrentStep(5);
      } else if (isNoCreditRecord || (!scoreData.data && isSuccess)) {
        // Handle no credit record case
        setNoCreditRecord(true);
        setSessionStorage('noCreditRecord', 'true');

        // Track no credit record found
        trackEvent('credit_score_no_record', 'credit_score_check', 'no_credit_history');

        // Store user details for future use
        if (authToken) {
          setSessionStorage('authToken', authToken);
        }
        if (mobileNumber) {
          setSessionStorage('mobileNumber', mobileNumber);
        }
        if (userDetails.name) {
          setSessionStorage('userDetails', JSON.stringify(userDetails));
        }

        setCurrentStep(6);
      } else {
        console.error('Credit score API error:', scoreData);
        throw new Error(scoreData.message || 'Failed to get credit score');
      }
    } catch (error) {
      console.error('Credit score fetch error:', error);
      setCurrentStep(3);
      setError('Error fetching credit score. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to safely access sessionStorage
  const getSessionStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  };

  const setSessionStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  };

  const removeSessionStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  };

  const syncSessionData = () => {
    // Ensure all current state is stored in session storage
    if (authToken) {
      setSessionStorage('authToken', authToken);
    }
    if (mobileNumber) {
      setSessionStorage('mobileNumber', mobileNumber);
    }
    if (userDetails.name) {
      setSessionStorage('userDetails', JSON.stringify(userDetails));
    }
    if (creditScoreData) {
      setSessionStorage('cibilReportData', JSON.stringify(creditScoreData));
    }
    if (noCreditRecord) {
      setSessionStorage('noCreditRecord', 'true');
    }
  };

  const clearAllSessionData = () => {
    removeSessionStorage('cibilReportData');
    removeSessionStorage('authToken');
    removeSessionStorage('mobileNumber');
    removeSessionStorage('userDetails');
    removeSessionStorage('noCreditRecord');
  };

  const resetForm = () => {
    clearAllSessionData();
    setCurrentStep(1);
    setMobileNumber('');
    setOtp(['', '', '', '', '', '']);
    setUserDetails({
      name: '',
      pan: '',
      email: '',
      gender: 'male'
    });
    setAuthToken('');
    setCreditScoreData(null);
    setError('');
    setNoCreditRecord(false);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: 'Excellent Credit Score', color: '#27ae60' };
    if (score >= 750) return { label: 'Very Good Credit Score', color: '#2ecc71' };
    if (score >= 700) return { label: 'Good Credit Score', color: '#f1c40f' };
    if (score >= 650) return { label: 'Fair Credit Score', color: '#f39c12' };
    return { label: 'Poor Credit Score', color: '#e74c3c' };
  };

  const getNeedleAngle = (score: number) => {
    // Map score to angle (0-900 score range to -90 to 90 degrees)
    // Poor: 0-300 (-90 to -54 degrees)
    // Uncertain: 300-500 (-54 to -18 degrees)
    // Fair: 500-650 (-18 to 18 degrees)
    // Good: 650-750 (18 to 54 degrees)
    // Excellent: 750-900 (54 to 90 degrees)

    const clampedScore = Math.max(0, Math.min(900, score));
    const angle = (clampedScore / 900) * 180 - 90;
    return angle;
  };

  const getNeedleAngleNew = (score: number) => {
    // Map score to angle (300-850 score range to -90 to 90 degrees)
    // Poor: 300-579 (-90 to -54 degrees)
    // Fair: 580-669 (-54 to -18 degrees)
    // Good: 670-739 (-18 to 18 degrees)
    // Very Good: 740-799 (18 to 54 degrees)
    // Excellent: 800-850 (54 to 90 degrees)

    const clampedScore = Math.max(300, Math.min(850, score));
    const angle = ((clampedScore - 300) / 550) * 180 - 90;
    return angle;
  };

  const getScoreCategoryNew = (score: number) => {
    if (score >= 800) return { label: 'EXCELLENT', color: '#dc2626' };
    if (score >= 740) return { label: 'VERY GOOD', color: '#f97316' };
    if (score >= 670) return { label: 'GOOD', color: '#eab308' };
    if (score >= 580) return { label: 'FAIR', color: '#16a34a' };
    return { label: 'POOR', color: '#166534' };
  };

  // New functions for the image-based meter design
  const getNeedleAngleImage = (score: number): number => {
    // Map score from 300-850 to angle -90 to 90 degrees
    const minScore = 300;
    const maxScore = 850;
    const minAngle = -90;
    const maxAngle = 90;

    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const angle = ((normalizedScore - minScore) / (maxScore - minScore)) * (maxAngle - minAngle) + minAngle;

    return angle;
  };

  const getScoreRange = (score: number): string => {
    if (score >= 750) return '750 - 850';
    if (score >= 700) return '700 - 750';
    if (score >= 650) return '650 - 700';
    if (score >= 560) return '560 - 650';
    return '300 - 560';
  };

  const getScoreCategoryImage = (score: number): string => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 560) return 'Bad';
    return 'Very Bad';
  };

  const getProgressCircumference = (score: number): number => {
    // Calculate progress percentage (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Calculate circumference (full circle = 339.292)
    const circumference = 339.292;
    return (percentage / 100) * circumference;
  };

  // Semi-circle progress functions
  const getSemiCircleProgress = (score: number): number => {
    // Calculate progress percentage (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Calculate semi-circle arc length (π * radius = 157.08)
    const arcLength = 157.08;
    return (percentage / 100) * arcLength;
  };

  const getMarkerX = (score: number): number => {
    // Calculate marker position on semi-circle (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Map percentage to x coordinate (10 to 110)
    const x = 10 + (percentage / 100) * 100;
    return x;
  };

  const getMarkerY = (score: number): number => {
    // Calculate marker position on semi-circle (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Map percentage to y coordinate on semi-circle
    // Use cosine function to get y position on arc
    const angle = (percentage / 100) * Math.PI;
    const y = 70 - 50 * Math.cos(angle);
    return y;
  };

  const formatDateFromYYYYMMDD = (dateString: string | number) => {
    if (!dateString) return 'N/A';

    const date = dateString.toString();
    if (date.length === 8) {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return 'N/A';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 800) {
      return 'Congratulations! You have an excellent credit score. You are eligible for the best loan and credit card offers with lowest interest rates.';
    } else if (score >= 750) {
      return 'Great job! You have a very good credit score. You qualify for most credit products at competitive rates.';
    } else if (score >= 700) {
      return 'You have a good credit score. You may qualify for most credit products, but may not get the best interest rates. Keep paying your bills on time and maintain low credit utilization to improve your score further.';
    } else if (score >= 650) {
      return 'You are not far from a strong credit score. For the best offers, you should work on improving your score. Do not miss any payments of your credit card bills or loans.';
    } else {
      return 'Your credit score needs improvement. You may have difficulty getting approved for credit products. Focus on paying bills on time and reducing outstanding debt to improve your score.';
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
                <CreditCard className="w-5 h-5 text-white" />
                <span className="text-white/90 font-medium">Free Credit Score Checker</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Check Your Credit Score
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Instantly & Securely
              </span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto mb-8">
                Get your credit score instantly. Our advanced system provides accurate credit insights
                and personalized recommendations based on your financial profile.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Mobile Number Input */}
              {currentStep === 1 && (
                  <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Enter Your Details</h2>
                        <p className="text-gray-600">Start by entering your mobile number</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter your 10-digit mobile number"
                            maxLength={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="terms"
                            defaultChecked
                            className="mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                          By proceeding, I agree to provide personal details and agree to following{' '}
                          <a href="#" className="text-blue-600 hover:underline">Credit Score Terms of Use</a>.
                        </label>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="text-sm text-blue-800">
                        Your Personal Information is 100% secured with us. We do not share your data with any third party.
                      </span>
                        </div>
                      </div>

                      {error && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <span className="text-sm text-red-800">{error}</span>
                            </div>
                          </div>
                      )}

                      <button
                          onClick={generateOtp}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Sending OTP...' : 'Get Free Credit Report'}
                      </button>
                    </div>
                  </motion.div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                  <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Verify Mobile Number</h2>
                        <p className="text-gray-600">OTP sent to +91-{mobileNumber}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          Enter 6-digit OTP
                        </label>
                        <div className="flex gap-3 justify-center">
                          {otp.map((digit, index) => (
                              <input
                                  key={index}
                                  type="text"
                                  value={digit}
                                  onChange={(e) => handleOtpChange(index, e.target.value)}
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  data-index={index}
                                  maxLength={1}
                                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold text-gray-900"
                              />
                          ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {otpTimer > 0
                              ? `Resend OTP in ${otpTimer} seconds`
                              : (
                                  <button
                                      onClick={generateOtp}
                                      className="text-blue-600 hover:underline"
                                  >
                                    Resend OTP
                                  </button>
                              )
                          }
                        </p>
                      </div>

                      {error && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <span className="text-sm text-red-800">{error}</span>
                            </div>
                          </div>
                      )}

                      <button
                          onClick={verifyOtp}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Continue'}
                      </button>
                    </div>
                  </motion.div>
              )}

              {/* Step 3: User Details */}
              {currentStep === 3 && (
                  <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Complete Your Profile</h2>
                        <p className="text-gray-600">Provide your details to get your credit score</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name (as per PAN)
                        </label>
                        <input
                            type="text"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PAN Number
                        </label>
                        <input
                            type="text"
                            value={userDetails.pan}
                            onChange={(e) => setUserDetails(prev => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                            placeholder="Enter your PAN number"
                            maxLength={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                            type="email"
                            value={userDetails.email}
                            onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Gender
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={userDetails.gender === 'male'}
                                onChange={(e) => setUserDetails(prev => ({ ...prev, gender: e.target.value }))}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Male</span>
                          </label>
                          <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={userDetails.gender === 'female'}
                                onChange={(e) => setUserDetails(prev => ({ ...prev, gender: e.target.value }))}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Female</span>
                          </label>
                        </div>
                      </div>

                      {error && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <span className="text-sm text-red-800">{error}</span>
                            </div>
                          </div>
                      )}

                      <button
                          onClick={submitDetails}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Processing...' : 'Get My Credit Score'}
                      </button>
                    </div>
                  </motion.div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                  <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center"
                  >
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Fetching your credit score...</h3>
                        <p className="text-gray-600">This may take a few moments</p>
                      </div>
                    </div>
                  </motion.div>
              )}

                            {/* Step 5: Credit Score Dashboard */}
              {currentStep === 5 && creditScoreData && (
                  <>
                    {/* Data Validation Warning */}
                    {!hasValidReportData(creditScoreData) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <div>
                              <h3 className="text-sm font-medium text-yellow-800">Limited Report Data</h3>
                              <p className="text-sm text-yellow-700 mt-1">
                                We received your credit score but some detailed information is not available. This may be due to limited credit history or data availability.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                    )}
                    
                    <motion.div
                        key="step5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                    {/* Back Button */}
                    <div className="flex justify-start">
                      <button
                          onClick={resetForm}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Credit Score Checker
                      </button>
                    </div>

                    {/* Header */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                      <div className="text-left mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          Hey {userDetails.name || 'User'}!
                        </h1>
                        <p className="text-gray-600">
                          Here's your Credit Score for {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      {/* Credit Score Meter */}
                      <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
                        {/* Header */}
                        {/* <div className="text-left mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hey {userDetails.name || 'User'}!</h2>
                      <p className="text-sm sm:text-base text-gray-600">Here's your Credit Score for {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div> */}

                        <div className="relative">
                          {/* Semi-Circular Progress Meter */}
                          <div className="w-72 h-40 sm:w-80 sm:h-48 lg:w-96 lg:h-56 mx-auto relative">
                            {/* Background Semi-Circle */}
                            <svg className="w-full h-full" viewBox="0 0 120 70">
                              {/* Background track */}
                              <path
                                  d="M 10 60 A 50 50 0 0 1 110 60"
                                  fill="none"
                                  stroke="#f3f4f6"
                                  strokeWidth="10"
                              />

                              {/* Progress arc with gradient */}
                              <path
                                  d="M 10 60 A 50 50 0 0 1 110 60"
                                  fill="none"
                                  stroke="url(#progressGradient)"
                                  strokeWidth="10"
                                  strokeLinecap="round"
                                  strokeDasharray={`${getSemiCircleProgress(creditScoreData.credit_score)} 157.08`}
                                  style={{
                                    strokeDashoffset: 0,
                                    transition: 'stroke-dasharray 1s ease-in-out'
                                  }}
                              />

                              {/* Gradient definition */}
                              <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#ef4444" />
                                  <stop offset="20%" stopColor="#f97316" />
                                  <stop offset="40%" stopColor="#eab308" />
                                  <stop offset="60%" stopColor="#3b82f6" />
                                  <stop offset="80%" stopColor="#16a34a" />
                                  <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                              </defs>
                            </svg>

                            {/* Score labels */}
                            <div className="absolute -bottom-6 sm:-bottom-8 left-0 w-full flex justify-between px-2 sm:px-4 text-xs font-bold text-gray-600">
                              <div className="text-center">300</div>
                              <div className="text-center">400</div>
                              <div className="text-center">500</div>
                              <div className="text-center">600</div>
                              <div className="text-center">700</div>
                              <div className="text-center">800</div>
                              <div className="text-center">850</div>
                            </div>

                            {/* Center content */}
                            <div className="absolute inset-0 flex items-center justify-center" style={{ top: '40px' }}>
                              <div className="text-center">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-1 sm:mb-2">
                                  {creditScoreData.credit_score}
                                </div>
                                <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-1">
                                  {getScoreCategoryImage(creditScoreData.credit_score)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                  {getScoreRange(creditScoreData.credit_score)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Score categories legend */}
                          <div className="grid grid-cols-5 gap-2 sm:gap-4 mt-8 sm:mt-12">
                            <div className="text-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                              <div className="text-xs sm:text-sm font-semibold text-gray-700">Very Bad</div>
                              <div className="text-xs text-gray-500">300-559</div>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                              <div className="text-xs sm:text-sm font-semibold text-gray-700">Bad</div>
                              <div className="text-xs text-gray-500">560-649</div>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                              <div className="text-xs sm:text-sm font-semibold text-gray-700">Fair</div>
                              <div className="text-xs text-gray-500">650-699</div>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                              <div className="text-xs sm:text-sm font-semibold text-gray-700">Good</div>
                              <div className="text-xs text-gray-500">700-749</div>
                            </div>
                            <div className="text-center">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full mx-auto mb-1 sm:mb-2"></div>
                              <div className="text-xs sm:text-sm font-semibold text-gray-700">Excellent</div>
                              <div className="text-xs text-gray-500">750-850</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 text-center">
                          Report generated on: {creditScoreData.fetched_at ? new Date(creditScoreData.fetched_at._seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString()}
                        </div>

                        <div className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wider mt-2 text-center">
                          Credit Score
                        </div>
                      </div>

                      {/* Powered by Experian */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                          </div>
                          <div className="text-sm text-gray-600">
                            Powered by <span className="font-semibold text-blue-600">Experian</span>
                          </div>
                        </div>
                      </div>

                      {/* Score Description */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">
                          {getScoreDescription(creditScoreData.credit_score)}
                        </p>
                      </div>
                    </div>

                    {/* Personal Information */}
                    {creditScoreData.report?.Current_Application?.Current_Application_Details?.Current_Applicant_Details && (
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                              <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Basic Details</h4>
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Full Name:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name} {creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.Last_Name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">PAN:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.IncomeTaxPan}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Date of Birth:</span>
                                  <span className="font-semibold text-sm text-gray-900">
                                   {formatDateFromYYYYMMDD(creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.Date_Of_Birth_Applicant)}
                                 </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Gender:</span>
                                  <span className="font-semibold text-sm text-gray-900">
                               {creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.Gender_Code === '1' ? 'Male' :
                                   creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.Gender_Code === '2' ? 'Female' : 'Other'}
                             </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Mobile:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.Telephone_Number_Applicant_1st}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Email:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Details.EMailId || 'N/A'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                              <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Address Details</h4>
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Address:</span>
                                  <span className="font-semibold text-sm text-gray-900 text-right">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.FlatNoPlotNoHouseNo}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Building/Society:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.BldgNoSocietyName || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Road/Area:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.RoadNoNameAreaLocality || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">City:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.City || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Landmark:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.Landmark || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">State:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.State || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">PIN Code:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.PINCode}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Country:</span>
                                  <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Applicant_Address_Details.Country_Code || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          {creditScoreData.report.Current_Application.Current_Application_Details.Current_Other_Details && (
                              <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Additional Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-700 font-medium">Income:</span>
                                      <span className="font-semibold text-sm text-gray-900">₹{creditScoreData.report.Current_Application.Current_Application_Details.Current_Other_Details.Income || '0'}</span>
                                    </div>
                                  </div>
                                  <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-700 font-medium">Marital Status:</span>
                                      <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Other_Details.Marital_Status || 'N/A'}</span>
                                    </div>
                                  </div>
                                  <div className="bg-purple-50 p-3 rounded-lg">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-700 font-medium">Employment Status:</span>
                                      <span className="font-semibold text-sm text-gray-900">{creditScoreData.report.Current_Application.Current_Application_Details.Current_Other_Details.Employment_Status || 'N/A'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          )}
                        </div>
                    )}

                    {/* Account Holder Details */}
                    {creditScoreData.report?.CAIS_Account?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details && (
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Holder Details</h3>

                          {Array.isArray(creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details) ? creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details.map((holder: any, holderIndex: number) => (
                              <div key={holderIndex} className="mb-6 border border-gray-200 rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Holder {holderIndex + 1}</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                    <h5 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Personal Information</h5>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Full Name:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.Surname_Non_Normalized || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">First Name:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.First_Name_Non_Normalized || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Middle Name:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.Middle_Name_1_Non_Normalized || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">PAN:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.Income_TAX_PAN || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Date of Birth:</span>
                                        <span className="font-semibold text-sm text-gray-900">
                                     {formatDateFromYYYYMMDD(holder.Date_of_birth)}
                                   </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Gender:</span>
                                        <span className="font-semibold text-sm text-gray-900">
                                   {holder.Gender_Code === '1' ? 'Male' :
                                       holder.Gender_Code === '2' ? 'Female' : 'Other'}
                                 </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Passport:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.Passport_Number || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Voter ID:</span>
                                        <span className="font-semibold text-sm text-gray-900">{holder.Voter_ID_Number || 'N/A'}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                    <h5 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Contact Information</h5>
                                    <div className="space-y-2">
                                      {Array.isArray(creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Phone_Details) &&
                                          creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Phone_Details.map((phone: any, phoneIndex: number) => (
                                              <div key={phoneIndex} className="border-b border-gray-200 pb-2">
                                                <div className="flex justify-between">
                                                  <span className="text-sm text-gray-700 font-medium">Phone Type:</span>
                                                  <span className="font-semibold text-sm text-gray-900">
                                        {phone.Telephone_Type === '00' ? 'Landline' :
                                            phone.Telephone_Type === '01' ? 'Mobile' :
                                                phone.Telephone_Type === '02' ? 'Office' : 'Other'}
                                      </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-sm text-gray-700 font-medium">Number:</span>
                                                  <span className="font-semibold text-sm text-gray-900">
                                        {phone.Telephone_Number || phone.Mobile_Telephone_Number || 'N/A'}
                                      </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-sm text-gray-700 font-medium">Email:</span>
                                                  <span className="font-semibold text-sm text-gray-900">{phone.EMailId || 'N/A'}</span>
                                                </div>
                                              </div>
                                          ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Address Details */}
                                {Array.isArray(creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Address_Details) && (
                                    <div className="mt-6">
                                      <h5 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h5>
                                      {creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Address_Details.map((address: any, addressIndex: number) => (
                                          <div key={addressIndex} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                                            <div className="space-y-2">
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">Address Line 1:</span>
                                                <span className="font-semibold text-sm text-gray-900 text-right">{address.First_Line_Of_Address_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">Address Line 2:</span>
                                                <span className="font-semibold text-sm text-gray-900 text-right">{address.Second_Line_Of_Address_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">Address Line 3:</span>
                                                <span className="font-semibold text-sm text-gray-900 text-right">{address.Third_Line_Of_Address_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">City:</span>
                                                <span className="font-semibold text-sm text-gray-900">{address.City_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">State:</span>
                                                <span className="font-semibold text-sm text-gray-900">{address.State_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">PIN Code:</span>
                                                <span className="font-semibold text-sm text-gray-900">{address.ZIP_Postal_Code_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">Country:</span>
                                                <span className="font-semibold text-sm text-gray-900">{address.CountryCode_non_normalized || 'N/A'}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-sm text-gray-700 font-medium">Address Type:</span>
                                                <span className="font-semibold text-sm text-gray-900">
                                       {address.Address_indicator_non_normalized === '01' ? 'Current' :
                                           address.Address_indicator_non_normalized === '02' ? 'Office' : 'Other'}
                                     </span>
                                              </div>
                                            </div>
                                          </div>
                                      ))}
                                    </div>
                                )}
                              </div>
                          )) : null}
                        </div>
                    )}

                    {/* Credit Report Summary */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Report Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Credit Accounts</h4>
                          <p className="text-2xl font-bold text-gray-900">
                            {safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal', '0')}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active Accounts</h4>
                          <p className="text-2xl font-bold text-gray-900">
                            {safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive', '0')}
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Closed Accounts</h4>
                          <p className="text-2xl font-bold text-gray-900">
                            {safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed', '0')}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Enquiries</h4>
                          <p className="text-2xl font-bold text-gray-900">
                            {safeGet(creditScoreData.report, 'TotalCAPS_Summary.TotalCAPSLast180Days', '0')}
                          </p>
                        </div>
                      </div>

                      {/* Additional Credit Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Outstanding Balances</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Secured Balance:</span>
                              <span className="font-semibold text-gray-900">₹{safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured', '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Unsecured Balance:</span>
                              <span className="font-semibold text-gray-900">₹{safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured', '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Total Balance:</span>
                              <span className="font-semibold text-gray-900">₹{safeGet(creditScoreData.report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All', '0')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Recent Enquiries</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Last 7 Days:</span>
                              <span className="font-semibold text-gray-900">{safeGet(creditScoreData.report, 'TotalCAPS_Summary.TotalCAPSLast7Days', '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Last 30 Days:</span>
                              <span className="font-semibold text-gray-900">{safeGet(creditScoreData.report, 'TotalCAPS_Summary.TotalCAPSLast30Days', '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-700 font-medium">Last 90 Days:</span>
                              <span className="font-semibold text-gray-900">{safeGet(creditScoreData.report, 'TotalCAPS_Summary.TotalCAPSLast90Days', '0')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Details */}
                    {creditScoreData.report?.CAIS_Account?.CAIS_Account_DETAILS?.[0] && (
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h3>

                          {/* All Accounts */}
                          {Array.isArray(creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS) ? creditScoreData.report.CAIS_Account.CAIS_Account_DETAILS.map((account: any, accountIndex: number) => (
                              <div key={accountIndex} className="mb-8 border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    Account {accountIndex + 1} - {account.Account_Type === '05' ? 'Personal Loan' :
                                      account.Account_Type === '13' ? 'Personal Loan' :
                                          account.Account_Type === '06' ? 'Personal Loan' :
                                              account.Account_Type === '10' ? 'Credit Card' : 'Other Credit Facility'}
                                  </h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      account.Account_Status === '11' ? 'bg-green-100 text-green-800' :
                                          account.Account_Status === '13' ? 'bg-gray-100 text-gray-800' :
                                              account.Account_Status === '43' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                             {account.Account_Status === '11' ? 'Active' :
                                 account.Account_Status === '13' ? 'Closed' :
                                     account.Account_Status === '43' ? 'Closed' : 'Other'}
                           </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                    <h5 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Account Information</h5>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Account Number:</span>
                                        <span className="font-semibold text-sm text-gray-900">{account.Account_Number || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Subscriber:</span>
                                        <span className="font-semibold text-sm text-gray-900">{account.Subscriber_Name || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Open Date:</span>
                                        <span className="font-semibold text-sm text-gray-900">
                                     {formatDateFromYYYYMMDD(account.Open_Date)}
                                   </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Close Date:</span>
                                        <span className="font-semibold text-sm text-gray-900">
                                     {formatDateFromYYYYMMDD(account.Date_Closed)}
                                   </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Terms Duration:</span>
                                        <span className="font-semibold text-sm text-gray-900">{account.Terms_Duration || 'N/A'} months</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Rate of Interest:</span>
                                        <span className="font-semibold text-sm text-gray-900">{account.Rate_of_Interest || 'N/A'}%</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                    <h5 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Financial Details</h5>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Original Amount:</span>
                                        <span className="font-semibold text-gray-900">₹{account.Highest_Credit_or_Original_Loan_Amount || '0'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Credit Limit:</span>
                                        <span className="font-semibold text-gray-900">₹{account.Credit_Limit_Amount || '0'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Current Balance:</span>
                                        <span className="font-semibold text-gray-900">₹{account.Current_Balance || '0'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Amount Past Due:</span>
                                        <span className="font-semibold text-gray-900">₹{account.Amount_Past_Due || '0'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">Last Payment:</span>
                                        <span className="font-semibold text-sm text-gray-900">
                                     {formatDateFromYYYYMMDD(account.Date_of_Last_Payment)}
                                   </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-700 font-medium">EMI Amount:</span>
                                        <span className="font-semibold text-gray-900">₹{account.Scheduled_Monthly_Payment_Amount || '0'}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment History */}
                                {account.Account_Review_Data && account.Account_Review_Data.length > 0 && (
                                    <div>
                                      <h5 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h5>
                                      <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                          <thead>
                                          <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">Month/Year</th>
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">Status</th>
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">Balance</th>
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">Credit Limit</th>
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">Payment</th>
                                            <th className="px-4 py-2 text-left text-gray-900 font-semibold">EMI</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {Array.isArray(account.Account_Review_Data) ? account.Account_Review_Data.slice(0, 12).map((entry: any, index: number) => (
                                              <tr key={index} className="border-b border-gray-100">
                                                <td className="px-4 py-2 text-gray-900">{entry.Month}/{entry.Year}</td>
                                                <td className="px-4 py-2">
                                         <span className={`px-2 py-1 rounded-full text-xs ${
                                             entry.Account_Status === '11' ? 'bg-green-100 text-green-800' :
                                                 entry.Account_Status === '13' ? 'bg-gray-100 text-gray-800' :
                                                     entry.Account_Status === '43' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                         }`}>
                                           {entry.Account_Status === '11' ? 'Active' :
                                               entry.Account_Status === '13' ? 'Closed' :
                                                   entry.Account_Status === '43' ? 'Closed' : 'Other'}
                                         </span>
                                                </td>
                                                <td className="px-4 py-2 text-gray-900">₹{entry.Current_Balance || '0'}</td>
                                                <td className="px-4 py-2 text-gray-900">₹{entry.Credit_Limit_Amount || '0'}</td>
                                                <td className="px-4 py-2 text-gray-900">₹{entry.Actual_Payment_Amount || '0'}</td>
                                                <td className="px-4 py-2 text-gray-900">₹{entry.EMI_Amount || '0'}</td>
                                              </tr>
                                          )) : null}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                )}
                              </div>
                          )) : null}
                        </div>
                    )}

                    {/* Enquiry Details */}
                    {creditScoreData.report?.CAPS?.CAPS_Application_Details && (
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">Credit Enquiry Details</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                              <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Enquiry Summary</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 7 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.CAPS.CAPS_Summary.CAPSLast7Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 30 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.CAPS.CAPS_Summary.CAPSLast30Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 90 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.CAPS.CAPS_Summary.CAPSLast90Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 180 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.CAPS.CAPS_Summary.CAPSLast180Days || '0'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                              <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">Non-Credit Enquiries</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 7 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast7Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 30 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast30Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 90 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast90Days || '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700 font-medium">Last 180 Days:</span>
                                  <span className="font-semibold text-gray-900">{creditScoreData.report.NonCreditCAPS.NonCreditCAPS_Summary.NonCreditCAPSLast180Days || '0'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Recent Enquiries Table */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Enquiries</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Date</th>
                                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Institution</th>
                                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Purpose</th>
                                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Amount</th>
                                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(creditScoreData.report.CAPS.CAPS_Application_Details) 
                                  ? creditScoreData.report.CAPS.CAPS_Application_Details.slice(0, 10).map((enquiry: any, index: number) => (
                                      <tr key={index} className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-gray-900">
                                          {formatDateFromYYYYMMDD(enquiry.Date_of_Request)}
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">{enquiry.Subscriber_Name || 'N/A'}</td>
                                        <td className="px-4 py-2 text-gray-900">
                                          {enquiry.Enquiry_Reason === '7' ? 'Personal Loan' :
                                              enquiry.Enquiry_Reason === '6' ? 'Credit Card' :
                                                  enquiry.Enquiry_Reason === '13' ? 'Credit Card' : 'Other'}
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">₹{enquiry.Amount_Financed || '0'}</td>
                                        <td className="px-4 py-2 text-gray-900">{enquiry.Duration_Of_Agreement || '0'} months</td>
                                      </tr>
                                    ))
                                  : creditScoreData.report.CAPS.CAPS_Application_Details ? (
                                      <tr className="border-b border-gray-100">
                                        <td className="px-4 py-2 text-gray-900">
                                          {formatDateFromYYYYMMDD(creditScoreData.report.CAPS.CAPS_Application_Details.Date_of_Request)}
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">{creditScoreData.report.CAPS.CAPS_Application_Details.Subscriber_Name || 'N/A'}</td>
                                        <td className="px-4 py-2 text-gray-900">
                                          {creditScoreData.report.CAPS.CAPS_Application_Details.Enquiry_Reason === '7' ? 'Personal Loan' :
                                              creditScoreData.report.CAPS.CAPS_Application_Details.Enquiry_Reason === '6' ? 'Credit Card' :
                                                  creditScoreData.report.CAPS.CAPS_Application_Details.Enquiry_Reason === '13' ? 'Credit Card' : 'Other'}
                                        </td>
                                        <td className="px-4 py-2 text-gray-900">₹{creditScoreData.report.CAPS.CAPS_Application_Details.Amount_Financed || '0'}</td>
                                        <td className="px-4 py-2 text-gray-900">{creditScoreData.report.CAPS.CAPS_Application_Details.Duration_Of_Agreement || '0'} months</td>
                                      </tr>
                                    ) : null
                                }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                    )}


                  </motion.div>
                  </>
              )}

              {/* Step 6: No Credit Record */}
              {currentStep === 6 && noCreditRecord && (
                  <motion.div
                      key="step6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                  >
                    {/* Back Button */}
                    <div className="flex justify-start">
                      <button
                          onClick={resetForm}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Credit Score Checker
                      </button>
                    </div>

                    {/* No Credit Record Message */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Info className="w-10 h-10 text-orange-600" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                          No Credit Record Found
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                          Hey <span className="font-bold text-gray-900">{userDetails.name || 'User'}</span>! We couldn't find any credit history associated with your details.
                        </p>
                      </div>

                      {/* What This Means */}
                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-600" />
                          What This Means
                        </h3>
                        <div className="space-y-3 text-gray-700">
                          <p className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            You may be new to credit or haven't taken any loans/credit cards yet
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            This is common for young professionals, students, or those who prefer cash transactions
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            You can still apply for loans, but lenders may need additional documentation
                          </p>
                        </div>
                      </div>

                      {/* How to Build Credit */}
                      <div className="bg-green-50 rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          How to Build Your Credit Score
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">1. Get a Credit Card</h4>
                            <p className="text-sm text-gray-600">Start with a secured credit card or a basic credit card with low limits</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">2. Pay Bills On Time</h4>
                            <p className="text-sm text-gray-600">Always pay your credit card bills and loan EMIs before the due date</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">3. Keep Low Utilization</h4>
                            <p className="text-sm text-gray-600">Use only 30% or less of your available credit limit</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">4. Mix of Credit</h4>
                            <p className="text-sm text-gray-600">Have a mix of different types of credit (cards, loans, etc.)</p>
                          </div>
                        </div>
                      </div>

                      {/* Next Steps */}
                      <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-purple-600" />
                          Next Steps
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              1
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Apply for a Credit Card</h4>
                              <p className="text-sm text-gray-600">Start building credit history with a basic credit card</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              2
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Consider a Small Loan</h4>
                              <p className="text-sm text-gray-600">Apply for a small personal loan to establish credit history</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              3
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Check Again Later</h4>
                              <p className="text-sm text-gray-600">Your credit score will appear once you have credit history</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Loan Options */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                          Ready to Start Building Credit?
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                          Explore our loan options designed for individuals with no credit history
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Link href="/loans/personal-loan">
                            <button className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200">
                              Apply for Personal Loan
                            </button>
                          </Link>
                          <Link href="/loans/business-loan">
                            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200">
                              Apply for Business Loan
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Report Date */}
                      <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                          Report generated on: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Explore Loan Options Section */}
        <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Explore Loan Options from Samridhya
              </h2>
              <p className="text-gray-600">
                Discover our range of loan products with competitive rates and quick approval.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Loan Card */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#276ef4] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Loan</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Quick personal loans up to ₹25 lakhs with minimal documentation.
                  </p>
                  <div className="flex gap-2 mb-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    From 10.5%
                  </span>
                    <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Up to ₹25L
                  </span>
                  </div>
                  <Link href="/loans/personal-loan">
                    <button className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 transform hover:scale-105 text-sm">
                      Apply for Personal Loan
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Business Loan Card */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#276ef4] to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Business Loan</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Flexible business loans designed for entrepreneurs and SMEs.
                  </p>
                  <div className="flex gap-2 mb-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Up to ₹50L
                  </span>
                    <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Quick Approval
                  </span>
                  </div>
                  <Link href="/loans/business-loan">
                    <button className="w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 transform hover:scale-105 text-sm">
                      Apply for Business Loan
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <CTA />
      </div>
  );
} 