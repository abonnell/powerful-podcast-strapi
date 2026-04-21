/**
 * Blog content type lifecycles
 * Automatically triggers Next.js revalidation when blogs are published, updated, unpublished, or deleted
 */

export default {
  /**
   * Triggered after a blog is created and published
   */
  async afterCreate(event) {
    const { result } = event;
    
    // Only trigger revalidation if the blog is published
    if (result.publishedAt) {
      await triggerRevalidation(result);
    }
  },

  /**
   * Triggered after a blog is updated
   * This includes both regular updates and unpublish actions
   */
  async afterUpdate(event) {
    const { result } = event;
    
    // Trigger revalidation for both published and unpublished blogs
    // When unpublished, we need to clear the cache
    await triggerRevalidation(result);
  },

  /**
   * Triggered after a blog is deleted
   */
  async afterDelete(event) {
    const { result } = event;
    
    // Trigger revalidation to clear the deleted blog from cache
    if (result) {
      await triggerRevalidation(result);
    }
  },
};

/**
 * Sends a revalidation request to the Next.js frontend
 */
async function triggerRevalidation(blog: any) {
  const nextjsUrl = process.env.NEXTJS_URL;
  const revalidationSecret = process.env.NEXTJS_REVALIDATION_SECRET;

  // Skip if environment variables are not configured
  if (!nextjsUrl || !revalidationSecret) {
    console.warn(
      '⚠️  Next.js revalidation skipped: NEXTJS_URL or NEXTJS_REVALIDATION_SECRET not configured'
    );
    return;
  }

  const revalidationEndpoint = `${nextjsUrl}/api/revalidate`;
  
  try {
    const response = await fetch(revalidationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: revalidationSecret,
        type: 'blog',
        title: blog.Title,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✓ Next.js revalidation triggered for blog: "${blog.Title}"`, data);
  } catch (error) {
    console.error(`✗ Failed to trigger Next.js revalidation for blog: "${blog.Title}"`, error);
    // Don't throw the error - we don't want to block the blog publish/update operation
    // if revalidation fails. The admin can manually trigger it or check logs.
  }
}
