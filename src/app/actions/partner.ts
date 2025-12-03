'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validation schema
const partnerApplySchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z
    .string()
    .email('Format email tidak valid'),
  companyName: z
    .string()
    .min(3, 'Nama perusahaan minimal 3 karakter')
    .max(100, 'Nama perusahaan maksimal 100 karakter'),
  phone: z
    .string()
    .regex(/^(\+62|62|0)\d{9,15}$/, 'Nomor telepon tidak valid (contoh: 08123456789)'),
  program: z.enum(['reseller', 'implementation', 'startup', 'technology']),
  website: z.string().url('URL website tidak valid').optional().or(z.literal('')),
  message: z.string().optional(),
  consent: z.string().refine(val => val === 'on', {
    message: 'Anda harus menyetujui NDA & Kebijakan Privasi',
  }),
});

type PartnerApplyResult = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitPartnerApplication(formData: FormData): Promise<PartnerApplyResult> {
  try {
    // Validate form data
    const rawData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      companyName: formData.get('companyName'),
      phone: formData.get('phone'),
      program: formData.get('program'),
      website: formData.get('website') || '',
      message: formData.get('message'),
      consent: formData.get('consent'),
    };

    partnerApplySchema.parse(rawData); // Validate data

    // Here you could:
    // - Save to database
    // - Send email to partner team
    // - Create CRM entry
    // - Send welcome email to applicant
    // - Track in analytics

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Example: Save to database
    // await db.insert(partnerApplications).values({
    //   fullName: validatedData.fullName,
    //   email: validatedData.email,
    //   companyName: validatedData.companyName,
    //   phone: validatedData.phone,
    //   program: validatedData.program,
    //   website: validatedData.website,
    //   message: validatedData.message,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    // Revalidate partner pages
    revalidatePath('/partners');
    revalidatePath('/partners/apply');

    return {
      success: true,
      message: 'Aplikasi Anda telah diterima! Tim kami akan menghubungi Anda dalam 1-2 hari kerja.',
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
