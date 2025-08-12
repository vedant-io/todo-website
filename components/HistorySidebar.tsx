// components/HistorySidebar.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// An icon component for the header
function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

// The final, polished sidebar component
export function HistorySidebar({ historyDates }: { historyDates: string[] }) {
  const searchParams = useSearchParams();
  const activeDate = searchParams.get("date");

  return (
    <aside className="hidden h-screen w-72 flex-shrink-0 border-r border-slate-200 bg-slate-100/50 p-6 lg:block">
      <div className="flex items-center gap-3">
        <CalendarDaysIcon className="h-6 w-6 text-slate-600" />
        <h2 className="text-xl font-bold text-slate-800">History</h2>
      </div>
      <nav className="mt-8 flex flex-col gap-1">
        {/* "Today" Link */}
        <Link
          href="/"
          className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            !activeDate
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-200"
          }`}
        >
          Today
        </Link>

        {/* Conditional rendering for past days */}
        {historyDates.length > 0 ? (
          <>
            <div className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Past Days
            </div>
            {historyDates.map((date) => {
              const isActive = date === activeDate;
              return (
                <Link
                  key={date}
                  href={`/?date=${date}`}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </Link>
              );
            })}
          </>
        ) : (
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>No past activity found.</p>
          </div>
        )}
      </nav>
    </aside>
  );
}
