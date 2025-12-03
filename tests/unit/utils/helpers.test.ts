import { describe, expect, it } from 'vitest';
import { getBaseUrl, getI18nPath } from '@/libs/utils/helpers';

describe('Helper Utilities', () => {
  describe('getBaseUrl', () => {
    it('should return NEXT_PUBLIC_APP_URL if set', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://test.bizops.id';

      expect(getBaseUrl()).toBe('https://test.bizops.id');

      delete process.env.NEXT_PUBLIC_APP_URL;
    });

    it('should return localhost in development', () => {
      delete process.env.NEXT_PUBLIC_APP_URL;
      delete process.env.VERCEL_URL;

      expect(getBaseUrl()).toBe('http://localhost:3000');
    });
  });

  describe('getI18nPath', () => {
    it('should return path as-is for default locale', () => {
      expect(getI18nPath('/platform', 'en')).toBe('/platform');
    });

    it('should prefix path with locale for non-default locale', () => {
      expect(getI18nPath('/platform', 'id')).toBe('/id/platform');
    });
  });
});
