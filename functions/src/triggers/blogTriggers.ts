import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { clearSitemapCache } from '../routes/sitemapRoutes';

// Trigger to clear sitemap cache when blog posts change
export const onBlogPostChange = onDocumentWritten('blog-posts/{docId}', async (event) => {
  try {
    const { before, after } = event.data!;
    
    if (!before && after) {
      // Document created
      console.log('📝 Blog post created - clearing sitemap cache', { 
        docId: event.params.docId,
        title: after.data()?.title 
      });
    } else if (before && after) {
      // Document updated
      console.log('📝 Blog post updated - clearing sitemap cache', { 
        docId: event.params.docId,
        title: after.data()?.title 
      });
    } else if (before && !after) {
      // Document deleted
      console.log('📝 Blog post deleted - clearing sitemap cache', { 
        docId: event.params.docId 
      });
    }
    
    // Clear sitemap cache to force regeneration
    clearSitemapCache();
    
  } catch (error) {
    console.error('❌ Error in blog post change trigger:', error);
  }
});
