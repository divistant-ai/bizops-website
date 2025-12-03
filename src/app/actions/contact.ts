'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z
    .string()
    .email('Format email tidak valid'),
  phone: z
    .string()
    .regex(/^(\+62|62|0)\d{9,15}$/, 'Nomor telepon tidak valid')
    .optional()
    .or(z.literal('')),
  company: z.string().optional(),
  subject: z
    .string()
    .min(5, 'Subjek minimal 5 karakter')
    .max(200, 'Subjek maksimal 200 karakter')
    .optional(),
  message: z
    .string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
  consent: z.string().refine(val => val === 'on', {
    message: 'Anda harus menyetujui Kebijakan Privasi',
  }),
});

type ContactFormResult = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    // Validate form data
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      company: formData.get('company'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      consent: formData.get('consent'),
    };

    contactFormSchema.parse(rawData); // Validate data

    // Here you could:
    // - Send email via SendGrid/Resend
    // - Save to database
    // - Create ticket in support system
    // - Send to Slack/Discord
    // - Track in analytics

    // For now, simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Example: Send to email service
    // await sendEmail({
    //   to: 'contact@bizops.id',
    //   subject: `Contact Form: ${validatedData.subject || 'General Inquiry'}`,
    //   body: `
    //     Name: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Company: ${validatedData.company || 'N/A'}
    //     Phone: ${validatedData.phone || 'N/A'}
    //     Message: ${validatedData.message}
    //   `,
    // });

    // Revalidate contact page
    revalidatePath('/contact');

    return {
      success: true,
      message: 'Pesan Anda telah terkirim! Tim kami akan menghubungi Anda segera.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      }
      return {
        success: false,
        errors,
      };
    }

    return {
      success: false,
      errors: {
        general: 'Terjadi kesalahan. Silakan coba lagi.',
      },
    };
  }
}
