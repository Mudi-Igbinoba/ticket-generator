import { z } from 'zod';

export const formOneSchema = z.object({
  numberOfTickets: z.string().min(1, 'Please select the number of tickets'),
  ticketType: z.enum(['regular', 'vip', 'vvip'], {
    errorMap: () => ({ message: 'Please select a ticket type' })
  })
});

export const formTwoSchema = z.object({
  image: z.union([
    z
      .instanceof(File, { message: 'Please upload a valid image file/url' })
      .refine((file) => file.type.startsWith('image/'), {
        message: 'File must be an image'
      })
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: 'File size must be less than 10MB'
      }),
    z
      .string()
      .url({ message: 'Please upload a valid image file/url' })
      .optional()
  ]),
  name: z.string().min(2, 'Please fill in your full name').trim(),
  email: z.string().email('Please write a valid email'),
  request: z.string().min(1, { message: 'Please write in a special request' })
});
