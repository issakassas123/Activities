import { z } from 'zod';

const requiredString = (fieldName: string) => z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({ message: 'Date is required' }),
    location: z.object({
        venue: requiredString('Venue'),
        city: requiredString('City'),
        lat: z.number(),
        lng: z.number(),
    }).optional(),

});

export type ActivitySchema = z.infer<typeof activitySchema>;