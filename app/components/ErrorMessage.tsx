"use client";

import React from "react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="p-4 bg-red-100 text-red-800 rounded">
      <p>{message}</p>
      <button
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
        onClick={onRetry}
      >
        再試行
      </button>
    </div>
  );
}
