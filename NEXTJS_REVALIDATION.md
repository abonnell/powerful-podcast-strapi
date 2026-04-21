# Next.js Revalidation Integration

This Strapi instance is configured to automatically trigger on-demand revalidation in the Next.js frontend when blog posts are published or updated.

## How It Works

The blog content type includes lifecycle hooks that automatically send revalidation requests to your Next.js application whenever:
- A new blog post is published
- An existing blog post is updated

This ensures your Next.js site immediately reflects the latest content without requiring a full rebuild.

## Configuration

### Required Environment Variables

Add these variables to your `.env` file:

```env
# Next.js Revalidation
NEXTJS_URL=http://localhost:3000
NEXTJS_REVALIDATION_SECRET=your-secret-token-here
```

#### `NEXTJS_URL`
The base URL of your Next.js application.
- **Development**: `http://localhost:3000`
- **Production**: `https://your-nextjs-domain.com`

#### `NEXTJS_REVALIDATION_SECRET`
A secret token that matches the `REVALIDATION_SECRET` in your Next.js application's environment variables.

**Important**: Use the same secret value in both applications. Generate a secure random token:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Environment-Specific Setup

#### Local Development
```env
NEXTJS_URL=http://localhost:3000
NEXTJS_REVALIDATION_SECRET=dev-secret-change-in-production
```

#### Production
```env
NEXTJS_URL=https://your-production-domain.com
NEXTJS_REVALIDATION_SECRET=<your-generated-secret-token>
```

Make sure both the Strapi and Next.js applications use the same `REVALIDATION_SECRET` value.

## Implementation Details

The revalidation logic is implemented in:
```
strapi/src/api/blog/content-types/blog/lifecycles.ts
```

### Lifecycle Hooks
- **`afterCreate`**: Triggers revalidation when a new blog is created and published
- **`afterUpdate`**: Triggers revalidation when an existing blog is updated (if published)

### What Gets Revalidated
When a blog is published/updated, the following Next.js paths are revalidated:
- `/blog` - Main blog listing page
- `/blog/[slug]` - Individual blog post page
- `/gallery/blogs` - Blog gallery page

## Testing

### 1. Start Both Applications
```bash
# Terminal 1 - Strapi
cd strapi
npm run develop

# Terminal 2 - Next.js
cd next-app
npm run dev
```

### 2. Verify Environment Variables
Check that both applications have the correct environment variables set:
- Strapi: `NEXTJS_URL` and `NEXTJS_REVALIDATION_SECRET`
- Next.js: `REVALIDATION_SECRET`

### 3. Test the Integration
1. Log into Strapi admin panel
2. Create or update a blog post
3. Publish the blog post
4. Check the Strapi console logs for:
   ```
   ✓ Next.js revalidation triggered for blog: "Your Blog Title"
   ```
5. Visit your Next.js site to verify the content appears immediately

### Troubleshooting

#### Revalidation Skipped Warning
```
⚠️  Next.js revalidation skipped: NEXTJS_URL or NEXTJS_REVALIDATION_SECRET not configured
```
**Solution**: Add the required environment variables to your `.env` file and restart Strapi.

#### Revalidation Failed Error
```
✗ Failed to trigger Next.js revalidation for blog: "Blog Title"
```
**Common causes**:
- Next.js application is not running
- `NEXTJS_URL` is incorrect
- `NEXTJS_REVALIDATION_SECRET` doesn't match between apps
- Network connectivity issues

**Solution**: 
1. Verify Next.js is running and accessible at the configured URL
2. Check that secrets match in both applications
3. Review Next.js application logs for specific error details

#### Invalid Secret Token (401)
**Solution**: Ensure `NEXTJS_REVALIDATION_SECRET` in Strapi matches `REVALIDATION_SECRET` in Next.js exactly.

## Benefits Over Manual Webhooks

This automated approach offers several advantages over manual webhook configuration:

✅ **Version Controlled**: Lifecycle hooks are part of your codebase
✅ **Environment Agnostic**: Automatically works across all environments once configured
✅ **No Manual Setup**: No need to configure webhooks through the admin UI
✅ **Consistent**: Same behavior across all deployments
✅ **Type Safe**: Written in TypeScript with proper error handling

## Disabling Revalidation

To temporarily disable automatic revalidation without removing the code:
1. Remove or comment out the `NEXTJS_URL` or `NEXTJS_REVALIDATION_SECRET` environment variables
2. Restart Strapi

The lifecycle hooks will detect the missing configuration and skip revalidation gracefully.
