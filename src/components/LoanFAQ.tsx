'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface LoanFAQProps {
  loanType: string;
  className?: string;
}

const loanFAQs: Record<string, FAQItem[]> = {
  personal: [
    {
      question: 'What is a personal loan?',
      answer: 'A personal loan is an unsecured loan that you can use for any personal purpose like medical expenses, home renovation, debt consolidation, or any other financial need. No collateral is required.'
    },
    {
      question: 'What is the minimum and maximum loan amount?',
      answer: 'You can borrow from ₹50,000 to ₹40 Lakhs depending on your income, credit score, and repayment capacity.'
    },
    {
      question: 'What is the interest rate for personal loans?',
      answer: 'Interest rates start from 10.99% p.a. and vary based on your credit score, income, and loan amount. Better credit scores get lower rates.'
    },
    {
      question: 'What is the loan tenure period?',
      answer: 'You can choose a repayment period from 12 months to 84 months (7 years) based on your convenience and EMI affordability.'
    },
    {
      question: 'What documents are required?',
      answer: 'Basic documents include PAN Card, Aadhaar Card, bank statements (last 3 months), salary slips (last 3 months), and address proof.'
    },
    {
      question: 'How long does approval take?',
      answer: 'Most applications get approved within 10-15 minutes. Once approved, funds are disbursed within 24 hours to your bank account.'
    },
    {
      question: 'Is there any prepayment penalty?',
      answer: 'Prepayment charges may apply if you close the loan before 12 months. After 12 months, you can prepay without any charges.'
    },
    {
      question: 'Can I apply if I have a low credit score?',
      answer: 'While a good credit score (750+) is preferred, we do consider applications with lower scores. The interest rate may be higher for lower credit scores.'
    }
  ],
  business: [
    {
      question: 'What is a business loan?',
      answer: 'A business loan is a financing option designed to help businesses meet their working capital needs, expand operations, purchase equipment, or fund any business-related expenses.'
    },
    {
      question: 'What types of businesses are eligible?',
      answer: 'We provide loans to various business types including proprietorships, partnerships, private limited companies, and MSMEs with a minimum business vintage of 2 years.'
    },
    {
      question: 'What is the loan amount range?',
      answer: 'Business loans range from ₹5 Lakhs to ₹2 Crores depending on your business turnover, profitability, and credit history.'
    },
    {
      question: 'What documents are required for business loans?',
      answer: 'Business registration documents, financial statements (last 2 years), bank statements, GST returns, and KYC documents of promoters.'
    },
    {
      question: 'How is the interest rate determined?',
      answer: 'Interest rates depend on business vintage, turnover, profitability, credit score, and loan amount. Rates typically range from 12% to 24% p.a.'
    },
    {
      question: 'What is the processing time?',
      answer: 'Business loan processing takes 3-7 working days depending on document completeness and verification requirements.'
    },
    {
      question: 'Is collateral required?',
      answer: 'Most business loans are unsecured, but for higher amounts or specific cases, collateral may be required based on risk assessment.'
    },
    {
      question: 'Can I use the loan for any business purpose?',
      answer: 'Yes, you can use the funds for working capital, expansion, equipment purchase, inventory, or any legitimate business purpose.'
    }
  ],
  education: [
    {
      question: 'What is an education loan?',
      answer: 'An education loan is designed to help students finance their higher education expenses including tuition fees, accommodation, books, and other related costs.'
    },
    {
      question: 'Who can apply for an education loan?',
      answer: 'Students pursuing higher education in India or abroad, along with their parents/guardians as co-applicants, can apply for education loans.'
    },
    {
      question: 'What courses are covered?',
      answer: 'We cover undergraduate, postgraduate, professional courses, and skill development programs from recognized institutions in India and abroad.'
    },
    {
      question: 'What is the loan amount limit?',
      answer: 'Education loans range from ₹2 Lakhs to ₹50 Lakhs for domestic courses and up to ₹1 Crore for international studies.'
    },
    {
      question: 'When do I need to start repaying?',
      answer: 'Repayment typically starts 6-12 months after course completion or 6 months after getting employment, whichever is earlier.'
    },
    {
      question: 'What documents are required?',
      answer: 'Admission letter, fee structure, academic records, income proof of co-applicant, and KYC documents are required.'
    },
    {
      question: 'Is there a moratorium period?',
      answer: 'Yes, there is a moratorium period during the course duration where you only pay interest. Principal repayment starts after course completion.'
    },
    {
      question: 'What is the interest rate?',
      answer: 'Education loan interest rates start from 8.5% p.a. and vary based on the course, institution, and loan amount.'
    }
  ],
  wedding: [
    {
      question: 'What is a wedding loan?',
      answer: 'A wedding loan is a personal loan specifically designed to help you finance your wedding expenses including venue, catering, decoration, and other wedding-related costs.'
    },
    {
      question: 'How much can I borrow for my wedding?',
      answer: 'You can borrow from ₹1 Lakh to ₹25 Lakhs depending on your income, credit score, and repayment capacity.'
    },
    {
      question: 'What expenses can be covered?',
      answer: 'Wedding loans can cover venue booking, catering, decoration, photography, jewelry, clothing, travel, and any other wedding-related expenses.'
    },
    {
      question: 'What is the repayment period?',
      answer: 'Repayment tenure ranges from 12 months to 60 months, allowing you to choose EMI amounts that fit your budget.'
    },
    {
      question: 'Do I need collateral?',
      answer: 'No, wedding loans are unsecured personal loans. No collateral or security is required.'
    },
    {
      question: 'How quickly can I get the loan?',
      answer: 'Wedding loans are processed quickly with approval within 24-48 hours and disbursement within 2-3 working days.'
    },
    {
      question: 'What documents are needed?',
      answer: 'PAN Card, Aadhaar Card, income proof, bank statements, and address proof are the basic documents required.'
    },
    {
      question: 'Can both partners apply together?',
      answer: 'Yes, both partners can apply as co-applicants, which may help in getting a higher loan amount and better terms.'
    }
  ],
  travel: [
    {
      question: 'What is a travel loan?',
      answer: 'A travel loan is a personal loan designed to help you finance your travel expenses including air tickets, accommodation, visa fees, and other travel-related costs.'
    },
    {
      question: 'How much can I borrow for travel?',
      answer: 'Travel loans range from ₹50,000 to ₹10 Lakhs depending on your income, credit score, and travel destination.'
    },
    {
      question: 'What travel expenses are covered?',
      answer: 'Air tickets, hotel bookings, visa fees, travel insurance, local transportation, and other travel-related expenses are covered.'
    },
    {
      question: 'Do I need to show travel plans?',
      answer: 'While not mandatory, showing your travel itinerary and bookings can help in faster processing and approval.'
    },
    {
      question: 'What is the interest rate?',
      answer: 'Travel loan interest rates start from 10.99% p.a. and vary based on your credit score and loan amount.'
    },
    {
      question: 'How long is the repayment period?',
      answer: 'Repayment tenure ranges from 12 months to 48 months, allowing flexible EMI options.'
    },
    {
      question: 'Can I apply for international travel?',
      answer: 'Yes, travel loans are available for both domestic and international travel, including business trips and vacations.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Travel insurance is not included in the loan but can be purchased separately. We can guide you on insurance options.'
    }
  ],
  medical: [
    {
      question: 'What is a medical loan?',
      answer: 'A medical loan is a personal loan designed to help you finance medical expenses including surgery, treatment, hospitalization, and other healthcare costs.'
    },
    {
      question: 'How much can I borrow for medical expenses?',
      answer: 'Medical loans range from ₹1 Lakh to ₹20 Lakhs depending on the treatment type, hospital, and your repayment capacity.'
    },
    {
      question: 'What medical expenses are covered?',
      answer: 'Surgery costs, hospitalization, diagnostic tests, medicines, rehabilitation, and other medical treatments are covered.'
    },
    {
      question: 'Do I need to show medical bills?',
      answer: 'While not always required, showing medical estimates or bills can help in faster processing and approval.'
    },
    {
      question: 'What is the interest rate for medical loans?',
      answer: 'Medical loan interest rates start from 10.99% p.a. and may be lower for certain critical treatments.'
    },
    {
      question: 'How quickly can I get the loan?',
      answer: 'Medical loans are processed on priority with approval within 2-4 hours and disbursement within 24 hours for emergency cases.'
    },
    {
      question: 'Can I apply for family members?',
      answer: 'Yes, you can apply for medical loans for yourself, family members, or dependents who need medical treatment.'
    },
    {
      question: 'Is there any special documentation?',
      answer: 'Basic documents are required. For planned procedures, medical estimates from the hospital can be helpful.'
    }
  ]
};

export default function LoanFAQ({ loanType, className = '' }: LoanFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = loanFAQs[loanType] || loanFAQs.personal;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getLoanTypeTitle = (type: string) => {
    const titles: Record<string, string> = {
      personal: 'Personal Loan',
      business: 'Business Loan',
      education: 'Education Loan',
      wedding: 'Wedding Loan',
      travel: 'Travel Loan',
      medical: 'Medical Loan'
    };
    return titles[type] || 'Loan';
  };

  return (
    <section className={`py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`} id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about {getLoanTypeTitle(loanType)}s
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 sm:px-8 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <motion.div
                  className="px-6 pb-4 sm:px-8 sm:pb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800-123-4567"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Call Us: 1800-123-4567
            </a>
            <a
              href="mailto:support@samridhya.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
            >
              Email Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 