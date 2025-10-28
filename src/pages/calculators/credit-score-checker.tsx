'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
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
  Zap,
  Banknote,
  Briefcase,
  FileText,
  TrendingUp,
  BarChart3,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";



const trackCreditScoreCheck = (eventName: string, data: any) => console.log('Analytics - Credit Score Check:', eventName, data);
const trackEvent = (eventName: string, data: any) => console.log('Analytics - Event:', eventName, data);
// --- END SIMULATED EXTERNAL DEPENDENCIES ---


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
const GET_SCORE_URL = `${API_BASE_URL}/get-score/v2`;
const CHECK_EXISTING_URL = `${API_BASE_URL}/check-existing`;

// --- MASTERS FOR CODE TRANSLATION (Integrated from user-provided masters) ---

const ACCOUNT_TYPE_MASTER: { [key: string]: string } = {
  '1': 'HOUSING LOAN', '2': 'PROPERTY LOAN', '3': 'LOAN AGAINST SHARES/SECURITIES',
  '4': 'AUTO LOAN', '5': 'PERSONAL LOAN', '6': 'CONSUMER LOAN', '7': 'GOLD LOAN',
  '8': 'EDUCATIONAL LOAN', '9': 'LOAN TO PROFESSIONAL', '10': 'CREDIT CARD',
  '11': 'LEASING', '12': 'OVERDRAFT', '13': 'TWO-WHEELER LOAN', '14': 'NON-FUNDED CREDIT FACILITY',
  '15': 'LOAN AGAINST BANK DEPOSITS', '16': 'FLEET CARD', '17': 'Commercial Vehicle Loan',
  '18': 'Telco – Wireless', '19': 'Telco – Broadband', '20': 'Telco – Landline',
  '23': 'GECL Secured', '24': 'GECL Unsecured', '31': 'Secured Credit Card',
  '32': 'Used Car Loan', '33': 'Construction Equipment Loan', '34': 'Tractor Loan',
  '35': 'Corporate Credit Card', '36': 'Kisan Credit Card', '37': 'Loan on Credit Card',
  '38': 'PMJDY - Overdraft', '39': 'Mudra Loans', '40': 'Microfinance – Business Loan',
  '41': 'Microfinance – Personal Loan', '42': 'Microfinance – Housing Loan', '43': 'Microfinance – Others',
  '44': 'PMAY - CLSS', '45': 'P2P Personal Loan', '46': 'P2P Auto Loan', '47': 'P2P Education Loan',
  '51': 'BUSINESS LOAN – GENERAL', '52': 'BUSINESS LOAN –PRIORITY SECTOR – SMALL BUSINESS',
  '53': 'BUSINESS LOAN –PRIORITY SECTOR – AGRICULTURE', '54': 'BUSINESS LOAN –PRIORITY SECTOR – OTHERS',
  '55': 'BUSINESS NON-FUNDED CREDIT FACILITY – GENERAL', '56': 'BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – SMALL BUSINESS',
  '57': 'BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – AGRICULTURE', '58': 'BUSINESS NON-FUNDED CREDIT FACILITY – PRIORITY SECTOR – OTHERS',
  '59': 'BUSINESS LOANS AGAINST BANK DEPOSITS', '60': 'Staff Loan', '61': 'Business Loan - Unsecured',
  '69': 'Short Term Personal Loan [Unsecured]', '70': 'Priority Sector Gold Loan [Secured]', '71': 'Temporary Overdraft [Unsecured]',
  '0': 'Other/Uncategorized Loan', '50': 'Business Loan - Secured'
};

const ENQUIRY_REASON_MASTER: { [key: string]: string } = {
  '1': 'Agriculture Loan', '2': 'Auto Loan', '3': 'Business Loan', '4': 'Commercial Vehicle Loan',
  '5': 'Construction Equipment loan', '6': 'Consumer Loan', '7': 'Credit Card', '8': 'Education Loan',
  '9': 'Leasing', '10': 'Loan against collateral', '11': 'Microfinance', '12': 'Non-funded Credit Facility',
  '13': 'Personal Loan', '14': 'Property Loan', '15': 'Telecom', '16': 'Two/Three Wheeler Loan',
  '17': 'Working Capital Loan', '18': 'Consumer Loan', '19': 'Credit Review', '99': 'Others'
};

const ACCOUNT_STATUS_MASTER: { [key: string]: { label: string, style: string } } = {
  '11': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '71': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '78': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '80': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '82': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '83': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '84': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '21': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '22': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '23': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '24': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '25': { label: 'ACTIVE', style: 'bg-green-100 text-green-800 border-green-300' },
  '131': { label: 'Restructured (Calamity)', style: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  '130': { label: 'Restructured (COVID-19)', style: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  '30': { label: 'Restructured', style: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  '32': { label: 'Settled', style: 'bg-orange-100 text-orange-800 border-orange-300' },
  '33': { label: 'Post WO Settled', style: 'bg-orange-100 text-orange-800 border-orange-300' },
  '43': { label: 'Written-Off', style: 'bg-red-100 text-red-800 border-red-300' },
  '13': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
  '14': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
  '15': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
  '12': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
  '53': { label: 'Suit Filed', style: 'bg-red-100 text-red-800 border-red-300' },
  '89': { label: 'Wilful Default', style: 'bg-red-100 text-red-800 border-red-300' },
  '16': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
  '17': { label: 'CLOSED', style: 'bg-gray-100 text-gray-800 border-gray-300' },
};

const EMPLOYMENT_STATUS_MASTER: { [key: string]: string } = {
  'S': 'Salaried',
  'N': 'Non-Salaried',
  'E': 'Self-employed',
  'P': 'Self-employed Professional',
  'U': 'Unemployed',
};

// --- UTILITY FUNCTIONS ---

/**
 * Formats a number into the Indian numbering system (e.g., 100000 -> 1,00,000).
 * Handles string or number input. Returns 'N/A' or '0' for non-numeric/null values.
 * @param value The number to format.
 * @returns Formatted string with comma separation.
 */
const formatIndianNumber = (value: string | number | null): string => {
  if (value === null || value === undefined) return '0';

  let numStr: string;
  if (typeof value === 'number') {
    numStr = value.toFixed(0); // Ensure no decimals for currency
  } else if (typeof value === 'string') {
    numStr = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters like commas
  } else {
    return '0';
  }

  if (numStr === '' || isNaN(parseInt(numStr))) return '0';
  if (numStr === '0') return '0';

  // Indian format: first group of 3 digits, then groups of 2 digits
  let lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return formatted;
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

    if (result === null || result === undefined) return defaultValue;
    if (typeof result === 'number') return result.toString();
    if (typeof result === 'string') return result.trim() === '' ? defaultValue : result.trim();
    return result;
  } catch (error) {
    return defaultValue;
  }
};

const safeGetNumber = (obj: any, path: string, defaultValue: number | null = 0): number | null => {
  try {
    const value = safeGet(obj, path, defaultValue?.toString() || '0');
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const num = parseFloat(value.replace(/,/g, '')); // Remove commas for numbers like "50,000"
      return isNaN(num) ? defaultValue : num;
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// FIXED: Adjusted path for new JSON structure
const validateCreditScoreData = (data: CreditScoreData): boolean => {
  if (!data || typeof data !== 'object') return false;
  // Allow null credit_score for cases where no credit record exists
  if (data.credit_score !== null && (typeof data.credit_score !== 'number')) return false;
  // Ensure the core report structure is present (INProfileResponse is the root of the report)
  if (!data.report || !data.report.INProfileResponse || !data.report.INProfileResponse.CreditProfileHeader) return false;
  return true;
};

// FIXED: Adjusted paths for new JSON structure
const hasValidReportData = (creditScoreData: CreditScoreData | null): boolean => {
  if (!creditScoreData || !creditScoreData.report || !creditScoreData.report.INProfileResponse) return false;

  const report = creditScoreData.report.INProfileResponse;
  const hasAccountData = !!safeGet(report, 'CAIS_Account.CAIS_Account_DETAILS', null);
  const hasSummaryData = !!safeGet(report, 'CAIS_Account.CAIS_Summary', null);
  const hasPersonalInfo = !!safeGet(report, 'Current_Application.Current_Application_Details.Current_Applicant_Details', null);

  return hasAccountData || hasSummaryData || hasPersonalInfo || creditScoreData.credit_score !== null;
};

const formatDateFromYYYYMMDD = (dateString: string | number | null): string => {
  if (!dateString) return 'N/A';

  const date = dateString.toString();
  if (date.length === 8) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    // For simplicity and matching common format: DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }
  return 'N/A';
};

const getAccountType = (code: string | number) => {
  const codeStr = String(code);
  return ACCOUNT_TYPE_MASTER[codeStr] || `Other (Code: ${codeStr})`;
};

const getAccountStatus = (code: string | number) => {
  const codeStr = String(code);
  return ACCOUNT_STATUS_MASTER[codeStr] || { label: `Other (Code: ${codeStr})`, style: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
};

const getEnquiryReason = (code: string | number) => {
  const codeStr = String(code);
  return ENQUIRY_REASON_MASTER[codeStr] || `Other (Code: ${codeStr})`;
};

const getEmploymentStatus = (code: string | number) => {
  const codeStr = String(code);
  return EMPLOYMENT_STATUS_MASTER[codeStr] || `Other (Code: ${codeStr})`;
};

// Helper functions for sessionStorage operations (Client-side only)
const getSessionStorage = (key: string) => { if (typeof window !== 'undefined') { return sessionStorage.getItem(key); } return null; };
const setSessionStorage = (key: string, value: string) => { if (typeof window !== 'undefined') { sessionStorage.setItem(key, value); } };
const removeSessionStorage = (key: string) => { if (typeof window !== 'undefined') { sessionStorage.removeItem(key); } };

// --- START OF MAIN COMPONENT ---

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
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- Utility/Session Logic ---

  const clearAllSessionData = useCallback(() => {
    removeSessionStorage('cibilReportData');
    removeSessionStorage('authToken');
    removeSessionStorage('mobileNumber');
    removeSessionStorage('userDetails');
    removeSessionStorage('noCreditRecord');
  }, []);

  const syncSessionData = useCallback(() => {
    if (authToken) setSessionStorage('authToken', authToken);
    if (mobileNumber) setSessionStorage('mobileNumber', mobileNumber);
    if (userDetails.name) setSessionStorage('userDetails', JSON.stringify(userDetails));
    if (creditScoreData) setSessionStorage('cibilReportData', JSON.stringify(creditScoreData));
    if (noCreditRecord) setSessionStorage('noCreditRecord', 'true');
  }, [authToken, mobileNumber, userDetails, creditScoreData, noCreditRecord]);

  const resetForm = useCallback(() => {
    clearAllSessionData();
    setCurrentStep(1);
    setMobileNumber('');
    setOtp(['', '', '', '', '', '']);
    setUserDetails({ name: '', pan: '', email: '', gender: 'male' });
    setAuthToken('');
    setCreditScoreData(null);
    setError('');
    setNoCreditRecord(false);
    setIsCheckingExisting(false);
    setIsChecked(false);
  }, [clearAllSessionData]);

  // --- Core Business Logic Functions ---

  const validateUserDetails = () => {
    if (!userDetails.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userDetails.pan.toUpperCase())) {
      setError('Please enter a valid 10-digit PAN number.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userDetails.email.toLowerCase())) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const fetchCreditScore = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setCurrentStep(4); // Move to loading step

      const scoreResponse = await fetch(GET_SCORE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const scoreData = await scoreResponse.json();

      const isSuccess = scoreData.message && (scoreData.message.includes('Success') || scoreData.message.includes('successfully'));
      const apiData = scoreData.data;

      // Check for 'No Credit Record' conditions
      // FIXED: Use safeGetNumber for credit_score check on apiData root
      const isNoCreditRecord = scoreData.message && (
          scoreData.message.toLowerCase().includes('no credit record') ||
          scoreData.message.toLowerCase().includes('no credit history') ||
          (apiData && (apiData.status === 2 || safeGetNumber(apiData, 'credit_score', 0) === 0))
      );

      if (isNoCreditRecord) {
        setNoCreditRecord(true);
        setSessionStorage('noCreditRecord', 'true');
        trackEvent('credit_score_no_record', { user_mobile: mobileNumber });
        setCurrentStep(6);
        return;
      }

      if (!isSuccess || !apiData || !apiData.report || !apiData.report.INProfileResponse) {
        throw new Error(scoreData.message || 'Failed to retrieve credit report data from API.');
      }

      const creditScorePayload: CreditScoreData = {
        credit_score: safeGetNumber(apiData, 'credit_score', null),
        report: apiData.report,
        fetched_at: apiData.fetched_at,
        status: apiData.status,
      };

      if (!validateCreditScoreData(creditScorePayload)) {
        throw new Error('Invalid or incomplete credit score data received.');
      }

      setCreditScoreData(creditScorePayload);
      setSessionStorage('cibilReportData', JSON.stringify(creditScorePayload));

      trackCreditScoreCheck('credit_score_checker', {
        credit_score: creditScorePayload.credit_score,
        user_mobile: mobileNumber,
        step: 'step_5'
      });

      setCurrentStep(5);

    } catch (error) {
      console.error('Credit score fetch error:', error);
      setCurrentStep(3); // Go back to details input on critical failure
      setError((error as Error).message || 'Error fetching credit score. Please ensure all details are correct.');
    } finally {
      setIsLoading(false);
    }
  }, [mobileNumber]);


  const generateOtp = useCallback(async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!isChecked) {
      setError('Please read and accept the Experian Terms & Conditions.');
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
        trackEvent('otp_generated', { user_mobile: mobileNumber });
      } else {
        setError(data.message || 'Failed to send OTP. Please check the number and try again.');
        trackEvent('otp_generation_failed', { user_mobile: mobileNumber, error_message: data.message });
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      trackEvent('otp_generation_error', { user_mobile: mobileNumber, error_type: 'network_error' });
    } finally {
      setIsLoading(false);
    }
  }, [mobileNumber, isChecked]);

  const verifyOtp = useCallback(async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${VERIFY_OTP_URL}?phone=${mobileNumber}&utm_source=website&utm_medium=website&source=creditscore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpString }),
      });

      const data = await response.json();

      if (data.success === true) {
        const token = data.access_token;
        setAuthToken(token);
        setSessionStorage('authToken', token);
        setSessionStorage('mobileNumber', mobileNumber);
        trackEvent('otp_verified', { user_mobile: mobileNumber });


        const checkExistingResponse = await fetch(CHECK_EXISTING_URL, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const existingData = await checkExistingResponse.json();

        if (existingData.message === 'User exists' && existingData.data) {
          const userData = {
            name: existingData.data.nickname || '',
            pan: existingData.data.pan || '',
            email: existingData.data.email || '',
            gender: existingData.data.gender || 'male'
          };
          setUserDetails(userData);
          setSessionStorage('userDetails', JSON.stringify(userData));
          // Proceed to fetch score with existing data
          await fetchCreditScore(token);
        } else {
          // No existing user found, prompt for full details
          setCurrentStep(3);
        }
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
        trackEvent('otp_verification_failed', { user_mobile: mobileNumber, error_message: data.message });
      }
    } catch (error) {
      setError('Network error. Please try again.');
      trackEvent('otp_verification_error', { user_mobile: mobileNumber, error_type: 'network_error' });
      setCurrentStep(3); // Fallback to details step on network/critical error
    } finally {
      setIsLoading(false);
      setIsCheckingExisting(false);
      setOtp(['', '', '', '', '', '']);
    }
  }, [otp, mobileNumber, fetchCreditScore]);

  const submitDetails = useCallback(async () => {
    if (!validateUserDetails()) return;

    setIsLoading(true);
    setError('');
    setCurrentStep(4);

    try {
      const submitResponse = await fetch(SUBMIT_DETAILS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: userDetails.name,
          pan: userDetails.pan,
          email: userDetails.email,
          gender: userDetails.gender
        }),
      });

      const submitData = await submitResponse.json();

      const isSuccess = submitData.message && (
          submitData.message.includes('Success') ||
          submitData.message.includes('successfully')
      );

      if (isSuccess) {
        setSessionStorage('userDetails', JSON.stringify(userDetails));
        await fetchCreditScore(authToken);
      } else {
        throw new Error(submitData.message || 'Failed to submit details');
      }
    } catch (error) {
      console.error('Submit details error:', error);
      setCurrentStep(3);
      setError((error as Error).message || 'Error submitting details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userDetails, authToken, fetchCreditScore]);


  // --- Hooks and Lifecycle (Initial Load Check Updated) ---

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted) syncSessionData();
  }, [authToken, mobileNumber, userDetails, creditScoreData, noCreditRecord, mounted, syncSessionData]);

  // Initial load check for saved session data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedToken = getSessionStorage('authToken');
    const savedMobile = getSessionStorage('mobileNumber');
    const savedUserDetails = getSessionStorage('userDetails');
    const savedData = getSessionStorage('cibilReportData');
    const savedNoCreditRecord = getSessionStorage('noCreditRecord');

    if (savedData) {
      try {
        const scoreData = JSON.parse(savedData);
        setCreditScoreData(scoreData);
        if (savedToken) setAuthToken(savedToken);
        if (savedMobile) setMobileNumber(savedMobile);
        if (savedUserDetails) setUserDetails(JSON.parse(savedUserDetails));
        setCurrentStep(5);
        return;
      } catch (e) {
        removeSessionStorage('cibilReportData');
      }
    }

    if (savedNoCreditRecord === 'true') {
      if (savedToken) setAuthToken(savedToken);
      if (savedMobile) setMobileNumber(savedMobile);
      if (savedUserDetails) setUserDetails(JSON.parse(savedUserDetails));
      setNoCreditRecord(true);
      setCurrentStep(6);
      return;
    }


    if (savedToken && savedMobile) {
      setAuthToken(savedToken);
      setMobileNumber(savedMobile);
      setIsCheckingExisting(true);
      setCurrentStep(4); // Show loading while checking existing user

      const checkExistingAndFetch = async () => {
        try {
          const checkExistingResponse = await fetch(CHECK_EXISTING_URL, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${savedToken}` },
          });

          const existingData = await checkExistingResponse.json();

          if (existingData.message === 'User exists' && existingData.data) {
            const userData = {
              name: existingData.data.nickname || '',
              pan: existingData.data.pan || '',
              email: existingData.data.email || '',
              gender: existingData.data.gender || 'male'
            };
            setUserDetails(userData);
            setSessionStorage('userDetails', JSON.stringify(userData));
            await fetchCreditScore(savedToken);
          } else if (savedUserDetails) {
            setUserDetails(JSON.parse(savedUserDetails));
            await fetchCreditScore(savedToken);
          } else {
            setCurrentStep(3);
          }
        } catch (e) {
          console.error('Initial load check failed:', e);
          setCurrentStep(3);
        } finally {
          setIsCheckingExisting(false);
        }
      };

      checkExistingAndFetch();
    }
  }, [fetchCreditScore]);

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
    const numericValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

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


  // --- Score Calculation Utilities (No change needed) ---

  const getSemiCircleProgress = (score: number | null): number => {
    if (score === null) return 0;
    const minScore = 300;
    const maxScore = 850;
    const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
    const percentage = ((normalizedScore - minScore) / (maxScore - minScore)) * 100;
    const arcLength = 157.08;
    return (percentage / 100) * arcLength;
  };

  const getScoreRange = (score: number | null): string => {
    if (score === null) return 'No Record';
    if (score >= 750) return '750 - 850';
    if (score >= 700) return '700 - 749';
    if (score >= 650) return '650 - 699';
    if (score >= 560) return '560 - 649';
    return '300 - 559';
  };

  const getScoreCategoryImage = (score: number | null): string => {
    if (score === null) return 'No Record';
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 560) return 'Bad';
    return 'Very Bad';
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
      return 'You have a fair credit score. For the best offers, you should work on improving your score. Do not miss any payments of your credit card bills or loans.';
    } else {
      return 'Your credit score needs improvement. You may have difficulty getting approved for credit products. Focus on paying bills on time and reducing outstanding debt to improve your score.';
    }
  };

  // --- REFACTOR: Robust Data Extraction Functions (FIXED PATHS) ---

  const extractPersonalDetails = useMemo(() => {
    if (!creditScoreData || !creditScoreData.report || !creditScoreData.report.INProfileResponse) return {};
    const report = creditScoreData.report.INProfileResponse;

    // Prioritize CAIS (reported by lender) data, fall back to Current Application (user provided)
    const caisDetails = safeGet(report, 'CAIS_Account.CAIS_Account_DETAILS', []);
    const firstCaisAccount = Array.isArray(caisDetails) ? caisDetails[0] : caisDetails;

    // Corrected paths for the new structure: CAIS_Holder_Details is an array with one object
    const holderDetails = safeGet(firstCaisAccount, 'CAIS_Holder_Details.0', safeGet(report, 'Current_Application.Current_Application_Details.Current_Applicant_Details', 'N/A'));
    const holderAddress = safeGet(firstCaisAccount, 'CAIS_Holder_Address_Details.0', safeGet(report, 'Current_Application.Current_Application_Details.Current_Applicant_Address_Details.0', 'N/A'));
    const holderPhone = safeGet(firstCaisAccount, 'CAIS_Holder_Phone_Details.0', safeGet(report, 'Current_Application.Current_Application_Details.Current_Applicant_Details', 'N/A'));

    const firstName = safeGet(holderDetails, 'First_Name_Non_Normalized', safeGet(holderDetails, 'First_Name', userDetails.name));
    const middleName = safeGet(holderDetails, 'Middle_Name_1_Non_Normalized', safeGet(holderDetails, 'Middle_Name1', ''));
    const lastName = safeGet(holderDetails, 'Surname_Non_Normalized', safeGet(holderDetails, 'Last_Name', ''));

    // Fallback logic for name construction
    const fullNameParts = [
      safeGet(holderDetails, 'First_Name_Non_Normalized', '').toUpperCase(),
      safeGet(holderDetails, 'Middle_Name_1_Non_Normalized', '').toUpperCase(),
      safeGet(holderDetails, 'Middle_Name_2_Non_Normalized', '').toUpperCase(),
      safeGet(holderDetails, 'Surname_Non_Normalized', '').toUpperCase()
    ].filter(Boolean).join(' ').trim();

    const appName = safeGet(report, 'Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name', userDetails.name);
    const finalFullName = fullNameParts || appName || userDetails.name;


    const pan = safeGet(holderDetails, 'Income_TAX_PAN', safeGet(holderDetails, 'IncomeTaxPan', userDetails.pan));
    const dob = formatDateFromYYYYMMDD(safeGet(holderDetails, 'Date_of_birth', safeGet(holderDetails, 'Date_Of_Birth_Applicant', '')));
    const mobile = safeGet(holderPhone, 'Mobile_Telephone_Number', safeGet(holderPhone, 'MobilePhoneNumber', mobileNumber));
    const email = safeGet(holderPhone, 'EMailId', userDetails.email);

    const addressLine1 = safeGet(holderAddress, 'First_Line_Of_Address_non_normalized', safeGet(holderAddress, 'FlatNoPlotNoHouseNo', ''));
    const addressLine2 = safeGet(holderAddress, 'Second_Line_Of_Address_non_normalized', safeGet(holderAddress, 'BldgNoSocietyName', ''));
    const addressLine3 = safeGet(holderAddress, 'Third_Line_Of_Address_non_normalized', safeGet(holderAddress, 'RoadNoNameAreaLocality', ''));
    const city = safeGet(holderAddress, 'City_non_normalized', safeGet(holderAddress, 'City', ''));
    const stateCode = safeGet(holderAddress, 'State_non_normalized', safeGet(holderAddress, 'State', ''));
    const pin = safeGet(holderAddress, 'ZIP_Postal_Code_non_normalized', safeGet(holderAddress, 'PINCode', ''));

    // Try to get income/employment from either the application details or the first CAIS account
    const rawReportedIncome = safeGet(firstCaisAccount, 'Income', safeGet(report, 'Current_Application.Current_Application_Details.Current_Other_Details.Income', '0'));
    const reportedIncome = formatIndianNumber(rawReportedIncome); // Apply Indian formatting here
    const employmentStatus = getEmploymentStatus(safeGet(report, 'Current_Application.Current_Application_Details.Current_Other_Details.Employment_Status', 'N/A'));


    return { fullName: finalFullName, pan, dob, mobile, email, addressLine1, addressLine2, addressLine3, city, stateCode, pin, reportedIncome, employmentStatus };
  }, [creditScoreData, userDetails, mobileNumber]);


  const extractEnquiryDetails = useMemo(() => {
    if (!creditScoreData || !creditScoreData.report || !creditScoreData.report.INProfileResponse) return [];
    const enquiryDetails = safeGet(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Application_Details', null);

    // FIX: Handle the case where CAPS_Application_Details is a single object or an array
    if (Array.isArray(enquiryDetails)) {
      return enquiryDetails;
    } else if (enquiryDetails && typeof enquiryDetails === 'object' && enquiryDetails.Date_of_Request) {
      return [enquiryDetails];
    }
    return [];
  }, [creditScoreData]);


  const extractAccountDetails = useMemo(() => {
    if (!creditScoreData || !creditScoreData.report || !creditScoreData.report.INProfileResponse) return [];
    const accountDetails = safeGet(creditScoreData.report.INProfileResponse, 'CAIS_Account.CAIS_Account_DETAILS', null);

    // FIX: Ensure accountDetails is an array, handling null/undefined/single object case
    if (Array.isArray(accountDetails)) {
      return accountDetails;
    } else if (accountDetails && typeof accountDetails === 'object' && accountDetails.Account_Number) {
      return [accountDetails];
    }
    return [];
  }, [creditScoreData]);


  // --- JSX TEMPLATE ---

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
        <Head>
          <title>Free Credit Score Checker – Check CIBIL Score Online</title>
          <meta name="description" content="Check your credit score online for free! Instantly get your CIBIL report and track your financial health with our secure credit score checker tool." />
          <meta name="keywords" content="Credit score, credit score checker, check credit score free, how to check credit score, free credit score check, credit score check online, credit score tool, credit score check, best credit score checker, credit score report free, Cibil Score Checker, Cibil report checker, Top Cibil score checker tool, Cibil report generator, cibil score, cibil check" />
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
              {(currentStep === 1 || (currentStep === 4 && isCheckingExisting)) && (
                  <div
                      key="step1"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl animate-fade-in-up step-card form-container"
                  >
                    {isCheckingExisting ? (
                        <div className="flex flex-col items-center space-y-6">
                          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <h3 className="text-xl font-semibold text-gray-900">Checking your details...</h3>
                          <p className="text-gray-600">Verifying your existing information</p>
                        </div>
                    ) : (
                        <>
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
                              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number
                              </label>
                              <input
                                  id="mobile"
                                  type="tel"
                                  value={mobileNumber}
                                  onChange={(e) => setMobileNumber(e.target.value)}
                                  placeholder="Enter your 10-digit mobile number"
                                  maxLength={10}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                                  inputMode="numeric"
                                  pattern="[0-9]{10}"
                              />
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                              <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600"/>
                                <span className="text-sm text-blue-800">
                                            <p>For any dispute related concerns reach out to experian <a className={"font-bold underline"} href={"https://www.experian.com/disputes/main.html"} target={"_blank"}>Customer Dispute Portal</a></p>
                                        </span>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              {/* Checkbox */}
                              <input
                                  type="checkbox"
                                  id="terms"
                                  checked={isChecked}
                                  onChange={(e) => setIsChecked(e.target.checked)}
                                  className="mt-1 shrink-0 cursor-pointer accent-blue-600"
                              />

                              {/* Label + Modal trigger */}
                              <label htmlFor="terms" className="text-sm text-gray-700 leading-tight">
                                I hereby consent to Samridhya Innovations Private Limited being appointed as authorised representative to
                                receive my Credit Information from Experian for the purpose of offering loan offers. <br />
                                Please refer to the Experian{" "}
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    className="text-blue-600 hover:underline font-medium focus:outline-none"
                                >
                                  Terms & Conditions
                                </button>
                              </label>


                              {/* Modal */}
                              {showModal && (
                                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 transform transition-all duration-300 ease-out">
                                      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                          <FileText className="w-5 h-5 text-blue-600" />
                                          <h2 className="text-xl font-semibold text-gray-900">
                                            Experian Terms & Conditions
                                          </h2>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="p-1 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition duration-150"
                                            aria-label="Close modal"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                        </button>
                                      </div>
                                      <div className="px-6 py-5 max-h-[60vh] overflow-y-auto text-base text-gray-700 space-y-4 leading-relaxed">
                                        <p className="text-sm text-gray-500 font-medium pb-2 border-b border-gray-50/50">
                                          <span className="font-semibold text-gray-800">Last updated on:</span> 15/08/2025
                                        </p>
                                        <p>
                                          This End User Agreement (the "Agreement") is made between you (the "User" or "You")
                                          and <span className="font-semibold text-gray-900">Samridhya Innovations Private Limited</span>, a private limited company having its registered office at
                                          #1207 /343 & 1207 /1/343/1, 9th MAIN, 7th SECTOR, HSR LAYOUT, BANGALORE, KARNATAKA - 560102 (<span className="font-semibold text-gray-800">"CLIENT"</span>,
                                          "Us" or "We", which term shall include its successors and permitted assigns). The User
                                          and CLIENT shall be collectively referred to as the "Parties" and individually as a "Party".
                                        </p>
                                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
                                          <p className="font-medium text-sm text-gray-900">
                                                            <span className="font-bold text-blue-600 uppercase">BY EXECUTING THIS AGREEMENT / CONSENT FORM, YOU ARE EXPRESSLY AGREEING TO ACCESS THE
                                                            EXPERIAN CREDIT INFORMATION REPORT AND CREDIT SCORE,</span> AGGREGATE SCORES, INFERENCES,
                                            REFERENCES AND DETAILS (AS DEFINED BELOW) (TOGETHER REFERRED AS "CREDIT INFORMATION").
                                            YOU HEREBY ALSO CONSENT TO SUCH CREDIT INFORMATION BEING PROVIDED BY EXPERIAN TO YOU
                                            AND CLIENT by using Experian tools, algorithms and devices and you hereby agree,
                                            acknowledge and accept the terms and conditions set forth herein.
                                          </p>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 pt-3">
                                          Information Collection, Use, and Confidentiality
                                        </h3>
                                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-2">
                                          <li><span className="font-semibold">End Use Purpose:</span> CLIENT shall access your Credit Information as your authorized representative and shall use it solely for the limited purpose of <span className="font-semibold">Credit Assessment and evaluation of loan eligibility</span> in relation to the services proposed to be availed by you from CLIENT.</li>
                                          <li><span className="font-semibold">Confidentiality & No-Disclosure:</span> CLIENT shall not aggregate, retain, store, copy, reproduce, republish, upload, post, transmit, sell or rent the Credit Information to any other person or use it for any purpose other than the defined End Use Purpose.</li>
                                          <li><span className="font-semibold">Data Purging:</span> The Credit Information shared by you, or received on your behalf, shall be destroyed, purged, or erased promptly upon the completion of the transaction/End Use Purpose, this period not being longer than 6 months.</li>
                                        </ul>
                                        <h3 className="text-lg font-bold text-gray-900 pt-3">Key Definitions</h3>
                                        <p className="text-sm text-gray-600">Capitalized terms used herein but not defined above shall have the following meanings:</p>
                                        <ul className="list-disc ml-6 space-y-2 text-sm">
                                          <li><span className="font-semibold text-gray-900">Business Day</span> means a day (other than a public holiday) on which banks are open for general business in Karnataka.</li>
                                          <li><span className="font-semibold text-gray-900">Credit Information Report</span> means the credit information/ scores/ aggregates/ variable/ inference or reports which shall be generated by Experian.</li>
                                          <li><span className="font-semibold text-gray-900">CICRA</span> shall mean the Credit Information Companies (Regulation) Act, 2005 read with the Credit Information Companies Rules, 2006 and the Credit Information Companies Regulations, 2006, and shall include any other rules and regulations prescribed thereunder.</li>
                                        </ul>
                                        <h3 className="text-lg font-bold text-gray-900 pt-3">Governing Law and Jurisdiction</h3>
                                        <p className="text-sm text-gray-700">The relationship between you and CLIENT shall be governed by the laws of <span className="font-semibold">India</span>, and all claims or disputes arising therefrom shall be subject to the exclusive jurisdiction of the courts in <span className="font-semibold">Karnataka</span>.</p>
                                        <p className="mt-4 text-center p-3 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                                          Please read the above mentioned terms & conditions and check the box shown in the
                                          previous screen to complete the authorization process/ for sharing of your Credit
                                          Information by Experian with <span className="font-semibold text-gray-800">Samridhya Innovations Private Limited</span> in its capacity as your authorized representative.
                                        </p>
                                        <p className="text-xs text-gray-500 italic text-right mt-2"><span className="font-medium">Electronic Record Declaration:</span> This document is an electronic record in terms of the Information Technology Act, 2000.</p>
                                      </div>
                                      <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-xl">
                                        <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition duration-150 font-medium">
                                          Close
                                        </button>
                                        <button
                                            onClick={() => { setIsChecked(true); setShowModal(false); }}
                                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/30 transition duration-200"
                                        >
                                          Accept & Continue
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                              )}
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                                  <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600"/>
                                    <span className="text-sm text-red-800">{error}</span>
                                  </div>
                                </div>
                            )}

                            <button
                                onClick={generateOtp}
                                disabled={isLoading || !(isChecked)}
                                className=" cursor-pointer w-full bg-gradient-to-r from-[#276ef4] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#276ef4] transition-all duration-200 disabled:opacity-50"
                            >
                              {isLoading ? 'Sending OTP...' : 'Get Free Credit Report'}
                            </button>
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
                        </>
                    )}
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name (as per PAN)
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
                          PAN Number
                        </label>
                        <input
                            id="pan"
                            type="text"
                            value={userDetails.pan}
                            onChange={(e) => setUserDetails(prev => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                            placeholder="Enter your PAN number"
                            maxLength={10}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                            id="email"
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

              {/* Step 4: Loading (Dedicated step for score fetch) */}
              {currentStep === 4 && !isCheckingExisting && (
                  <div
                      key="step4"
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center animate-fade-in-up step-card form-container"
                  >
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Fetching your credit score...
                        </h3>
                        <p className="text-gray-600">
                          This may take a few moments
                        </p>
                      </div>
                    </div>
                  </div>
              )}

              {/* Step 5: Credit Score Dashboard (COMPREHENSIVE) */}
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
                          Start New Check
                        </button>
                      </div>

                      {/* Header & Score Meter */}
                      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl credit-card">
                        <div className="text-left mb-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Hey {extractPersonalDetails.fullName || 'User'}!
                          </h1>
                          <p className="text-gray-600">

                            Here's your Credit Score for {formatDateFromYYYYMMDD(safeGet(creditScoreData.report.INProfileResponse, 'CreditProfileHeader.ReportDate')).split('/').slice(1).join('/') || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>

                        {/* Credit Score Meter */}
                        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
                          <div className="relative">
                            {/* Semi-Circular Progress Meter */}
                            <div className="w-72 h-40 sm:w-80 sm:h-48 lg:w-96 lg:h-56 mx-auto relative">
                              <svg className="w-full h-full" viewBox="0 0 120 70">
                                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
                                <path
                                    d="M 10 60 A 50 50 0 0 1 110 60"
                                    fill="none"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${getSemiCircleProgress(creditScoreData.credit_score)} 157.08`}
                                    style={{ strokeDashoffset: 0, transition: 'stroke-dasharray 1s ease-in-out' }}
                                />
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
                              <div className="text-center"><div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mx-auto mb-1 sm:mb-2"></div><div className="text-xs sm:text-sm font-semibold text-gray-700">Very Bad</div><div className="text-xs text-gray-500">300-559</div></div>
                              <div className="text-center"><div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full mx-auto mb-1 sm:mb-2"></div><div className="text-xs sm:text-sm font-semibold text-gray-700">Bad</div><div className="text-xs text-gray-500">560-649</div></div>
                              <div className="text-center"><div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full mx-auto mb-1 sm:mb-2"></div><div className="text-xs sm:text-sm font-semibold text-gray-700">Fair</div><div className="text-xs text-gray-500">650-699</div></div>
                              <div className="text-center"><div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full mx-auto mb-1 sm:mb-2"></div><div className="text-xs sm:text-sm font-semibold text-gray-700">Good</div><div className="text-xs text-gray-500">700-749</div></div>
                              <div className="text-center"><div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full mx-auto mb-1 sm:mb-2"></div><div className="text-xs sm:text-sm font-semibold text-gray-700">Excellent</div><div className="text-xs text-gray-500">750-850</div></div>
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 text-center">
                            Report generated on: {formatDateFromYYYYMMDD(safeGet(creditScoreData.report.INProfileResponse, 'CreditProfileHeader.ReportDate'))}
                          </div>

                          <div className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wider mt-2 text-center">
                            Credit Score
                          </div>
                        </div>


                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600"/>
                            <span className="text-sm text-blue-800">
                                            <p>For any dispute related concerns reach out to experian <a className={"font-bold underline"} href={"https://www.experian.com/disputes/main.html"} target={"_blank"}>Customer Dispute Portal</a></p>
                                        </span>
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
                          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: getScoreDescription(creditScoreData.credit_score) }} />
                        </div>
                      </div>

                      {/* Personal Information (Enhanced) */}
                      {creditScoreData.credit_score !== null && (
                          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <User className="w-5 h-5 text-gray-600"/> Personal Information
                            </h3>

                            {(() => {
                              const details = extractPersonalDetails;
                              const { fullName, pan, dob, mobile, email, addressLine1, addressLine2, addressLine3, city, stateCode, pin, reportedIncome, employmentStatus } = details;

                              const fullAddress = `${addressLine1} ${addressLine2} ${addressLine3}`.trim();

                              return (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                      <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Identity & Contact</h4>
                                      <div className="mt-3 space-y-2">
                                        <div className="flex justify-between"><span className="text-sm text-gray-700 font-medium">Full Name:</span><span className="font-semibold text-sm text-gray-900 text-right">{fullName}</span></div>
                                        <div className="flex justify-between"><span className="text-sm text-gray-700 font-medium">PAN:</span><span className="font-semibold text-sm text-gray-900 text-right">{pan}</span></div>
                                        <div className="flex justify-between"><span className="text-sm text-gray-700 font-medium">Date of Birth:</span><span className="font-semibold text-sm text-gray-900 text-right">{dob}</span></div>
                                        <div className="flex justify-between"><span className="text-sm text-gray-700 font-medium">Mobile:</span><span className="font-semibold text-sm text-gray-900 text-right">{mobile}</span></div>
                                        <div className="flex justify-between"><span className="text-sm text-gray-700 font-medium">Email:</span><span className="font-semibold text-sm text-gray-900 text-right break-all">{email}</span></div>
                                      </div>
                                    </div>

                                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                                      <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Reported Address</h4>
                                      <div className="mt-3 space-y-2">
                                        <p className="text-sm text-gray-900 font-semibold">{fullAddress || 'Address not available.'}</p>
                                        <p className="text-sm text-gray-700">{city} {stateCode !== 'N/A' && stateCode} {pin !== 'N/A' && `- ${pin}`}</p>
                                        <div className="flex justify-between border-t border-orange-200 pt-2 mt-2">
                                          <span className="text-sm text-gray-700 font-medium">Reported Income:</span>
                                          <span className="font-semibold text-sm text-gray-900">₹{reportedIncome}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm text-gray-700 font-medium">Employment:</span>
                                          <span className="font-semibold text-sm text-gray-900">{employmentStatus}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              );
                            })()}
                          </div>
                      )}

                      {/* Credit Report Summary */}
                      {creditScoreData.credit_score !== null && (
                          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <Banknote className="w-5 h-5 text-gray-600"/> Credit Summary
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Accounts</h4>
                                <p className="text-2xl font-bold text-gray-900">
                                  {safeGet(creditScoreData.report.INProfileResponse, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal', '0')}
                                </p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active Accounts</h4>
                                <p className="text-2xl font-bold text-gray-900">
                                  {safeGet(creditScoreData.report.INProfileResponse, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive', '0')}
                                </p>
                              </div>
                              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Closed Accounts</h4>
                                <p className="text-2xl font-bold text-gray-900">
                                  {safeGet(creditScoreData.report.INProfileResponse, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed', '0')}
                                </p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Outstanding</h4>
                                <p className="text-xl font-bold text-gray-900">
                                  ₹{formatIndianNumber(safeGet(creditScoreData.report.INProfileResponse, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All', '0'))}
                                </p>
                              </div>
                            </div>
                          </div>
                      )}

                      {safeGetNumber(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Summary.CAPSLast180Days', 0) > 0 && creditScoreData.credit_score !== null && (
                          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-gray-600"/> Recent Credit Inquiries (Hard Pulls)
                            </h3>

                            {/* Enquiry Summary Boxes */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                              <div className="bg-purple-50 p-4 rounded-lg border border-purple-300 text-center">
                                <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Last 7 Days</h4>
                                <p className="text-2xl font-bold text-gray-900">{safeGet(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Summary.CAPSLast7Days', '0')}</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg border border-purple-300 text-center">
                                <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Last 30 Days</h4>
                                <p className="text-2xl font-bold text-gray-900">{safeGet(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Summary.CAPSLast30Days', '0')}</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg border border-purple-300 text-center">
                                <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Last 90 Days</h4>
                                <p className="text-2xl font-bold text-gray-900">{safeGet(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Summary.CAPSLast90Days', '0')}</p>
                              </div>
                              <div className="bg-purple-50 p-4 rounded-lg border border-purple-300 text-center">
                                <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Last 180 Days</h4>
                                <p className="text-2xl font-bold text-gray-900">{safeGet(creditScoreData.report.INProfileResponse, 'CAPS.CAPS_Summary.CAPSLast180Days', '0')}</p>
                              </div>
                            </div>

                            {/* Detailed Enquiries Table */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Inquiry History</h4>
                              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                <table className="min-w-full text-sm divide-y divide-gray-200">
                                  <thead>
                                  <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Date</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Institution</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Purpose</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-semibold">Amount</th>
                                  </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                  {(() => {
                                    const enquiries = extractEnquiryDetails;

                                    if (enquiries.length === 0) {
                                      return (
                                          <tr>
                                            <td colSpan={4} className="px-4 py-3 text-center text-gray-500">No detailed recent inquiries found in report.</td>
                                          </tr>
                                      );
                                    }

                                    return enquiries.slice(0, 10).map((enquiry: any, index: number) => (
                                        <tr key={index} className="bg-white hover:bg-gray-50">
                                          <td className="px-4 py-3 text-gray-800">
                                            {formatDateFromYYYYMMDD(safeGet(enquiry, 'Date_of_Request'))}
                                          </td>
                                          <td className="px-4 py-3 text-gray-800 font-medium">{safeGet(enquiry, 'Subscriber_Name')}</td>
                                          <td className="px-4 py-3 text-gray-600">
                                            {getEnquiryReason(safeGet(enquiry, 'Enquiry_Reason'))}
                                          </td>
                                          <td className="px-4 py-3 text-gray-800">₹{formatIndianNumber(safeGet(enquiry, 'Amount_Financed', '0'))}</td>
                                        </tr>
                                    ));
                                  })()}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      )}


                      {/* Account Details (Enhanced with DPD History) */}
                      {extractAccountDetails.length > 0 && creditScoreData.credit_score !== null && (
                          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-gray-600"/> Detailed Credit Accounts
                            </h3>

                            {/* All Accounts - ensuring it handles both single object and array cases gracefully */}
                            {extractAccountDetails.map((account: any, accountIndex: number) => {
                              const status = getAccountStatus(safeGet(account, 'Account_Status'));
                              // Payment_History_Profile is a long string, extract history from there for DPD chart
                              const paymentHistoryString = safeGet(account, 'Payment_History_Profile', '');
                              const fullAccountHistory = Array.isArray(safeGet(account, 'CAIS_Account_History', [])) ? safeGet(account, 'CAIS_Account_History', []) : [];
                              const maxHistory = 12;

                              // Use the parsed CAIS_Account_History which is cleaner
                              const historyDisplay = fullAccountHistory.slice(0, maxHistory).map((hist: any) => ({
                                monthYear: `${hist.Month}/${hist.Year.toString().slice(-2)}`,
                                dpd: safeGet(hist, 'Days_Past_Due', '?'),
                                isLate: safeGet(hist, 'Days_Past_Due', '0') !== '0' && safeGet(hist, 'Days_Past_Due', '0') !== '?'
                              }));


                              return (
                                  <div key={accountIndex} className="mb-6 border border-gray-200 rounded-lg p-5 transition-shadow hover:shadow-md">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 border-b pb-3">
                                      <div>
                                        <h4 className="text-lg font-bold text-gray-900">
                                          {getAccountType(safeGet(account, 'Account_Type'))} - {safeGet(account, 'Subscriber_Name')}
                                        </h4>
                                        <p className="text-sm text-gray-500">A/C: {safeGet(account, 'Account_Number')}</p>
                                      </div>
                                      <span className={`px-3 py-1 rounded-full text-xs font-semibold mt-2 md:mt-0 ${status.style}`}>
                                                    {status.label}
                                                </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                      {/* Financial Details */}
                                      <div className="col-span-2 md:col-span-1 bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600 uppercase">Original Amt.</p>
                                        <p className="font-semibold text-gray-900">₹{formatIndianNumber(safeGet(account, 'Highest_Credit_or_Original_Loan_Amount', '0'))}</p>
                                      </div>
                                      <div className="col-span-2 md:col-span-1 bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600 uppercase">Current Balance</p>
                                        <p className="font-semibold text-gray-900">₹{formatIndianNumber(safeGet(account, 'Current_Balance', '0'))}</p>
                                      </div>
                                      <div className="col-span-1 bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600 uppercase">Opened</p>
                                        <p className="font-semibold text-gray-900">{formatDateFromYYYYMMDD(safeGet(account, 'Open_Date'))}</p>
                                      </div>
                                      <div className="col-span-1 bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-600 uppercase">Closed</p>
                                        <p className="font-semibold text-gray-900">{formatDateFromYYYYMMDD(safeGet(account, 'Date_Closed'))}</p>
                                      </div>
                                    </div>

                                    {/* Payment History/DPD Chart */}
                                    <h5 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-600" /> Payment History (Last {historyDisplay.length} Months)
                                    </h5>
                                    <div className="flex overflow-x-auto pb-2 space-x-2">
                                      {historyDisplay.reverse().map((item, index) => (
                                          <div key={index} className="flex-shrink-0 w-16 text-center p-2 rounded-lg"
                                               style={{ backgroundColor: item.isLate ? '#fee2e2' : item.dpd === '0' ? '#dcfce7' : '#f3f4f6',
                                                 border: item.isLate ? '1px solid #f87171' : '1px solid #d1d5db' }}>
                                            <div className="text-xs font-medium text-gray-500 mb-1">{item.monthYear}</div>
                                            <div className={`text-sm font-bold ${item.isLate ? 'text-red-600' : 'text-green-600'}`}>
                                              {item.dpd === '0' ? 'OK' : item.dpd}
                                            </div>
                                          </div>
                                      ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3">
                                      DPD: Days Past Due. 'OK' or '0' means timely payment. Higher numbers indicate delay. '?' means status not reported.
                                    </p>
                                  </div>
                              );
                            })}
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
                        Start New Check
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
                          Hey <span className="font-bold text-gray-900">{ userDetails.name || 'User'}</span>! We couldn't find any credit history associated with your details.
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