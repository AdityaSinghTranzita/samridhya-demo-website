'use client';

import Navbar from "@/components/Navbar"; // Assuming this component exists
import { motion } from "framer-motion";
import { Calculator, Shield, Clock, DollarSign, Target, BarChart3, TrendingUp, HandCoins, Scale, PlusCircle, Trash2, ArrowRight } from "lucide-react";
import Head from "next/head";
import React from "react";
import CTA from "@/components/CTA";

// --- CONSTANTS ---
const DEFAULT_GOLD_PRICE_PER_GRAM = 6200; // INR
const MAX_LTV_PERCENT = 75; // RBI Max LTV
const APPLY_LOAN_URL = "https://apply.samridhya.com/gold-loan";




const formatRupee = (amount) => {
    if (isNaN(amount) || amount === 0) return '₹0';
    const num = Math.round(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return `₹${num}`;
};

// Generates a unique ID for jewelry items
let nextItemId = 1;
const generateItemId = () => nextItemId++;

// --- TYPES ---
const initialJewelryItem = {
    id: generateItemId(),
    weight: 10, // grams
    purity: 22, // carats
};

// --- COMPONENTS ---

// Component for a single feature card (Updated for Golden theme)
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 text-left transition-all duration-300 hover:shadow-2xl hover:border-yellow-500 hover:-translate-y-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay }}
    >
        <Icon className="w-8 h-8 text-yellow-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
);

// New Component for managing individual jewelry items (Updated for Golden theme)
const JewelryInput = ({ item, onChange, onRemove }) => (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
        <div className="flex-1 space-y-2">
            <label className="block text-xs font-medium uppercase text-gray-500">Weight (grams)</label>
            <input
                type="number"
                value={item.weight}
                onChange={(e) => onChange(item.id, 'weight', Number(e.target.value))}
                className="w-full border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                min="0.1"
                step="0.1"
            />
        </div>
        <div className="flex-1 space-y-2">
            <label className="block text-xs font-medium uppercase text-gray-500">Purity (Carats)</label>
            <input
                type="number"
                value={item.purity}
                onChange={(e) => onChange(item.id, 'purity', Number(e.target.value))}
                className="w-full border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                min="8" max="24"
            />
        </div>
        <div className="flex items-end pt-4 sm:pt-0">
            <button
                onClick={() => onRemove(item.id)}
                className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition duration-150 border border-red-200"
                aria-label="Remove item"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
export default function GoldLoanCalculatorPage() {
    // --- State: Loan Parameters ---
    const [goldRate, setGoldRate] = React.useState(DEFAULT_GOLD_PRICE_PER_GRAM); // INR per gram
    const [loanPercent, setLoanPercent] = React.useState(MAX_LTV_PERCENT); // LTV %
    const [tenure, setTenure] = React.useState(12); // months
    const [interestRate, setInterestRate] = React.useState(10.5); // annual %

    // --- State: Jewelry Inputs ---
    const [jewelryItems, setJewelryItems] = React.useState([initialJewelryItem]);

    // --- Handlers for Jewelry Items ---
    const handleAddItem = () => {
        setJewelryItems([...jewelryItems, { ...initialJewelryItem, id: generateItemId() }]);
    };

    const handleRemoveItem = (idToRemove) => {
        setJewelryItems(jewelryItems.filter(item => item.id !== idToRemove));
    };

    const handleItemChange = (id, field, value) => {
        setJewelryItems(jewelryItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // --- Calculations ---

    // 1. Total Effective Gold Weight for 24K
    const totalEffectiveWeight = jewelryItems.reduce((sum, item) => {
        // Only count if weight and purity are valid positive numbers
        if (item.weight > 0 && item.purity > 0) {
            return sum + (item.weight * (item.purity / 24));
        }
        return sum;
    }, 0);

    // 2. Gold Value (Purity Adjusted)
    const goldValue = totalEffectiveWeight * goldRate;

    // 3. Maximum Loan Amount based on LTV
    const loanAmount = (goldValue * loanPercent) / 100;

    // 4. EMI Calculation (Standard reducing balance EMI formula)
    const monthlyInterestRate = interestRate / 12 / 100;
    const isTenureValid = tenure > 0;

    let emi = 0;
    if (loanAmount > 0 && isTenureValid) {
        if (monthlyInterestRate > 0) {
            emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
                (Math.pow(1 + monthlyInterestRate, tenure) - 1);
        } else {
            // Simple division if interest is zero (unrealistic for a loan, but for completeness)
            emi = loanAmount / tenure;
        }
    }

    const finalEMI = isFinite(emi) ? emi : 0;
    const totalPayment = finalEMI * tenure;
    const totalInterest = totalPayment - loanAmount;

    // 5. Amortization Data (Simplified)
    const getAmortization = (P, R, N, months = 3) => {
        let principalRemaining = P;
        const schedule = [];

        for (let i = 1; i <= Math.min(N, months); i++) {
            // Interest is calculated on the remaining balance
            const interest = principalRemaining * R;
            // Principal paid is the rest of the EMI
            const principalPaid = finalEMI - interest;

            // Update remaining balance
            principalRemaining -= principalPaid;

            schedule.push({
                month: i,
                principal: principalPaid > 0 ? principalPaid : 0,
                interest: interest > 0 ? interest : 0,
                balance: principalRemaining > 0 ? principalRemaining : 0,
            });
        }
        return schedule;
    };

    const amortizationSchedule = getAmortization(loanAmount, monthlyInterestRate, tenure, 3);


    // --- Render Logic ---
    return (
        <>
            <Head>
                <title>Minimalist Gold Loan Calculator - Samridhya Finance</title>
                <meta name="description" content="Calculate your gold loan EMI, maximum loan eligibility, and total interest with our professional and easy-to-use calculator." />
            </Head>

            {/* Main Container - Updated Theme: Light Gold Background */}
            <div className="min-h-screen w-full bg-gradient-to-br from-white via-yellow-50 to-amber-50 font-sans text-gray-800">
                <Navbar />

                {/* Hero Section - Updated Theme: Deep Golden Gradient */}
                <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-600 via-amber-600 to-yellow-700 border-b border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-block text-sm font-semibold uppercase text-yellow-100 mb-2 border-b-2 border-yellow-300 pb-1">
                                Secure Gold Loan Calculator
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                                Estimate Your Loan Value
                            </h1>
                            <p className="text-lg text-yellow-100 max-w-3xl mx-auto">
                                Calculate the maximum loan amount, monthly EMI, and total interest based on your gold's value and purity.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Calculator Block - Professional Layout */}
                <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* LEFT COLUMN: Inputs & Jewelry Details */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Section 1: Jewelry Input */}
                            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3 border-gray-100">
                                    1. Gold Details & Valuation
                                </h2>

                                {/* Core Rate Input */}
                                <div className="space-y-2 mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Current Gold Rate (₹ per gram)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={goldRate}
                                            onChange={(e) => setGoldRate(Number(e.target.value))}
                                            className="w-full border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500"
                                            min="1"
                                            aria-label="Gold Rate per Gram"
                                        />
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">INR/gm</span>
                                    </div>
                                </div>

                                {/* Multi-Item Jewelry Inputs */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Individual Jewelry Items</h3>
                                    {jewelryItems.map((item) => (
                                        <JewelryInput
                                            key={item.id}
                                            item={item}
                                            onChange={handleItemChange}
                                            onRemove={handleRemoveItem}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleAddItem}
                                    className="flex items-center justify-center w-full py-3 text-yellow-700 border border-yellow-300 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                                >
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Add Another Item
                                </button>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 flex justify-between">
                                        <span className="text-gray-500">Total Effective 24K Weight:</span>
                                        <span className="font-bold text-gray-900">{totalEffectiveWeight.toFixed(2)} grams</span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 flex justify-between mt-1">
                                        <span className="text-gray-500">Calculated Gold Value:</span>
                                        <span className="font-bold text-yellow-700">{formatRupee(goldValue)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Loan Parameters */}
                            <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3 border-gray-100">
                                    2. Loan Terms
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {/* LTV/Loan Percent Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">LTV Ratio (%)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={loanPercent}
                                                onChange={(e) => setLoanPercent(Math.min(Number(e.target.value), MAX_LTV_PERCENT))}
                                                className="w-full border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500"
                                                min="1" max={MAX_LTV_PERCENT}
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium">Max {MAX_LTV_PERCENT}%</span>
                                        </div>
                                    </div>

                                    {/* Tenure Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Loan Tenure (months)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={tenure}
                                                onChange={(e) => setTenure(Number(e.target.value))}
                                                className="w-full border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500"
                                                min="1"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium">Months</span>
                                        </div>
                                    </div>

                                    {/* Interest Rate Input */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Interest Rate (%)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-yellow-500 focus:border-yellow-500"
                                                step="0.1"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium">p.a.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* RIGHT COLUMN: Results & CTA */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="sticky top-10 p-8 bg-yellow-50 rounded-xl shadow-xl border-t-4 border-yellow-500">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Loan Summary</h3>

                                <div className="space-y-4">
                                    {/* Max Loan Amount */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-600">
                                        <p className="text-sm font-semibold uppercase text-gray-500 mb-1">Maximum Loan Amount</p>
                                        <p className="text-2xl font-extrabold text-amber-800">{formatRupee(loanAmount)}</p>
                                    </div>

                                    {/* Estimated EMI */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-600">
                                        <p className="text-sm font-semibold uppercase text-gray-500 mb-1">Estimated Monthly EMI</p>
                                        <p className="text-2xl font-extrabold text-amber-800">{formatRupee(finalEMI)}</p>
                                    </div>

                                    {/* Total Interest */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-300">
                                        <p className="text-sm font-semibold uppercase text-gray-500 mb-1">Total Interest Payable</p>
                                        <p className="text-lg font-bold text-gray-700">{formatRupee(totalInterest)}</p>
                                    </div>

                                    {/* Total Payment */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-300">
                                        <p className="text-sm font-semibold uppercase text-gray-500 mb-1">Total Repayment Amount</p>
                                        <p className="text-lg font-bold text-gray-700">{formatRupee(totalPayment)}</p>
                                    </div>
                                </div>

                                {/* CTA Button - Static (Desktop Only) */}
                                <motion.a
                                    href={APPLY_LOAN_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // Hidden on mobile, shown on large screens
                                    className="mt-8 w-full hidden lg:flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 uppercase tracking-wider"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get Gold Loan
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </motion.a>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Amortization Table Section */}
                {loanAmount > 0 && finalEMI > 0 && (
                    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
                        <div className="max-w-6xl mx-auto">
                            <h4 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-yellow-300">
                                Sample Repayment Schedule
                            </h4>
                            <div className="overflow-x-auto rounded-lg shadow-lg">
                                <table className="min-w-full bg-white">
                                    <thead>
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                        <th className="py-3 px-6 text-left">Month</th>
                                        <th className="py-3 px-6 text-right">EMI</th>
                                        <th className="py-3 px-6 text-right">Principal</th>
                                        <th className="py-3 px-6 text-right">Interest</th>
                                        <th className="py-3 px-6 text-right">Outstanding Balance</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-700 text-sm">
                                    {amortizationSchedule.map((item) => (
                                        <tr key={item.month} className="border-b border-gray-100 hover:bg-yellow-50/50">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{item.month}</td>
                                            <td className="py-3 px-6 text-right">{formatRupee(finalEMI)}</td>
                                            <td className="py-3 px-6 text-right text-green-700 font-medium">{formatRupee(item.principal)}</td>
                                            <td className="py-3 px-6 text-right text-red-600">{formatRupee(item.interest)}</td>
                                            <td className="py-3 px-6 text-right font-semibold">{formatRupee(item.balance)}</td>
                                        </tr>
                                    ))}
                                    {tenure > 3 && (
                                        <tr className="text-center text-sm font-medium text-gray-400">
                                            <td colSpan={5} className="py-3">{`... ${tenure - 3} more months ...`}</td>
                                        </tr>
                                    )}
                                    {tenure > 0 && (
                                        <tr className="bg-gray-100/70 border-t-2 border-yellow-300 font-bold">
                                            <td className="py-3 px-6 text-left text-gray-800">Total ({tenure} Months)</td>
                                            <td className="py-3 px-6 text-right">{formatRupee(totalPayment)}</td>
                                            <td className="py-3 px-6 text-right text-green-800">{formatRupee(loanAmount)}</td>
                                            <td className="py-3 px-6 text-right text-red-700">{formatRupee(totalInterest)}</td>
                                            <td className="py-3 px-6 text-right">{formatRupee(0)}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}


                {/* Features Section - Updated for Golden theme */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                                Why Use Our Calculator?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Smart tools for secure, informed financial planning.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                icon={Scale}
                                title="Multi-Item Valuation"
                                description="Accurately calculate the combined value of multiple jewelry items, each with different weights and purities."
                                delay={0.1}
                            />
                            <FeatureCard
                                icon={TrendingUp}
                                title="LTV Ratio Analysis"
                                description="See your maximum eligibility instantly by applying the mandatory Loan-to-Value limit (up to 75%)."
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={HandCoins}
                                title="Repayment Flexibility"
                                description="Quickly model various scenarios by adjusting interest rates and loan tenures to find the perfect EMI."
                                delay={0.3}
                            />
                            <FeatureCard
                                icon={BarChart3}
                                title="Transparent Breakdown"
                                description="Get a clear amortization view showing how much principal and interest you pay each month."
                                delay={0.4}
                            />
                        </div>
                    </div>
                </section>

                {/* Floating CTA Section (Mobile Only) - Updated for Golden theme */}
                <motion.div
                    // Fixed to the bottom, across the whole width. Hidden on large screens.
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-2xl border-t border-yellow-100 lg:hidden"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                    <motion.a
                        href={APPLY_LOAN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 uppercase tracking-wider"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get Gold Loan Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.a>
                </motion.div>

                {/* Simple Footer/Bottom CTA */}
                <div className="bg-gray-800 text-white py-8 text-center mt-10">
                    <p className="text-sm">
                        Calculations are estimates. Final loan approval and terms are subject to formal verification and official policy.
                    </p>
                </div>
                <CTA />

            </div>
        </>
    );
}