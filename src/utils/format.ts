/**
 * Utility functions for formatting numbers, currency, and other data
 */

/**
 * Format number as Indonesian Rupiah currency
 */
export const formatCurrency = (amount: number, locale: string = 'id-ID'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number, locale: string = 'id-ID'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Format number as percentage
 */
export const formatPercentage = (num: number, decimals: number = 0): string => {
  return `${num.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K, M, B suffixes
 */
export const formatCompactNumber = (num: number, locale: string = 'id-ID'): string => {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

/**
 * Format file size (bytes to KB, MB, GB)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Format phone number (Indonesian format)
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as: +62 812-3456-7890
  if (cleaned.startsWith('62')) {
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
    }
  }

  // Format as: 0812-3456-7890
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phone;
};
