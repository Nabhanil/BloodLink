
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { toast } from 'sonner'; // Assuming you're using sonner for notifications
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define the validation schema using Zod
const formSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(100),
  number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  address: z.object({
    state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
    district: z.string().min(2).max(100, "District must be between 2 and 100 characters"),
  }),
});

type FormData = z.infer<typeof formSchema>;

const BloodBankRegister: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/bloodbank/signup', data);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-xl mx-80 py-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Name</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" placeholder="Blood Bank Name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the blood bank.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Email</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" type="email" placeholder="example@bloodbank.com" {...field} />
              </FormControl>
              <FormDescription>Enter your contact email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Password</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" type="password" placeholder="someone$123456" {...field} />
              </FormControl>
              <FormDescription>Choose a strong password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex'>Contact Number</FormLabel>
              <FormControl>
                <Input className="shadow hover:shadow-lg" type="text" placeholder="1234567890" {...field} />
              </FormControl>
              <FormDescription>Enter your contact number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex'>State</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="State" {...field} />
                  </FormControl>
                  <FormDescription>Enter the state of the blood bank.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="address.district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex'>District</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="District" {...field} />
                  </FormControl>
                  <FormDescription>Enter the district of the blood bank.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default BloodBankRegister;