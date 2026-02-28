const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];

export function handleMediaDrop(file: File): string | null {
    const url = URL.createObjectURL(file);
    const fileName = file.name;
    const isImage = IMAGE_TYPES.includes(file.type);

    if (isImage) {
        // Inline embed for images
        return `![${fileName}](${url})`;
    } else {
        // Link for all other files
        return `[${fileName}](${url})`;
    }
}

export function handleMediaPaste(file: File): string | null {
    return handleMediaDrop(file);
}