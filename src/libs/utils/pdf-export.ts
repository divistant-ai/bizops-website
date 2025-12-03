/**
 * PDF Export Utilities
 * For exporting calculator results to PDF
 */

export type PDFExportData = {
  title: string;
  subtitle?: string;
  date: string;
  company?: string;
  sections: Array<{
    title: string;
    content: Array<{
      label: string;
      value: string | number;
      highlight?: boolean;
    }>;
  }>;
  footer?: string;
};

/**
 * Generate HTML for PDF export
 * Can be used with browser print or html2pdf library
 */
export function generatePDFHTML(data: PDFExportData): string {
  const sectionsHTML = data.sections
    .map(
      section => `
    <div class="section">
      <h2>${section.title}</h2>
      <table>
        ${section.content
          .map(
            item => `
          <tr class="${item.highlight ? 'highlight' : ''}">
            <td class="label">${item.label}</td>
            <td class="value">${item.value}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
    </div>
  `,
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      color: #1e293b;
      background: white;
    }
    
    .header {
      border-bottom: 3px solid #0ea5e9;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 28px;
      color: #0f172a;
      margin-bottom: 8px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #64748b;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 12px;
      color: #64748b;
    }
    
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    h2 {
      font-size: 18px;
      color: #0f172a;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    tr {
      border-bottom: 1px solid #e2e8f0;
    }
    
    tr.highlight {
      background-color: #f0f9ff;
      font-weight: 600;
    }
    
    td {
      padding: 12px 16px;
      font-size: 14px;
    }
    
    td.label {
      color: #475569;
      width: 60%;
    }
    
    td.value {
      color: #0f172a;
      font-weight: 500;
      text-align: right;
      width: 40%;
    }
    
    tr.highlight td.value {
      color: #0284c7;
      font-size: 16px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    
    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.title}</h1>
    ${data.subtitle ? `<div class="subtitle">${data.subtitle}</div>` : ''}
    <div class="meta">
      <span>${data.company || 'BizOps Platform'}</span>
      <span>${data.date}</span>
    </div>
  </div>
  
  ${sectionsHTML}
  
  ${data.footer ? `<div class="footer">${data.footer}</div>` : ''}
</body>
</html>
  `.trim();
}

/**
 * Download HTML as PDF using browser print
 */
export function downloadPDF(data: PDFExportData, _filename: string = 'report.pdf') {
  const html = generatePDFHTML(data);

  // Create a new window
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download PDF');
    return;
  }

  // Write HTML to the window
  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for content to load, then print
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();

    // Close window after printing (optional)
    // printWindow.close();
  };
}

/**
 * Share results via Web Share API
 */
export async function shareResults(data: {
  title: string;
  text: string;
  url?: string;
}): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: data.title,
      text: data.text,
      url: data.url || window.location.href,
    });
    return true;
  } catch (error) {
    console.error('Error sharing:', error);
    return false;
  }
}

/**
 * Copy results to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}
