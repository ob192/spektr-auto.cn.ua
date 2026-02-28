export async function exportToPDF(element: HTMLElement) {
    if (typeof window === 'undefined') {
        throw new Error('PDF export only works in browser');
    }

    // Dynamic imports to avoid SSR issues
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    try {
        // Clone the element to avoid modifying the original
        const clonedElement = element.cloneNode(true) as HTMLElement;

        // Create a temporary container
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '210mm'; // A4 width
        container.style.padding = '20mm';
        container.style.backgroundColor = '#ffffff';
        container.appendChild(clonedElement);
        document.body.appendChild(container);

        // Capture element as canvas
        const canvas = await html2canvas(clonedElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 794, // A4 width in pixels at 96 DPI
            onclone: (clonedDoc) => {
                // Ensure styles are applied to cloned document
                const clonedContainer = clonedDoc.querySelector('div') as HTMLElement;
                if (clonedContainer) {
                    clonedContainer.style.width = '794px';
                }
            }
        });

        // Remove temporary container
        document.body.removeChild(container);

        // Calculate PDF dimensions (A4 in mm)
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save PDF
        const fileName = `markdown-export-${new Date().toISOString().slice(0, 10)}.pdf`;
        pdf.save(fileName);

    } catch (error) {
        console.error('PDF export failed:', error);
        throw error;
    }
}