// components/AddTodoForm.tsx
"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { createTodo } from "@/actions/todo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-slate-800 text-white hover:bg-slate-700"
    >
      {pending ? "Adding..." : "Add Task"}
    </Button>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Define a client-side function to handle the action
  async function clientAction(formData: FormData) {
    // First, call your server action
    await createTodo(formData);

    // After the server action is complete, reset the form
    formRef.current?.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Pass the new clientAction function to the form */}
      <form
        ref={formRef}
        action={clientAction} // The fix is here
        className="flex items-center gap-3"
      >
        <Input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          required
          className="flex-grow"
        />
        <SubmitButton />
      </form>
    </motion.div>
  );
}
