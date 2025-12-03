// @ts-nocheck
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useModal } from '@/hooks/useModal';

describe('Custom Hooks', () => {
  describe('useDebounce', () => {
    it('should debounce value changes', async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
        {
          initialProps: { value: 'initial', delay: 500 },
        },
      );

      expect(result.current).toBe('initial');

      // Change value
      rerender({ value: 'updated', delay: 500 });

      // Value should not change immediately
      expect(result.current).toBe('initial');

      // Wait for debounce delay
      await waitFor(
        () => {
          expect(result.current).toBe('updated');
        },
        { timeout: 600 },
      );
    });

    it('should use default delay of 500ms', async () => {
      const { result, rerender } = renderHook(({ value }: { value: string }) => useDebounce(value), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });

      await waitFor(
        () => {
          expect(result.current).toBe('updated');
        },
        { timeout: 600 },
      );
    });
  });

  describe('useModal', () => {
    it('should initialize with false by default', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.isOpen).toBe(false);
    });

    it('should initialize with provided initial state', () => {
      const { result } = renderHook(() => useModal(true));

      expect(result.current.isOpen).toBe(true);
    });

    it('should open modal', () => {
      const { result } = renderHook(() => useModal());
      result.current.open();

      expect(result.current.isOpen).toBe(true);
    });

    it('should close modal', () => {
      const { result } = renderHook(() => useModal(true));
      result.current.close();

      expect(result.current.isOpen).toBe(false);
    });

    it('should toggle modal state', () => {
      const { result } = renderHook(() => useModal());

      result.current.toggle();

      expect(result.current.isOpen).toBe(true);

      result.current.toggle();

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('useLocalStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return initial value when no stored value exists', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      expect(result.current[0]).toBe('initial');
    });

    it('should store and retrieve value from localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      result.current[1]('updated');

      expect(result.current[0]).toBe('updated');
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
    });

    it('should handle complex objects', () => {
      const initialValue = { name: 'John', age: 30 };
      const { result } = renderHook(() => useLocalStorage('user', initialValue));

      expect(result.current[0]).toEqual(initialValue);

      const updatedValue = { name: 'Jane', age: 25 };
      result.current[1](updatedValue);

      expect(result.current[0]).toEqual(updatedValue);
    });
  });
});
