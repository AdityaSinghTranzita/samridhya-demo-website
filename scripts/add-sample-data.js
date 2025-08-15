const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp, connectFirestoreEmulator } = require('firebase/firestore');

// Firebase configuration for local emulator
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "samridhya-website.firebaseapp.com",
  projectId: "samridhya-website",
  storageBucket: "samridhya-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase with emulator
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to Firestore emulator
connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Sample blog posts data
const samplePosts = [
  {
    title: "Understanding Personal Loans: A Complete Guide",
    slug: "understanding-personal-loans-complete-guide",
    excerpt: "Learn everything you need to know about personal loans, from application to repayment.",
    content: "Personal loans are a popular financial tool that can help you achieve various goals. Whether you need to consolidate debt, make home improvements, or cover unexpected expenses, personal loans offer flexibility and competitive interest rates.\n\nIn this comprehensive guide, we'll cover:\n- What personal loans are and how they work\n- Different types of personal loans\n- How to qualify for a personal loan\n- The application process\n- Tips for getting the best rates\n- Repayment strategies\n\nPersonal loans can be a great financial tool when used responsibly. Always compare offers from multiple lenders and understand the terms before signing any agreement.",
    author: "Samridhya Team",
    status: "published",
    featuredImage: "/images/blog/personal-loan-basic.jpg",
    tags: ["personal loan", "finance", "borrowing", "credit"],
    category: "Personal Loan",
    subcategory: "Loan Basics",
    readTime: "5 min read",
    featured: true,
    seoTitle: "Complete Guide to Personal Loans - Everything You Need to Know",
    seoDescription: "Learn everything about personal loans including types, application process, and tips for getting the best rates.",
    seoKeywords: ["personal loan", "loan guide", "borrowing", "finance"],
    meta: {
      views: 1250,
      likes: 89,
      shares: 23
    },
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15")
  },
  {
    title: "Business Loan vs Personal Loan: Which is Right for You?",
    slug: "business-loan-vs-personal-loan-which-right-for-you",
    excerpt: "Compare business loans and personal loans to determine which financing option best suits your needs.",
    content: "When you need financing, choosing between a business loan and a personal loan can be confusing. Both options have their advantages and disadvantages, and the right choice depends on your specific situation.\n\nBusiness loans are designed specifically for business purposes and typically offer:\n- Higher loan amounts\n- Longer repayment terms\n- Lower interest rates for established businesses\n- Business-specific benefits\n\nPersonal loans, on the other hand, are more flexible and can be used for:\n- Any personal expense\n- Debt consolidation\n- Home improvements\n- Emergency expenses\n\nConsider factors like loan purpose, amount needed, credit history, and business stage when making your decision.",
    author: "Samridhya Team",
    status: "published",
    featuredImage: "/images/blog/business-loan.jpg",
    tags: ["business loan", "personal loan", "comparison", "financing"],
    category: "Business Loan",
    subcategory: "Loan Comparison",
    readTime: "4 min read",
    featured: true,
    seoTitle: "Business Loan vs Personal Loan Comparison - Choose the Right Option",
    seoDescription: "Compare business loans and personal loans to find the best financing option for your needs.",
    seoKeywords: ["business loan", "personal loan", "loan comparison", "financing"],
    meta: {
      views: 980,
      likes: 67,
      shares: 18
    },
    publishedAt: new Date("2024-01-20"),
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-20")
  },
  {
    title: "How to Improve Your Credit Score: 10 Proven Strategies",
    slug: "how-to-improve-credit-score-10-proven-strategies",
    excerpt: "Discover proven strategies to boost your credit score and improve your financial health.",
    content: "Your credit score is one of the most important numbers in your financial life. It affects your ability to get loans, credit cards, and even rent an apartment. Here are 10 proven strategies to improve your credit score:\n\n1. Pay your bills on time\n2. Keep your credit utilization low\n3. Don't close old credit accounts\n4. Limit new credit applications\n5. Check your credit report regularly\n6. Dispute any errors\n7. Consider a secured credit card\n8. Pay off debt strategically\n9. Become an authorized user\n10. Be patient and consistent\n\nImproving your credit score takes time and discipline, but the benefits are worth it. A higher credit score can save you thousands of dollars in interest over your lifetime.",
    author: "Samridhya Team",
    status: "published",
    featuredImage: "/images/blog/credit-score-basic.jpg",
    tags: ["credit score", "credit improvement", "financial health", "credit report"],
    category: "Credit Score",
    subcategory: "Credit Improvement",
    readTime: "6 min read",
    featured: false,
    seoTitle: "10 Proven Strategies to Improve Your Credit Score",
    seoDescription: "Learn 10 proven strategies to boost your credit score and improve your financial health.",
    seoKeywords: ["credit score", "credit improvement", "financial health"],
    meta: {
      views: 2100,
      likes: 145,
      shares: 67
    },
    publishedAt: new Date("2024-01-25"),
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-25")
  },
  {
    title: "EMI Calculator: How to Calculate Your Monthly Payments",
    slug: "emi-calculator-how-to-calculate-monthly-payments",
    excerpt: "Learn how to use an EMI calculator to determine your monthly loan payments and plan your budget.",
    content: "An EMI (Equated Monthly Installment) calculator is an essential tool for anyone considering a loan. It helps you understand exactly how much you'll need to pay each month and plan your budget accordingly.\n\nThe EMI formula is:\nEMI = P × r × (1 + r)^n / ((1 + r)^n - 1)\n\nWhere:\n- P = Principal amount\n- r = Monthly interest rate (annual rate ÷ 12)\n- n = Total number of months\n\nFactors that affect your EMI:\n- Loan amount\n- Interest rate\n- Loan term\n- Processing fees\n- Prepayment charges\n\nUsing an EMI calculator helps you:\n- Compare different loan offers\n- Plan your monthly budget\n- Understand the total cost of borrowing\n- Make informed financial decisions",
    author: "Samridhya Team",
    status: "published",
    featuredImage: "/images/blog/emi-calculator.jpg",
    tags: ["emi calculator", "loan calculator", "monthly payments", "budgeting"],
    category: "EMI Calculator",
    subcategory: "Calculator Guide",
    readTime: "3 min read",
    featured: false,
    seoTitle: "EMI Calculator Guide - Calculate Your Monthly Loan Payments",
    seoDescription: "Learn how to use an EMI calculator to determine your monthly loan payments and plan your budget effectively.",
    seoKeywords: ["emi calculator", "loan calculator", "monthly payments"],
    meta: {
      views: 850,
      likes: 42,
      shares: 12
    },
    publishedAt: new Date("2024-01-30"),
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-30")
  },
  {
    title: "Digital Gold Investment: A Beginner's Guide",
    slug: "digital-gold-investment-beginners-guide",
    excerpt: "Explore the world of digital gold investment and learn how to start investing in this modern asset.",
    content: "Digital gold is revolutionizing how people invest in gold. Unlike traditional gold investments that require physical storage, digital gold offers convenience, security, and accessibility.\n\nWhat is Digital Gold?\nDigital gold represents physical gold stored in secure vaults, but you can buy, sell, and hold it digitally. Each unit typically represents 1 gram of 24K gold.\n\nBenefits of Digital Gold:\n- No storage concerns\n- Easy to buy and sell\n- Lower transaction costs\n- High liquidity\n- Secure and insured\n- Fractional ownership\n\nHow to Get Started:\n1. Choose a digital gold platform\n2. Complete KYC verification\n3. Add funds to your account\n4. Start buying gold\n5. Monitor your investment\n\nDigital gold is an excellent way to diversify your investment portfolio and hedge against inflation.",
    author: "Samridhya Team",
    status: "published",
    featuredImage: "/images/blog/digital-gold.jpg",
    tags: ["digital gold", "investment", "gold", "portfolio"],
    category: "Digital Gold",
    subcategory: "Investment Guide",
    readTime: "4 min read",
    featured: false,
    seoTitle: "Digital Gold Investment Guide for Beginners",
    seoDescription: "Learn how to invest in digital gold and diversify your investment portfolio with this modern asset.",
    seoKeywords: ["digital gold", "investment", "gold investment"],
    meta: {
      views: 1200,
      likes: 78,
      shares: 34
    },
    publishedAt: new Date("2024-02-05"),
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date("2024-02-05")
  }
];

async function addSampleData() {
  try {
    console.log('🚀 Starting to add sample blog posts...');
    
    for (const post of samplePosts) {
      // Convert dates to Firestore timestamps
      const postData = {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'blog-posts'), postData);
      console.log(`✅ Added post: "${post.title}" with ID: ${docRef.id}`);
    }
    
    console.log('🎉 All sample blog posts added successfully!');
    console.log(`📊 Total posts added: ${samplePosts.length}`);
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Run the script
addSampleData(); 