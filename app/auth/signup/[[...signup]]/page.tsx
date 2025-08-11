// app/sign-up/[[...sign-up]]/page.tsx
'use client'; // This component uses client-side hooks for animation

import { SignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';

// A new icon representing a pen nib, fitting the "Ink & Paper" theme
const PenNibIcon = () => (
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
    <path d="M12 20.5l-7.2-7.2c-1-1-1.6-2.3-1.8-3.8 0-2.3.9-4.5 2.5-6.1 1.6-1.6 3.8-2.5 6-2.5 2.3 0 4.5.9 6.1 2.5 1.6 1.6 2.5 3.8 2.5 6.1-.2 1.5-.8 2.8-1.8 3.8L12 20.5z"></path>
    <path d="M12 20.5v-8.5"></path>
  </svg>
);


// Main component for the redesigned sign-up page
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
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8F5F2] p-4 font-sans">
      {/* Subtle paper texture in the background */}
      <div className="absolute inset-0 z-0"/>

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
            <PenNibIcon />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-800">
            Begin Your Story
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create an account to get started.
          </p>
        </motion.div>

        {/* Clerk Sign-Up Component with new light-theme styling */}
        <motion.div variants={itemVariants} className='flex flex-col items-center'>
          <SignUp
            appearance={{
              baseTheme: undefined, // Ensure no default theme is applied
              variables: {
                colorPrimary: '#1e3a8a', // A deep ink-blue
                colorText: '#1f2937', // Charcoal gray
                colorTextSecondary: '#4b5563', // Lighter gray
                colorInputBackground: '#f9fafb', // Off-white
                colorInputText: '#1f2937',
                fontFamily: 'sans-serif',
              },
              elements: {
                card: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
                formFieldLabel: {
                  color: '#374151', // Dark gray
                  fontWeight: '600',
                },
                formFieldInput: {
                  borderColor: '#d1d5db', // Light gray border
                  borderRadius: '0.25rem',
                  transition: 'all 0.2s ease-in-out',
                  '&:focus': {
                    borderColor: '#1e3a8a',
                    boxShadow: '0 0 0 1px #1e3a8a',
                  },
                },
                formButtonPrimary: {
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  borderRadius: '0.25rem',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                },
                socialButtonsBlockButton: {
                  borderColor: '#d1d5db',
                  borderRadius: '0.25rem',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                },
                footerActionLink: {
                  fontWeight: '600',
                },
              },
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
