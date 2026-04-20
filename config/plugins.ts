// config/plugins.ts

export default () => ({
  'tiptap-editor': {
    config: {
      theme: {
        colors: [
          // Primary colors
          { label: 'Primary Green', color: '#6bbd45' },
          { label: 'Primary Light', color: '#8cd66d' },
          { label: 'Primary Dark', color: '#4a8f2e' },
          
          // Secondary colors
          { label: 'Secondary Purple', color: '#9c27b0' },
          { label: 'Secondary Light', color: '#ba68c8' },
          { label: 'Secondary Dark', color: '#7b1fa2' },
          
          // Grayscale
          { label: 'White', color: '#ffffff' },
          { label: 'Black', color: '#000000' },
          { label: 'Gray 50', color: '#f9fafb' },
          { label: 'Gray 100', color: '#f3f4f6' },
          { label: 'Gray 200', color: '#e5e7eb' },
          { label: 'Gray 800', color: '#1f2937' },
          { label: 'Gray 900', color: '#111827' },
        ],
        css: `
          /* Editor content area styling matching Next.js blog styles */
          .tiptap {
            font-family: Calibri, sans-serif;
            color: #000000;
            line-height: 1.6;
            padding: 1rem;
          }

          /* Paragraph spacing */
          .tiptap p {
            margin-bottom: 1rem;
          }

          .tiptap p:last-child {
            margin-bottom: 0;
          }

          /* Headings */
          .tiptap h1 {
            font-size: 2.25rem;
            font-weight: 700;
            line-height: 2.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .tiptap h2 {
            font-size: 1.875rem;
            font-weight: 700;
            line-height: 2.25rem;
            margin-top: 1.75rem;
            margin-bottom: 0.875rem;
          }

          .tiptap h3 {
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 2rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          .tiptap h4 {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.75rem;
            margin-top: 1.25rem;
            margin-bottom: 0.625rem;
          }

          .tiptap h5 {
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }

          .tiptap h6 {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }

          .tiptap h1:first-child,
          .tiptap h2:first-child,
          .tiptap h3:first-child,
          .tiptap h4:first-child,
          .tiptap h5:first-child,
          .tiptap h6:first-child {
            margin-top: 0;
          }

          /* Blockquotes */
          .tiptap blockquote {
            border-left: 4px solid #6bbd45;
            padding: 1rem 1.5rem;
            margin: 1.5rem 0;
            background-color: rgba(107, 189, 69, 0.05);
            font-style: italic;
            color: rgba(0, 0, 0, 0.9);
          }

          .tiptap blockquote p {
            margin-bottom: 0.5rem;
          }

          .tiptap blockquote p:last-child {
            margin-bottom: 0;
          }

          /* Links */
          .tiptap a {
            color: #6bbd45;
            text-decoration: underline;
            transition: color 0.2s ease;
          }

          .tiptap a:hover {
            color: #4a8f2e;
          }

          /* Unordered lists */
          .tiptap ul {
            list-style-type: disc;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
            padding-left: 0.5rem;
          }

          .tiptap ul li {
            margin-bottom: 0.5rem;
            padding-left: 0.25rem;
          }

          .tiptap ul li p {
            margin-bottom: 0.25rem;
          }

          /* Ordered lists */
          .tiptap ol {
            list-style-type: decimal;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
            padding-left: 0.5rem;
          }

          .tiptap ol li {
            margin-bottom: 0.5rem;
            padding-left: 0.25rem;
          }

          .tiptap ol li p {
            margin-bottom: 0.25rem;
          }

          /* Nested lists */
          .tiptap ul ul,
          .tiptap ol ul {
            list-style-type: circle;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .tiptap ul ol,
          .tiptap ol ol {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }

          /* Code blocks */
          .tiptap pre {
            background-color: #f3f4f6;
            border-radius: 0.375rem;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
          }

          .tiptap code {
            font-family: 'Courier New', monospace;
            background-color: #f3f4f6;
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
          }

          .tiptap pre code {
            background-color: transparent;
            padding: 0;
          }

          /* Tables */
          .tiptap table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
          }

          .tiptap table th,
          .tiptap table td {
            border: 1px solid #e5e7eb;
            padding: 0.5rem 0.75rem;
            text-align: left;
          }

          .tiptap table th {
            background-color: #f9fafb;
            font-weight: 600;
          }

          /* Images */
          .tiptap img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
            margin: 1rem 0;
          }

          .tiptap img[data-align="center"] {
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .tiptap img[data-align="right"] {
            display: block;
            margin-left: auto;
            margin-right: 0;
          }

          /* Horizontal rule */
          .tiptap hr {
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 2rem 0;
          }

          /* Text alignment */
          .tiptap [style*="text-align: center"] {
            text-align: center;
          }

          .tiptap [style*="text-align: right"] {
            text-align: right;
          }

          .tiptap [style*="text-align: justify"] {
            text-align: justify;
          }
        `,
      },
      presets: {
        // A minimal preset for short-form content like titles or captions
        minimal: {
          bold: true,
          italic: true,
          underline: true,
        },

        // A standard preset for blog posts and articles
        standard: {
          bold: true,
          italic: true,
          underline: true,
          strike: true,
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          bulletList: true,
          orderedList: true,
          blockquote: true,
          link: {
            HTMLAttributes: {
              rel: 'noopener noreferrer',
              target: '_blank',
            },
          },
          textColor: true,
          highlightColor: true,
        },

        // A full preset with every feature enabled
        full: {
          bold: true,
          italic: true,
          underline: true,
          strike: true,
          code: true,
          codeBlock: true,
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          blockquote: true,
          bulletList: true,
          orderedList: true,
          link: {
            HTMLAttributes: {
              rel: 'noopener noreferrer',
              target: '_blank',
            },
          },
          table: true,
          textAlign: true,
          superscript: true,
          subscript: true,
          textColor: true,
          highlightColor: true,
          mediaLibrary: {
            resize: {
              enabled: true,
              alwaysPreserveAspectRatio: true,
              minWidth: 50,
              minHeight: 50,
            },
          },
        },
      },
    },
  },
});