'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null; // Optionally show a spinner

  return session ? (
    <button
      onClick={() => signOut()}
      className="border border-primary-high_bright text-primary-high_bright bg-white py-2 px-4 w-full flex items-center justify-center font-sans font-bold"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="border border-primary-high_bright text-primary-high_bright bg-white py-2 px-4 w-full flex items-center justify-center font-bold shadow-none"
    >
      Login
    </button>
  );
}
