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

type VideoData = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

type Props = {
  func: (formData: VideoData[]) => void;
};

type FormData = {
  music: string;
};

export const ProfileForm: React.FC<Props> = ({ func }) => {
  const form = useForm<FormData>({
    defaultValues: {
      music: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const music = data.music;
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: music }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      return;
    }

    try {
      const items: VideoData[] = await response.json();
      func(items);
    } catch (e) {
      console.error("Error parsing JSON:", e);
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
};
