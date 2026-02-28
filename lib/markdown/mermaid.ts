import mermaid from 'mermaid';

// Initialize Mermaid with research paper theme
if (typeof window !== 'undefined') {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
    });
}

/**
 * Convert mermaid code blocks to div placeholders for rendering
 */
export function processMermaidBlocks(markdown: string): string {
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
    let counter = 0;

    return markdown.replace(mermaidRegex, (_, code) => {
        const id = `mermaid-${counter++}`;
        return `<div class="mermaid-container" data-mermaid-id="${id}" data-mermaid-code="${encodeURIComponent(code.trim())}"></div>`;
    });
}

/**
 * Render all Mermaid diagrams in a container with real-time updates
 */
export async function renderMermaid(container: HTMLElement) {
    const mermaidContainers = container.querySelectorAll('.mermaid-container:not(.mermaid-rendered)');

    for (const element of Array.from(mermaidContainers)) {
        const id = element.getAttribute('data-mermaid-id');
        const code = decodeURIComponent(element.getAttribute('data-mermaid-code') || '');

        if (!id || !code) continue;

        try {
            const { svg } = await mermaid.render(`mermaid-svg-${id}`, code);
            element.innerHTML = svg;
            element.classList.add('mermaid-rendered');
        } catch (error) {
            console.error('Mermaid render error:', error);
            element.innerHTML = `<pre class="text-red-600 text-sm p-4 bg-red-50 rounded">Mermaid Syntax Error: ${error}</pre>`;
        }
    }
}