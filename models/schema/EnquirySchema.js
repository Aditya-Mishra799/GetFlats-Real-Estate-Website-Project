import * as z from "zod";

const phoneNumberSchema = z.string().refine((value) => {
    // Regular expression to match common phone number formats
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
}, {
    message: 'Invalid phone number format'
});

const EnquirySchema = z.object({
    phone: phoneNumberSchema,
    email: z
        .string()
        .refine((email)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {message: 'Invalid Email format'})
        ,
    description: z.string().optional().refine((value) => {
        return !value || value.length > 30;
      }, {
        message: 'Description must be greater than 30 characters if provided',}),
})
export default EnquirySchema