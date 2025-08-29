// Firebase Functions API URL
const API_BASE_URL = 'http://127.0.0.1:5001/samridhya-website/us-central1/api';

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
    }
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
    }
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
    }
  }
];

async function addSampleData() {
  try {
    console.log('🚀 Starting to add sample blog posts via API...');
    
    for (const post of samplePosts) {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createPost',
          data: post
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ Added post: "${post.title}" with ID: ${result.data.id}`);
      } else {
        console.log(`❌ Failed to add post: "${post.title}" - ${result.error}`);
      }
    }
    
    console.log('🎉 Sample data addition completed!');
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Run the script
addSampleData(); 