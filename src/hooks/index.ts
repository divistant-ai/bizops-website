/**
 * Custom React Hooks - BizOps Website v2
 *
 * This file exports all custom hooks for easy import
 *
 * @example
 * import { useLocalStorage, useModal, useDebounce } from '@/hooks';
 */

export { useDebounce } from './useDebounce';
export { useAsyncErrorHandler, useErrorHandler } from './useErrorHandler';
export { useLocalStorage } from './useLocalStorage';
export {
  useIsDesktop,
  useIsMobile,
  useIsTablet,
  useMediaQuery,
  usePrefersDark,
  usePrefersReducedMotion,
} from './useMediaQuery';
export { useModal } from './useModal';
export { useOnClickOutside } from './useOnClickOutside';
export { getAnimationDuration, useReducedMotion } from './useReducedMotion';
export { useIsScrolled, useScrollPosition } from './useScrollPosition';
