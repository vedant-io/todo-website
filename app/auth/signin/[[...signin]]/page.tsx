// app/sign-in/[[...sign-in]]/page.tsx
"use client"; // This component uses client-side hooks for animation

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

// An icon representing a key, fitting the sign-in context
const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-slate-600"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
  </svg>
);

// Main component for the sign-in page
export default function Page() {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8F5F2] p-4 font-sans">
      {/* Subtle paper texture in the background */}
      <div className="absolute inset-0 z-0" />

      {/* Main Card with Staggered Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md rounded-lg border border-slate-300 bg-white p-8 shadow-sm"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-col items-center text-center"
        >
          <div className="mb-4 rounded-full bg-slate-100 p-3">
            <KeyIcon />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-800">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue your story.
          </p>
        </motion.div>

        {/* Clerk Sign-In Component with new light-theme styling */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <SignIn
            appearance={{
              baseTheme: undefined, // Ensure no default theme is applied
              variables: {
                colorPrimary: "#1e3a8a", // A deep ink-blue
                colorText: "#1f2937", // Charcoal gray
                colorTextSecondary: "#4b5563", // Lighter gray
                colorInputBackground: "#f9fafb", // Off-white
                colorInputText: "#1f2937",
                fontFamily: "sans-serif",
              },
              elements: {
                card: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                formFieldLabel: {
                  color: "#374151", // Dark gray
                  fontWeight: "600",
                },
                formFieldInput: {
                  borderColor: "#d1d5db", // Light gray border
                  borderRadius: "0.25rem",
                  transition: "all 0.2s ease-in-out",
                  "&:focus": {
                    borderColor: "#1e3a8a",
                    boxShadow: "0 0 0 1px #1e3a8a",
                  },
                },
                formButtonPrimary: {
                  fontSize: "0.875rem",
                  textTransform: "none",
                  borderRadius: "0.25rem",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                },
                socialButtonsBlockButton: {
                  borderColor: "#d1d5db",
                  borderRadius: "0.25rem",
                  color: "#374151",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                  },
                },
                footerActionLink: {
                  fontWeight: "600",
                },
              },
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
