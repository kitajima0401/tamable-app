'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
