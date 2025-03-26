"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Define Islamic blog categories
const categories = [
  "Quran and Hadith",
  "Islamic Beliefs and Practices",
  "Ramadan and Islamic Festivals",
  "Islamic History and Biographies",
  "Islamic Lifestyle and Morality",
  "Islamic Spirituality and Self Improvement",
  "Islamic Finance and Business Ethics",
  "Dawah and Islamic Outreach",
  "Women in Islam",
  "Islamic Parenting and Education",
  "Islamic Travel and Hajj/Umrah",
  "Islamic Science and Contributions",
];

export default function CreateBlogs() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const form = useForm({
    defaultValues: { title: "", slug: "", content: "", imageUrl: "", category: "" },
  });

  async function onSubmit(values) {
    if (!values.title || !values.slug || !values.content || !values.category) {
      form.setError("title", { message: "All fields are required" });
      return;
    }
    if (!session?.user?.id) {
      toast({ title: "Error", description: "You must be logged in to create a blog" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          author: session.user.id, 
          authorGoogleId: session.user.googleId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      toast({ title: "Success", description: "Blog created!" });
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-blog-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-2 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    modules={{ toolbar: toolbarOptions }}
                    placeholder="Write your blog content here..."
                    className="min-h-[300px] border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}