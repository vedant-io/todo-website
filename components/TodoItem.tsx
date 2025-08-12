// components/TodoItem.tsx
"use client";

import { motion } from "framer-motion";
import { type Todo } from "@prisma/client";
import { updateTodoStatus, deleteTodo } from "@/actions/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function TodoItem({
  todo,
  isHistory,
}: {
  todo: Todo;
  isHistory: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => updateTodoStatus(todo.id, !todo.completed)}
        className="h-5 w-5"
        disabled={isHistory}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow text-slate-700 transition-colors ${
          todo.completed ? "text-slate-400 line-through" : ""
        } ${isHistory ? "cursor-default" : ""}`}
      >
        {todo.title}
      </label>
      {!isHistory && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Delete
        </Button>
      )}
    </motion.div>
  );
}
