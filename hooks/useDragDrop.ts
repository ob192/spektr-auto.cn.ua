import { useCallback } from 'react';
import { handleMediaDrop, handleMediaPaste } from '@/lib/markdown/media';

export function useDragDrop(setMarkdown: (fn: (prev: string) => string) => void) {
    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);

            files.forEach((file) => {
                const markdown = handleMediaDrop(file);
                if (markdown) {
                    setMarkdown((prev) => prev + '\n\n' + markdown);
                }
            });
        },
        [setMarkdown]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent) => {
            const items = Array.from(e.clipboardData.items);

            items.forEach((item) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file) {
                        const markdown = handleMediaDrop(file);
                        if (markdown) {
                            setMarkdown((prev) => prev + '\n\n' + markdown);
                        }
                    }
                }
            });
        },
        [setMarkdown]
    );

    return { handleDrop, handlePaste };
}