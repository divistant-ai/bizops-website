/**
 * Server Actions - BizOps Website V3
 *
 * Centralized server actions for form submissions and mutations
 * Following Next.js 14+ best practices
 *
 * @example
 * import { submitDemoForm } from '@/app/actions';
 *
 * <form action={submitDemoForm}>
 *   <input name="fullName" />
 *   <button type="submit">Submit</button>
 * </form>
 */

export { submitContactForm } from './contact';
export { submitDemoForm } from './demo';
export { subscribeToNewsletter } from './newsletter';
export { submitPartnerApplication } from './partner';
