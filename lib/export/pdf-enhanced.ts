interface PDFExportOptions {
    filename?: string;
    imageQuality?: number;
    scale?: number;
}

export async function exportToPDF(
    element: HTMLElement,
    options: PDFExportOptions = {}
) {
    if (typeof window === 'undefined') {
        throw new Error('PDF export only works in browser');
    }

    const {
        filename = `research-paper-${new Date().toISOString().slice(0, 10)}.pdf`,
        imageQuality = 0.95,
        scale = 2
    } = options;

    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    try {
        // Show loading
        const loading = document.createElement('div');
        loading.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.9); color: white; padding: 24px 48px;
      border-radius: 12px; z-index: 10000; font-family: system-ui;
      font-size: 16px; font-weight: 500; text-align: center;
    `;
        loading.innerHTML = 'Generating PDF...<br><small style="opacity:0.7">Processing sections</small>';
        document.body.appendChild(loading);

        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const margin = 20;
        const contentWidth = pdfWidth - (margin * 2);

        // Split content into sections by H1, H2, H3
        const sections = splitIntoSections(element);

        let isFirstPage = true;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];

            // Update loading message
            loading.innerHTML = `Generating PDF...<br><small style="opacity:0.7">Section ${i + 1}/${sections.length}</small>`;

            // Add new page for H1, H2, H3 (except first section)
            if (!isFirstPage && section.shouldBreak) {
                pdf.addPage();
            }

            // Create temporary container for this section
            const tempContainer = document.createElement('div');
            tempContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: ${contentWidth}mm;
        padding: ${margin}mm;
        background: white;
        font-family: ${window.getComputedStyle(element).fontFamily};
      `;
            tempContainer.innerHTML = section.html;
            document.body.appendChild(tempContainer);

            // Render section to canvas
            const canvas = await html2canvas(tempContainer, {
                scale: scale,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            document.body.removeChild(tempContainer);

            // Calculate dimensions
            const imgWidth = contentWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add image to PDF
            const imgData = canvas.toDataURL('image/jpeg', imageQuality);

            if (isFirstPage) {
                // First page
                pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
                isFirstPage = false;
            } else {
                // Subsequent pages
                pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
            }

            // If section is too tall, add continuation pages
            let remainingHeight = imgHeight - (pdfHeight - margin * 2);
            let yOffset = -(pdfHeight - margin * 2);

            while (remainingHeight > 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', margin, yOffset, imgWidth, imgHeight);
                remainingHeight -= (pdfHeight - margin * 2);
                yOffset -= (pdfHeight - margin * 2);
            }
        }

        // Clean up
        document.body.removeChild(loading);

        // Save
        pdf.save(filename);
        return true;

    } catch (error) {
        console.error('PDF export failed:', error);
        const loadingEl = document.querySelector('[style*="z-index: 10000"]');
        if (loadingEl) document.body.removeChild(loadingEl);
        throw error;
    }
}

/**
 * Split content into sections based on H1, H2, H3 headings
 */
function splitIntoSections(element: HTMLElement): Array<{ html: string; shouldBreak: boolean }> {
    const sections: Array<{ html: string; shouldBreak: boolean }> = [];
    const children = Array.from(element.children);

    let currentSection: HTMLElement[] = [];
    let shouldBreak = false;

    for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const tagName = child.tagName.toLowerCase();

        // Check if this is a page-breaking heading
        const isBreakingHeading = tagName === 'h1' || tagName === 'h2' || tagName === 'h3';

        if (isBreakingHeading && currentSection.length > 0) {
            // Save current section
            const div = document.createElement('div');
            currentSection.forEach(el => div.appendChild(el.cloneNode(true)));
            sections.push({
                html: div.innerHTML,
                shouldBreak: shouldBreak
            });

            // Start new section
            currentSection = [child];
            shouldBreak = true; // Next section should start on new page
        } else {
            currentSection.push(child);
            if (i === 0 && isBreakingHeading) {
                shouldBreak = false; // First heading doesn't break
            }
        }
    }

    // Add final section
    if (currentSection.length > 0) {
        const div = document.createElement('div');
        currentSection.forEach(el => div.appendChild(el.cloneNode(true)));
        sections.push({
            html: div.innerHTML,
            shouldBreak: shouldBreak
        });
    }

    return sections;
}