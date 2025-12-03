'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Validation schema
const demoFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  companyName: z
    .string()
    .min(2, 'Nama perusahaan minimal 2 karakter')
    .max(100, 'Nama perusahaan maksimal 100 karakter'),
  workEmail: z
    .string()
    .email('Format email tidak valid')
    .regex(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Email harus menggunakan domain perusahaan'),
  phone: z
    .string()
    .regex(/^(\+62|62|0)\d{9,15}$/, 'Nomor telepon tidak valid (contoh: 08123456789)'),
  industry: z.string().min(1, 'Pilih industri'),
  employees: z.string().optional(),
  consent: z.string().refine(val => val === 'on', {
    message: 'Anda harus menyetujui Kebijakan Privasi',
  }),
});

type DemoFormResult = {
  success: boolean;
  whatsappUrl?: string;
  errors?: Record<string, string>;
};

export async function submitDemoForm(formData: FormData): Promise<DemoFormResult> {
  try {
    // Validate form data
    const rawData = {
      fullName: formData.get('fullName'),
      companyName: formData.get('companyName'),
      workEmail: formData.get('workEmail'),
      phone: formData.get('phone'),
      industry: formData.get('industry'),
      employees: formData.get('employees'),
      consent: formData.get('consent'),
    };

    const validatedData = demoFormSchema.parse(rawData);

    // Generate WhatsApp URL
    const phone = '622139702834'; // Sales Number
    const message = `Halo BizOps, saya ${validatedData.fullName} dari ${validatedData.companyName}. Saya tertarik untuk demo produk (Industri: ${validatedData.industry}). Email saya: ${validatedData.workEmail}.`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Here you could also:
    // - Save to database
    // - Send email notification
    // - Track in analytics
    // - Add to CRM

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Revalidate demo page
    revalidatePath('/demo');

    return {
      success: true,
      whatsappUrl,
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
