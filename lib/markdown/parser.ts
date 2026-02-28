import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { processMermaidBlocks } from './mermaid';

export async function parseMarkdown(markdown: string): Promise<string> {
    // Pre-process Mermaid blocks
    const processedMarkdown = processMermaidBlocks(markdown);

    // Parse Markdown to HTML
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(processedMarkdown);

    let html = result.toString();

    // Convert LaTeX delimiters to MathJax format
    // Inline: $...$ -> \(...\)
    html = html.replace(/\$([^\$]+?)\$/g, '\\($1\\)');

    // Display: $$...$$ -> \[...\]
    html = html.replace(/\$\$([^\$]+?)\$\$/g, '\\[$1\\]');

    return html;
}