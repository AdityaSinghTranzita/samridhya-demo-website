'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
// Removed framer-motion import for performance
import Head from 'next/head';
// Import only the icons we actually use to reduce bundle size
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

import { trackCreditScoreCheck, trackEvent, trackButtonClick, trackCalculatorUsage } from '@/utils/analytics';

interface CreditScoreData {
  credit_score: number | null;
  report?: any;
  fetched_at?: any;
  status?: number;
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
const CHECK_EXISTING_URL = `${API_BASE_URL}/check-existing`;

// Add data validation helper functions
const validateCreditScoreData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  // Allow null credit_score for cases where no credit record exists
  if (data.credit_score !== null && (typeof data.credit_score !== 'number')) return false;
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
  const [otpTimer, setOtpTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingExisting, setIsCheckingExisting] = useState(false);
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
    } else if (savedToken && savedMobile) {
      // User has token but we need to verify if details exist
      setAuthToken(savedToken);
      setMobileNumber(savedMobile);
      
      // Check if user details exist using the backend endpoint
      setIsCheckingExisting(true);
      const checkExistingUser = async () => {
        try {
          const checkExistingResponse = await fetch(CHECK_EXISTING_URL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${savedToken}`,
              'Content-Type': 'application/json',
            },
          });

          const existingData = await checkExistingResponse.json();

          if (existingData.message === 'User exists' && existingData.data) {
            // User details exist, populate the form and fetch credit score directly
            const userData = {
              name: existingData.data.nickname || '',
              pan: existingData.data.pan || '',
              email: existingData.data.email || '',
              gender: existingData.data.gender || 'male'
            };

            setUserDetails(userData);
            setSessionStorage('userDetails', JSON.stringify(userData));

            // Automatically fetch credit score
            setCurrentStep(4);
            await fetchCreditScore(savedToken);
          } else {
            // No user details found, check if we have saved user details
            if (savedUserDetails) {
              try {
                const userDetails = JSON.parse(savedUserDetails);
                setUserDetails(userDetails);
                setCurrentStep(4);
                await fetchCreditScore(savedToken);
              } catch (e) {
                console.error('Error parsing saved user data:', e);
                clearAllSessionData();
              }
            } else {
              // No user details at all, go to step 3
              setCurrentStep(3);
            }
          }
        } catch (checkError) {
          console.error('Error checking existing user details:', checkError);
          // If check fails, try to use saved user details
          if (savedUserDetails) {
            try {
              const userDetails = JSON.parse(savedUserDetails);
              setUserDetails(userDetails);
              setCurrentStep(4);
              await fetchCreditScore(savedToken);
            } catch (e) {
              console.error('Error parsing saved user data:', e);
              clearAllSessionData();
            }
          } else {
            setCurrentStep(3);
          }
        } finally {
          setIsCheckingExisting(false);
        }
      };

      checkExistingUser();
    } else {

    }
  }, []);

  // Sync session data when important state changes
  useEffect(() => {
    if (mounted && (authToken || mobileNumber || userDetails.name || creditScoreData || noCreditRecord)) {
      syncSessionData();
    }
  }, [authToken, mobileNumber, userDetails, creditScoreData, noCreditRecord, mounted, isCheckingExisting]);

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
    // Only allow numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 5) {
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
      const response = await fetch(`${GENERATE_OTP_URL}?phone=${mobileNumber}`);
      const data = await response.json();

      if (data.success === true) {
        setCurrentStep(2);
        setOtpTimer(30);
        // Track OTP generation success
        trackEvent('otp_generated', {
          user_mobile: mobileNumber,
          event_category: 'engagement',
          event_label: 'otp_generated_mobile_verification'
        });
      } else {
        setError(data.message || 'Failed to send OTP');
        
        // Track OTP generation failure
        trackEvent('otp_generation_failed', {
          user_mobile: mobileNumber,
          error_message: data.message || 'unknown_error',
          event_category: 'error',
          event_label: 'otp_generation_failed'
        });
      }
    } catch (error) {
      console.error('OTP generation network error:', error);
      setError('Network error. Please check your connection and try again.');
      
      // Track OTP generation network error
      trackEvent('otp_generation_error', {
        user_mobile: mobileNumber,
        error_type: 'network_error',
        event_category: 'error',
        event_label: 'otp_generation_network_error'
      });
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
      const response = await fetch(`${VERIFY_OTP_URL}?phone=${mobileNumber}&utm_source=website&utm_medium=website&source=creditscore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();


      if (data.success === true) {
        const token = data.access_token;
        setAuthToken(token);

        // Store token for future use
        setSessionStorage('authToken', token);
        setSessionStorage('mobileNumber', mobileNumber);

        // Track OTP verification success
        trackEvent('otp_verified', {
          user_mobile: mobileNumber,
          event_category: 'engagement',
          event_label: 'otp_verified_mobile_verification'
        });

        // Check if user details exist using the new backend endpoint
        setIsCheckingExisting(true);
        try {
          const checkExistingResponse = await fetch(CHECK_EXISTING_URL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const existingData = await checkExistingResponse.json();

          if (existingData.message === 'User exists' && existingData.data) {
            // User details exist, populate the form and fetch credit score directly
            const userData = {
              name: existingData.data.nickname || '',
              pan: existingData.data.pan || '',
              email: existingData.data.email || '',
              gender: existingData.data.gender || 'male'
            };

            setUserDetails(userData);

            // Store user details for future use
            setSessionStorage('userDetails', JSON.stringify(userData));

            // Automatically fetch credit score
            setCurrentStep(4);
            await fetchCreditScore(token);
          } else {
            // No user details found, proceed to step 3 for manual input
            setCurrentStep(3);
          }
        } catch (checkError) {
          console.error('Error checking existing user details:', checkError);
          // If check fails, proceed to step 3 for manual input
          setCurrentStep(3);
        } finally {
          setIsCheckingExisting(false);
        }

        setOtp(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
        // Track OTP verification failure
        trackEvent('otp_verification_failed', {
          user_mobile: mobileNumber,
          error_message: data.message || 'invalid_otp',
          event_category: 'error',
          event_label: 'otp_verification_failed'
        });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please try again.');
      
      // Track OTP verification network error
      trackEvent('otp_verification_error', {
        user_mobile: mobileNumber,
        error_type: 'network_error',
        event_category: 'error',
        event_label: 'otp_verification_network_error'
      });
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
          pan: userDetails.pan,
          email: userDetails.email
        }),
      });

      const submitData = await submitResponse.json();


      // Check for success response
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
      console.log('Credit score value:', scoreData.data?.credit_score);
      console.log('Message:', scoreData.message);

      // Check for various success messages
      const isSuccess = scoreData.message && (
          scoreData.message.includes('Success') ||
          scoreData.message.includes('successfully') ||
          scoreData.message.includes('updated successfully')
      );

      // Check if this is a success but with no credit score (null credit_score)
      const isSuccessWithNoCreditScore = isSuccess && scoreData.data && scoreData.data.credit_score === null;

      // Check for no credit record messages or status code 2
      const isNoCreditRecord = scoreData.message && (
          scoreData.message.toLowerCase().includes('no credit record') ||
          scoreData.message.toLowerCase().includes('no credit history') ||
          scoreData.message.toLowerCase().includes('credit record not found') ||
          scoreData.message.toLowerCase().includes('no data found') ||
          scoreData.message.toLowerCase().includes('no record found')
      ) || (scoreData.data && scoreData.data.status === 2);

      if (isSuccess && scoreData.data) {
        // Check if this is a no credit record case first
        // Handle cases where credit_score is null regardless of the message
        if (isNoCreditRecord || scoreData.data.status === 2 || scoreData.data.credit_score === null || isSuccessWithNoCreditScore) {
          console.log('Handling no credit record case. Reason:', {
            isNoCreditRecord,
            statusIs2: scoreData.data.status === 2,
            creditScoreIsNull: scoreData.data.credit_score === null,
            isSuccessWithNoCreditScore
          });
          // Handle no credit record case
          setNoCreditRecord(true);
          setSessionStorage('noCreditRecord', 'true');

          // Track no credit record found
          trackEvent('credit_score_no_record', {
            user_mobile: mobileNumber,
            event_category: 'engagement',
            event_label: 'credit_score_no_record_found'
          });

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
          return;
        }

        // Validate the credit score data for cases with actual credit scores
        console.log('Processing credit score data with actual score:', scoreData.data.credit_score);
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
        trackCreditScoreCheck('credit_score_checker', {
          credit_score: scoreData.data.credit_score || 0,
          user_mobile: mobileNumber,
          step: 'step_5'
        });
        trackEvent('credit_score_retrieved', {
          credit_score: scoreData.data.credit_score || 0,
          user_mobile: mobileNumber,
          event_category: 'conversion',
          event_label: 'credit_score_retrieved_success'
        });

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
        trackEvent('credit_score_no_record', {
          user_mobile: mobileNumber,
          event_category: 'engagement',
          event_label: 'credit_score_no_record_found'
        });

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
    setIsCheckingExisting(false);
  };

  const getScoreCategory = (score: number | null) => {
    if (score === null) return { label: 'No Credit Record', color: '#95a5a6' };
    if (score >= 800) return { label: 'Excellent Credit Score', color: '#27ae60' };
    if (score >= 750) return { label: 'Very Good Credit Score', color: '#2ecc71' };
    if (score >= 700) return { label: 'Good Credit Score', color: '#f1c40f' };
    if (score >= 650) return { label: 'Fair Credit Score', color: '#f39c12' };
    return { label: 'Poor Credit Score', color: '#e74c3c' };
  };

  const getNeedleAngle = (score: number | null) => {
    if (score === null) return 0; // Center position for no credit record
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

  const getNeedleAngleNew = (score: number | null) => {
    if (score === null) return 0; // Center position for no credit record
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

  const getScoreCategoryNew = (score: number | null) => {
    if (score === null) return { label: 'NO RECORD', color: '#6b7280' };
    if (score >= 800) return { label: 'EXCELLENT', color: '#dc2626' };
    if (score >= 740) return { label: 'VERY GOOD', color: '#f97316' };
    if (score >= 670) return { label: 'GOOD', color: '#eab308' };
    if (score >= 580) return { label: 'FAIR', color: '#16a34a' };
    return { label: 'POOR', color: '#166534' };
  };

  // New functions for the image-based meter design
  const getNeedleAngleImage = (score: number | null): number => {
    if (score === null) return 0; // Center position for no credit record
    // Map score from 300-850 to angle -90 to 90 degrees
    const minScore = 300;
    const maxScore = 850;
    const minAngle = -90;
    const maxAngle = 90;

    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const angle = ((normalizedScore - minScore) / (maxScore - minScore)) * (maxAngle - minAngle) + minAngle;

    return angle;
  };

  const getScoreRange = (score: number | null): string => {
    if (score === null) return 'No Record';
    if (score >= 750) return '750 - 850';
    if (score >= 700) return '700 - 750';
    if (score >= 650) return '650 - 700';
    if (score >= 560) return '560 - 650';
    return '300 - 560';
  };

  const getScoreCategoryImage = (score: number | null): string => {
    if (score === null) return 'No Record';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 560) return 'Bad';
    return 'Very Bad';
  };

  const getProgressCircumference = (score: number | null): number => {
    if (score === null) return 0; // No progress for no credit record
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
  const getSemiCircleProgress = (score: number | null): number => {
    if (score === null) return 0; // No progress for no credit record
    // Calculate progress percentage (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Calculate semi-circle arc length (π * radius = 157.08)
    const arcLength = 157.08;
    return (percentage / 100) * arcLength;
  };

  const getMarkerX = (score: number | null): number => {
    if (score === null) return 60; // Center position for no credit record
    // Calculate marker position on semi-circle (300-850 range)
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;

    // Map percentage to x coordinate (10 to 110)
    const x = 10 + (percentage / 100) * 100;
    return x;
  };

  const getMarkerY = (score: number | null): number => {
    if (score === null) return 70; // Bottom center position for no credit record
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

  const getScoreDescription = (score: number | null) => {
    if (score === null) {
      return 'You don\'t have a credit score yet. This means you haven\'t taken any loans or credit cards in the past. You can start building your credit history by applying for a credit card or a small loan.';
    } else if (score >= 800) {
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
        <Head>
          <title>Free Credit Score Checker – Check CIBIL Score Online</title>
          <meta name="description" content="Check your credit score online for free! Instantly get your CIBIL report and track your financial health with our secure credit score checker tool." />
          <meta name="keywords" content="Credit score, credit score checker, check credit score free, how to check credit score, free credit score check, credit score check online, credit score tool, credit score check, best credit score checker, credit score report free, Cibil Score Checker, Cibil report checker, Top Cibil score checker tool, Cibil report generator, cibil score, cibil check" />
          <meta name="author" content="Samridhya" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <meta name="google-site-verification" content="your-google-site-verification-code" />
          <meta name="bing-site-verification" content="your-bing-site-verification-code" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@samridhya" />
          <meta name="twitter:title" content="Free Credit Score Checker – Instant CIBIL Report | Samridhya" />
          <meta name="twitter:description" content="Check your credit score online for free. Get an instant, secure, and accurate CIBIL report anytime." />
          <meta name="twitter:image" content="https://www.samridhya.com/images/credit-score-checker.jpg" />
          <meta name="og:title" content="Free Credit Score Checker – Instant CIBIL Report" />
          <meta name="og:description" content="Get your credit score online for free. Get an instant, secure, and accurate CIBIL report anytime." />
          <meta name="og:image" content="https://www.samridhya.com/images/credit-score-checker.jpg" />
          <meta name="og:url" content="https://samridhya.com/calculators/credit-score-checker/" />
          <meta name="og:site_name" content="Samridhya" />
          <link rel="canonical" href="https://samridhya.com/calculators/credit-score-checker/" />
          
          {/* Performance Optimization Meta Tags */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="dns-prefetch" href="//buyer.prod.samridh.ai" />
          
          {/* Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Samridhya Credit Score Checker",
                "description": "Free credit score checker tool to check your credit score instantly. Get your credit report in minutes with no credit card required.",
                "url": "https://samridhya.com/calculators/credit-score-checker/",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR",
                  "description": "Free credit score checking service"
                },
                "featureList": [
                  "Instant credit score check",
                  "Free credit report",
                  "No credit card required",
                  "Secure and reliable",
                  "Detailed credit analysis"
                ],
                "provider": {
                  "@type": "Organization",
                  "name": "Samridhya",
                  "url": "https://samridhya.com/"
                }
              })
            }}
          />
          
          {/* Critical CSS for above-the-fold content */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Prevent flash of unstyled content */
              body { 
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%);
                margin: 0;
                padding: 0;
              }
              .hero-section { 
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem 1rem;
              }
              .hero-content { 
                max-width: 1280px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
              }
              .hero-title { 
                font-size: clamp(1.5rem, 4vw, 3rem);
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 1rem;
                line-height: 1.1;
              }
              .hero-description { 
                font-size: clamp(0.875rem, 2vw, 1.125rem);
                color: #6b7280;
                margin-bottom: 2rem;
                max-width: 600px;
              }
              /* Image loading optimization */
              img { 
                transition: opacity 0.3s ease-in-out;
              }
              /* Prevent layout shifts */
              .credit-card {
                min-height: 200px;
              }
              .step-card {
                min-height: 300px;
              }
              /* Skeleton animation */
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
              .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
              /* Fade in animation */
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out;
              }
              /* Prevent CLS */
              .form-container {
                min-height: 400px;
              }
              /* Prevent FOUC - Critical styles for SEO */
              html {
                visibility: visible !important;
                opacity: 1 !important;
              }
              body {
                visibility: visible !important;
                opacity: 1 !important;
              }
              /* Ensure all content is immediately visible for SEO */
              .hero-section,
              .credit-card,
              .step-card,
              .form-container {
                visibility: visible !important;
                opacity: 1 !important;
              }
              /* Prevent layout shifts without hiding content */
              .animate-fade-in-up {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
              }
              /* Ensure text content is immediately visible */
              h1, h2, h3, h4, h5, h6, p, span, div {
                visibility: visible !important;
                opacity: 1 !important;
              }
            `
          }} />
        </Head>
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
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
                <CreditCard className="w-5 h-5 text-white" />
                <span className="text-white/90 font-medium">Free Credit Score Checker</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Check Your Credit Score
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Free & Instantly
              </span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-8">
                Get your credit score in minutes. No credit card required, completely free and secure.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="transition-all duration-300">
              {/* Step 1: Mobile Number Input */}
              {currentStep === 1 && (
                  <div
                      key="step1"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl animate-fade-in-up step-card form-container"
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
                          className=" cursor-pointer w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Sending OTP...' : 'Get Free Credit Report'}
                      </button>
                    </div>
                  </div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                  <div
                      key="step2"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl animate-fade-in-up step-card form-container"
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
                                  inputMode="numeric"
                                  pattern='[0-9]*'
                                  value={digit}
                                  onChange={(e) => handleOtpChange(index, e.target.value)}
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  data-index={index}
                                  maxLength={1}
                                  min="0"
                                  max="9"
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
                          className=" cursor-pointer w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Continue'}
                      </button>
                    </div>
                  </div>
              )}

              {/* Step 3: User Details */}
              {currentStep === 3 && (
                  <div
                      key="step3"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl animate-fade-in-up step-card form-container"
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
                  </div>
              )}

              {/* Step 4: Loading */}
              {currentStep === 4 && (
                  <div
                      key="step4"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center animate-fade-in-up step-card form-container"
                  >
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {isCheckingExisting ? 'Checking your details...' : 'Fetching your credit score...'}
                        </h3>
                        <p className="text-gray-600">
                          {isCheckingExisting ? 'Verifying your existing information' : 'This may take a few moments'}
                        </p>
                      </div>
                    </div>
                  </div>
              )}

                            {/* Step 5: Credit Score Dashboard */}
              {currentStep === 5 && creditScoreData && (
                  <>
                    {/* Data Validation Warning */}
                    {!hasValidReportData(creditScoreData) && creditScoreData.credit_score !== null && (
                        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg animate-fade-in-up">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <div>
                              <h3 className="text-sm font-medium text-yellow-800">Limited Report Data</h3>
                              <p className="text-sm text-yellow-700 mt-1">
                                We received your credit score but some detailed information is not available. This may be due to limited credit history or data availability.
                              </p>
                            </div>
                          </div>
                        </div>
                    )}
                    
                    <div
                        key="step5"
                        className="space-y-6 animate-fade-in-up"
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
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl credit-card">
                      <div className="text-left mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          Hey { creditScoreData?.report?.Current_Application?.Current_Application_Details?.Current_Applicant_Details?.First_Name || userDetails.name || 'User'}!
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
                                  {creditScoreData.credit_score !== null ? creditScoreData.credit_score : 'N/A'}
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
                    {creditScoreData.report?.Current_Application?.Current_Application_Details?.Current_Applicant_Details && creditScoreData.credit_score !== null && (
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
                    {creditScoreData.report?.CAIS_Account?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details && creditScoreData.credit_score !== null && (
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
                    {creditScoreData.credit_score !== null && (
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
                    )}

                    {/* Account Details */}
                    {creditScoreData.report?.CAIS_Account?.CAIS_Account_DETAILS?.[0] && creditScoreData.credit_score !== null && (
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
                    {creditScoreData.report?.CAPS?.CAPS_Application_Details && creditScoreData.credit_score !== null && (
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


                  </div>
                  </>
              )}

              {/* Step 6: No Credit Record */}
              {currentStep === 6 && noCreditRecord && (
                  <div
                      key="step6"
                      className="space-y-6 animate-fade-in-up"
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
                          Hey <span className="font-bold text-gray-900">{ creditScoreData?.report?.Current_Application?.Current_Application_Details?.Current_Applicant_Details?.First_Name || userDetails.name || 'User'}</span>! We couldn't find any credit history associated with your details.
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
                  </div>
              )}
            </div>
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
              <div
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: '0.1s' }}
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
              </div>

              {/* Business Loan Card */}
              <div
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
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
              </div>
            </div>
          </div>
        </section>

        {/* Why Check Your Credit Score Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Check Your Credit Score?
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
                Your credit score is one of the most important factors in your financial journey. Whether you are applying for a loan, credit card, or business financing, lenders use your credit score to evaluate your creditworthiness. Knowing your credit score gives you a clear picture of your financial standing. Here's why you should check it regularly:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
                <p className="text-blue-800 font-medium">
                  With our free credit score checker, you can check your Credit score online instantly without needing a credit card or paying any fees.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Loan Approvals</h3>
                <p className="text-gray-600">A higher credit score improves your chances of getting quick loan approvals at competitive interest rates.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Better Credit Card Offers</h3>
                <p className="text-gray-600">Lenders offer premium credit cards to individuals with good credit scores.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Avoid Loan Rejections</h3>
                <p className="text-gray-600">Identify issues in your credit history and fix them before applying for a loan.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Your Financial Health</h3>
                <p className="text-gray-600">Regular credit checks help you stay on top of your financial progress.</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Completely Free</h3>
                <p className="text-gray-600">You can check your credit score online for free without hidden charges.</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Make Informed Decisions</h3>
                <p className="text-gray-600">Start by checking your free Credit score today and make informed decisions for a better financial future.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Check Your Credit Score Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                How to Check Your Credit Score for Free
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Checking your credit score is quick and easy. Follow these simple steps to get started:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Enter Your Details</h3>
                <p className="text-gray-600">Provide your name, email address, and PAN card number.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verify Your Identity</h3>
                <p className="text-gray-600">Confirm your details securely through OTP verification.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Instant Access</h3>
                <p className="text-gray-600">View your free Credit score and detailed credit report online.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track and Improve</h3>
                <p className="text-gray-600">Analyze your report and take steps to improve your score if needed.</p>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pro Tip</h3>
                <p className="text-gray-600 text-lg">
                  You can check your credit score free online without a credit card, making it safe and hassle-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Our Free Credit Score Checker
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our credit checker is designed to give you an accurate, secure, and user-friendly experience. Here's why thousands of users trust us:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Credit Card Required</h3>
                    <p className="text-gray-600">Just your PAN card to check your score.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate & Real-Time Reports</h3>
                    <p className="text-gray-600">Get updated Credit scores and credit reports instantly.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Free & Secure</h3>
                    <p className="text-gray-600">No hidden fees or charges.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Your Credit Health</h3>
                    <p className="text-gray-600">Monitor changes in your credit score over time.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Identify Improvement Areas</h3>
                    <p className="text-gray-600">Know what factors are affecting your score and fix them.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Loan & Credit Card Eligibility</h3>
                    <p className="text-gray-600">Find the best financial products based on your score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Score Information Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What Is a Credit Score and Why It Matters
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                A credit score is a 3-digit number ranging between 300 and 900 that represents your creditworthiness. The higher your score, the better your chances of getting loans and credit cards approved quickly and at lower interest rates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Credit Score Ranges */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Credit Score Ranges</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <h4 className="font-semibold text-green-800">Excellent (750 – 900)</h4>
                      <p className="text-green-600 text-sm">High chances of loan approval</p>
                    </div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h4 className="font-semibold text-blue-800">Good (700 – 749)</h4>
                      <p className="text-blue-600 text-sm">Eligible for most financial products</p>
                    </div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <h4 className="font-semibold text-yellow-800">Fair (650 – 699)</h4>
                      <p className="text-yellow-600 text-sm">May face limited options or higher interest rates</p>
                    </div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <h4 className="font-semibold text-red-800">Poor (300 – 649)</h4>
                      <p className="text-red-600 text-sm">Low chances of approval; needs improvement</p>
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Factors That Affect Credit Score */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Factors That Affect Your Credit Score</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Payment History</h4>
                      <p className="text-gray-600 text-sm">Timely repayments boost your score.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Credit Utilization Ratio</h4>
                      <p className="text-gray-600 text-sm">Keep your usage below 30% of your total credit limit.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Length of Credit History</h4>
                      <p className="text-gray-600 text-sm">Longer histories help build trust with lenders.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Credit Mix</h4>
                      <p className="text-gray-600 text-sm">A healthy balance of secured and unsecured loans is ideal.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 text-xs font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Number of Inquiries</h4>
                      <p className="text-gray-600 text-sm">Too many loan applications in a short period can lower your score.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Credit Score Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Business Credit Score Checker
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Are you a business owner looking to expand your company with loans or credit lines?
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Understand Creditworthiness</h3>
                  <p className="text-gray-600">Understand your company's creditworthiness and financial standing.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Better Loan Terms</h3>
                  <p className="text-gray-600">Improve chances of getting business loans and better credit terms.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Growth</h3>
                  <p className="text-gray-600">Monitor your business's finances and strategize for growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Credit Report Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Free Credit Report Checker
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Apart from your Credit score, you can also access your detailed credit report for free.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">This report includes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Loan repayment history</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Open and closed credit accounts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Outstanding debts</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Hard inquiries from lenders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Any defaults or late payments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Complete financial activity tracking</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 text-center">
                  With this information, you can identify errors, track financial activity, and make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                FAQs – Credit Score Checker
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. What is a good credit score?</h3>
                <p className="text-gray-600">A good credit score typically falls between 700 and 750 or above, as it shows lenders that you manage debt responsibly, improving your chances of loan approvals and lower interest rates.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. How can I check my credit score for free without a credit card?</h3>
                <p className="text-gray-600">You can simply use your PAN card and verify with an OTP to get your free credit score instantly. No credit card is needed.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Is it safe to check my credit score online?</h3>
                <p className="text-gray-600">Yes, checking your credit score on our platform is 100% safe and secure. Your data is protected with encryption and only shared with your approval.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4. How often should I check my credit score?</h3>
                <p className="text-gray-600">You should check your score at least once every 3-6 months to track your progress and ensure there are no errors in your report.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Does checking my credit score affect my score?</h3>
                <p className="text-gray-600">No, checking your score on our platform is a soft inquiry and does not impact your credit score.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. What is a good Credit score to get a loan approved?</h3>
                <p className="text-gray-600">A Credit score of 750 or higher is seen as excellent and boosts your chances of getting a loan approved.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Take Control Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Take Control of Your Financial Future
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Your credit score opens the door to greater financial opportunities. Whether you want to apply for a personal loan, business loan, or credit card, knowing your score is the first step.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="text-xl text-white font-semibold mb-4">
                Check your credit score today – completely free and secure.
              </p>
              <button
                onClick={() => {
                  // Scroll to the form
                  const formSection = document.querySelector('.form-container');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Check Your Credit Score Now
              </button>
            </div>
          </div>
        </section>

        <CTA />
      </div>
  );
}

// Ensure static generation for SEO
export async function getStaticProps() {
    return {
        props: {},
    };
} 
