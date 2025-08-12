// components/TodoList.tsx
"use client";

import { type Todo } from "@prisma/client";
import { AnimatePresence } from "framer-motion";

import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";

export function TodoList({
  initialTodos,
  isHistory,
}: {
  initialTodos: Todo[];
  isHistory: boolean;
}) {
  return (
    <div className="space-y-8">
      {!isHistory && <TodoForm />}

      <AnimatePresence>
        {initialTodos.length > 0 ? (
          initialTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isHistory={isHistory} />
          ))
        ) : (
          <div className="mt-16 text-center text-slate-500">
            <p className="font-semibold">No tasks for this day!</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
