/**
 * Export and sharing utilities for calculator tools
 */

/**
 * Generate PDF-like content and trigger download
 * Note: For production, consider using jsPDF or similar library
 */
export function downloadAsText(content: string, filename: string): void {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Gagal mengunduh file. Silakan coba lagi.');
  }
}

/**
 * Format calculation result as text for download
 */
export function formatResultAsText(
  toolName: string,
  inputs: Record<string, string | number>,
  results: Record<string, string | number>,
): string {
  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `========================================\n`;
  text += `${toolName}\n`;
  text += `BizOps - Business Operations Platform\n`;
  text += `========================================\n\n`;
  text += `Tanggal: ${date}\n\n`;

  text += `INPUT:\n`;
  text += `----------------------------------------\n`;
  for (const [key, value] of Object.entries(inputs)) {
    text += `${key}: ${value}\n`;
  }

  text += `\nHASIL PERHITUNGAN:\n`;
  text += `----------------------------------------\n`;
  for (const [key, value] of Object.entries(results)) {
    text += `${key}: ${value}\n`;
  }

  text += `\n========================================\n`;
  text += `Disclaimer:\n`;
  text += `Hasil perhitungan bersifat estimasi.\n`;
  text += `Untuk perhitungan akurat, konsultasikan\n`;
  text += `dengan profesional terkait.\n`;
  text += `========================================\n\n`;
  text += `Powered by BizOps\n`;
  text += `https://bizops.id\n`;

  return text;
}

/**
 * Share via Web Share API (mobile-friendly)
 */
export async function shareResult(
  title: string,
  text: string,
  url?: string,
): Promise<boolean> {
  // Check if Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: url || window.location.href,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      return false;
    }
  } else {
    // Fallback: Copy to clipboard
    return copyToClipboard(text);
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return false;
  }
}

/**
 * Share on WhatsApp
 */
export function shareOnWhatsApp(text: string): void {
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/?text=${encodedText}`;
  window.open(url, '_blank');
}

/**
 * Share on Twitter
 */
export function shareOnTwitter(text: string, url?: string): void {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = url ? encodeURIComponent(url) : encodeURIComponent(window.location.href);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

/**
 * Share on LinkedIn
 */
export function shareOnLinkedIn(url?: string): void {
  const encodedUrl = url ? encodeURIComponent(url) : encodeURIComponent(window.location.href);
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  window.open(linkedInUrl, '_blank', 'width=550,height=420');
}

/**
 * Generate shareable summary text
 */
export function generateShareText(
  toolName: string,
  mainResult: string,
): string {
  return `Saya baru saja menggunakan ${toolName} di BizOps!\n\nHasil: ${mainResult}\n\nCoba juga: ${window.location.href}`;
}
