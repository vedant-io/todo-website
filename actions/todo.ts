"use server";

import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const title = formData.get("title") as string;
  if (!title) {
    throw new Error("Title is required");
  }

  await client.todo.create({
    data: {
      title,
      userId: user.id,
    },
  });

  revalidatePath("/");
}

export async function updateTodoStatus(todoId: string, completed: boolean) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const todo = await client.todo.update({
      where: {
        id: todoId,
        userId: user.id,
      },
      data: { completed: completed },
    });
    revalidatePath("/");
    return todo;
  } catch (error) {
    return { error };
  }
}

export async function deleteTodo(todoId: string) {
  try {
    await client.todo.delete({
      where: { id: todoId },
    });
    revalidatePath("/");
  } catch (error) {
    return { error };
  }
  revalidatePath("/");
  return { success: true };
}

export async function getMyTodos() {
  const user = await currentUser();
  const todos = await client.todo.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return todos;
}

export async function getTodoHistory() {
  const user = await currentUser();
  if (!user) {
    return {};
  }

  const todos = await client.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Group todos by date
  const groupedByDate = todos.reduce((acc, todo) => {
    const date = todo.createdAt.toISOString().split("T")[0]; // Get YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {} as Record<string, typeof todos>);

  return groupedByDate;
}
