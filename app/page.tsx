// app/page.tsx

import { UserButton } from "@clerk/nextjs";
import { getMyTodos, getTodoHistory } from "@/actions/todo";
import { TodoList } from "@/components/TodoList";
import { HistorySidebar } from "@/components/HistorySidebar";

export default async function Home({
  searchParams,
}: {
  // This is the correct and robust typing for searchParams
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedDate =
    typeof searchParams.date === "string" ? searchParams.date : undefined;

  // Fetch all necessary data
  const history = await getTodoHistory();
  const historyDates = Object.keys(history);
  const todos = selectedDate ? history[selectedDate] || [] : await getMyTodos();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <div className="flex">
        {/* Pass the fetched dates to the sidebar */}
        <HistorySidebar historyDates={historyDates} />

        <div className="flex-grow">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
              <h1 className="font-serif text-2xl font-bold text-slate-900">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )
                  : "Today"}
              </h1>
              <UserButton signInUrl="/sign-in" />
            </div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-2xl px-6 py-12">
            <TodoList initialTodos={todos} isHistory={!!selectedDate} />
          </main>
        </div>
      </div>
    </div>
  );
}
