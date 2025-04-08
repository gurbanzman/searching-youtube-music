"use server";

export const handleSearch = async (formData: FormData) => {
   const music = formData.get("music") as string;
   const response = await fetch(`/api/search?q=${encodeURIComponent(music)}`);
   const items = await response.json();
   return items;
}