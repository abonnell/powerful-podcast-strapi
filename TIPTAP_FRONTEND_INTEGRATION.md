# TipTap Frontend Integration Notes

## Overview
The Strapi TipTap editor has been configured with a theme matching the Next.js app's color scheme and styling from `globals.css`.

## Frontend Changes Required in Next.js App

### 1. Install TipTap Dependencies

You'll need to install the TipTap HTML renderer and extensions to properly render the content from Strapi:

```bash
cd /home/abonnell/repos/powerful-podcast/next-app
npm install @tiptap/html @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-color @tiptap/extension-highlight @tiptap/extension-underline @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header
```

### 2. Create TipTap HTML Renderer Utility

Create a file at `src/lib/tiptap-renderer.ts`:

```typescript
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

// Extend Image extension to support custom attributes used by Strapi plugin
const StrapiImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-align': { default: null },
      'data-asset-id': { default: null },
    };
  },
});

const extensions = [
  StarterKit,
  StrapiImage,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Underline,
  Subscript,
  Superscript,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
];

/**
 * Convert TipTap JSON content from Strapi to HTML
 */
export function renderTipTapContent(content: any): string {
  if (!content) return '';
  
  try {
    return generateHTML(content, extensions);
  } catch (error) {
    console.error('Error rendering TipTap content:', error);
    return '';
  }
}
```

### 3. Update Blog Content Component

When rendering blog content, use the TipTap renderer:

```tsx
import { renderTipTapContent } from '@/lib/tiptap-renderer';

export function BlogPost({ post }: { post: any }) {
  const htmlContent = renderTipTapContent(post.content);
  
  return (
    <div 
      className="blog-content" 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
```

### 4. CSS Updates Already in Place

The existing `.blog-content` styles in `globals.css` already match the Strapi editor theme and should work correctly. The key styles include:

- Heading sizes and spacing (h1-h6)
- Blockquote styling with primary green border
- Link colors using primary green
- List styling (ul/ol)
- Image alignment support with `data-align` attribute

### 5. Dark Mode Considerations

If you're using dark mode in your Next.js app, you may want to add additional dark mode styles to match the Strapi editor:

```css
/* Add to globals.css */
.dark .blog-content blockquote {
  background-color: rgba(107, 189, 69, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.dark .blog-content a:hover {
  color: #8cd66d; /* Primary light */
}

.dark .blog-content pre,
.dark .blog-content code {
  background-color: #1f2937; /* Gray 800 */
  color: #f9fafb; /* Gray 50 */
}

.dark .blog-content table th,
.dark .blog-content table td {
  border-color: #374151; /* Dark mode border */
}

.dark .blog-content table th {
  background-color: #1f2937; /* Gray 800 */
}
```

### 6. Image Handling

For images with alignment, the CSS for `img[data-align]` is already in your `globals.css`:

```css
img[data-align="center"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

img[data-align="right"] {
  display: block;
  margin-left: auto;
  margin-right: 0;
}
```

### 7. Color Palette

The TipTap editor in Strapi now includes these colors for text and highlight:

**Primary Colors:**
- Primary Green: `#6bbd45`
- Primary Light: `#8cd66d`
- Primary Dark: `#4a8f2e`

**Secondary Colors:**
- Secondary Purple: `#9c27b0`
- Secondary Light: `#ba68c8`
- Secondary Dark: `#7b1fa2`

**Grayscale:**
- White, Black, and Gray shades (50, 100, 200, 800, 900)

These will render as inline styles on text/highlights, so no additional CSS is needed.

### 8. Testing Checklist

After implementing these changes, test the following:

- [ ] Headings (h1-h6) render with correct sizes and spacing
- [ ] Bold, italic, underline, strikethrough formatting
- [ ] Links open correctly (with `target="_blank"` and `rel="noopener noreferrer"`)
- [ ] Blockquotes display with green border and background
- [ ] Ordered and unordered lists render correctly
- [ ] Images display with proper alignment (left, center, right)
- [ ] Tables render with borders and header styling
- [ ] Code blocks have syntax highlighting (if using)
- [ ] Text colors and highlights render correctly
- [ ] Dark mode styling works properly

## Strapi Plugin Configuration

The plugin is configured in `/config/plugins.ts` with three presets:

1. **minimal**: Basic formatting (bold, italic, underline)
2. **standard**: Blog content (headings, lists, blockquotes, links, colors)
3. **full**: All features including tables, code blocks, media library, and text alignment

Choose the appropriate preset when configuring content types in Strapi's Content-Type Builder.

## Additional Resources

- [TipTap Documentation](https://tiptap.dev/)
- [Strapi TipTap Plugin GitHub](https://github.com/notum-cz/strapi-plugin-tiptap-editor)
- [TipTap HTML Extension](https://tiptap.dev/docs/editor/api/utilities/html)
