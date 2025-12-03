'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validation schema
const newsletterSchema = z.object({
  email: z
    .string()
    .email('Format email tidak valid')
    .min(5, 'Email terlalu pendek')
    .max(100, 'Email terlalu panjang'),
});

type NewsletterResult = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function subscribeToNewsletter(formData: FormData): Promise<NewsletterResult> {
  try {
    // Validate email
    const rawData = {
      email: formData.get('email'),
    };

    newsletterSchema.parse(rawData); // Validate data

    // Here you could:
    // - Add to email marketing service (Mailchimp, SendGrid, etc)
    // - Save to database
    // - Send welcome email
    // - Track in analytics

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 300));

    // Example: Add to email service
    // await emailService.subscribe({
    //   email: validatedData.email,
    //   tags: ['website-newsletter'],
    //   source: 'website-footer',
    // });

    // Revalidate pages with newsletter form
    revalidatePath('/');

    return {
      success: true,
      message: 'Terima kasih! Anda telah berlangganan newsletter kami.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || 'Format email tidak valid',
      };
    }

    return {
      success: false,
      error: 'Terjadi kesalahan. Silakan coba lagi.',
    };
  }
}
