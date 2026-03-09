"use server";

import { revalidatePath } from "next/cache";

import { createTask, deleteTask } from "@/app/services/homePageService";
import { requireAuth } from "@/lib/require-auth";

export async function addTaskAction(taskText: string) {
  const value = taskText.trim();
  if (!value) {
    throw new Error("Task text is required.");
  }

  const createdTask = await requireAuth(() => createTask(value));
  revalidatePath("/home");
  return createdTask;
}

export async function removeTaskAction(taskId: string) {
  if (!taskId) {
    throw new Error("Task id is required.");
  }

  await requireAuth(() => deleteTask(taskId));
  revalidatePath("/home");
  return { taskId };
}
