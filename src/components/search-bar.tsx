"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  func: (formData: FormData) => Promise<void>;
};

type FormData = {
  music: string;
};

export function ProfileForm({ func }: Props) {
  const form = useForm<FormData>({
    defaultValues: {
      music: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const music = data.music as string;
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: music }),
    });
  
    // Yanıt başarılı mı kontrol et
    if (!response.ok) {
      const errorText = await response.text(); // Yanıt metni al
      console.error('API Error:', errorText); // Hata mesajını konsola yazdır
      return;
    }
  
    try {
      // Yanıt JSON formatında mı kontrol et
      const items = await response.json();
      func(items); // Başarılı istek sonrası işlem yap
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="music"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Music</FormLabel>
              <FormControl>
                <Input placeholder="music..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
