import { describe, expect, it } from 'vitest';
import { formatDate as formatDateUtil, getDaysBetween, isPast, isToday } from '@/utils/date';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format Indonesian Rupiah correctly', () => {
      expect(formatCurrency(2500000)).toBe('Rp2.500.000');
      expect(formatCurrency(1000)).toBe('Rp1.000');
      expect(formatCurrency(0)).toBe('Rp0');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1000)).toContain('-');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with thousand separators', () => {
      expect(formatNumber(1000000)).toBe('1.000.000');
      expect(formatNumber(1000)).toBe('1.000');
      expect(formatNumber(100)).toBe('100');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      expect(formatPercentage(25.5)).toBe('25%');
      expect(formatPercentage(25.5, 1)).toBe('25.5%');
      expect(formatPercentage(25.55, 2)).toBe('25.55%');
    });
  });
});

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date in Indonesian locale', () => {
      const date = new Date('2024-12-01');
      const formatted = formatDateUtil(date, 'id-ID');

      expect(formatted).toContain('2024');
      expect(formatted).toContain('Desember');
    });

    it('should handle string dates', () => {
      const formatted = formatDateUtil('2024-12-01', 'id-ID');

      expect(formatted).toContain('2024');
    });
  });

  describe('isToday', () => {
    it('should return true for today\'s date', () => {
      const today = new Date();

      expect(isToday(today)).toBe(true);
    });

    it('should return false for past dates', () => {
      const yesterday = new Date(Date.now() - 86400000);

      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isPast', () => {
    it('should return true for past dates', () => {
      const yesterday = new Date(Date.now() - 86400000);

      expect(isPast(yesterday)).toBe(true);
    });

    it('should return false for future dates', () => {
      const tomorrow = new Date(Date.now() + 86400000);

      expect(isPast(tomorrow)).toBe(false);
    });
  });

  describe('getDaysBetween', () => {
    it('should calculate days between two dates', () => {
      const date1 = new Date('2024-12-01');
      const date2 = new Date('2024-12-05');

      expect(getDaysBetween(date1, date2)).toBe(4);
    });

    it('should handle reversed dates', () => {
      const date1 = new Date('2024-12-05');
      const date2 = new Date('2024-12-01');

      expect(getDaysBetween(date1, date2)).toBe(4);
    });
  });
});
