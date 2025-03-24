"use server";

import { deleteBlog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";

export async function handleDelete(id) {
  await deleteBlog(id);
  revalidatePath("/admin/blogs"); // Ensure UI updates after deletion
}
