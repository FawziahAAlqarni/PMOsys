'use client';

import {signIn, signOut, useSession} from 'next-auth/react';

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api';

export default function Main() {
  const {data: session, status} = useSession();

  if (status === 'loading') {
    return (
      <main className="max-w-5xl mx-auto p-2">
        <div className="text-center py-10">Loading...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="max-w-5xl mx-auto p-2">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Task Management</h1>
          <p className="mb-4 text-gray-600">Please sign in with your Microsoft account to continue</p>
          <button
            onClick={() => signIn('azure-ad')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            Sign in with Microsoft
          </button>
        </div>
      </main>
    );
  }

  return (

    <main className="max-w-5xl mx-auto p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">Task Management</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session.user?.name || session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>

  );
}
