"use client";

import React from "react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="p-4 bg-red-900/30 border border-red-800/50 backdrop-blur rounded-lg text-red-200 shadow-lg">
      <p className="font-medium mb-3">⚠️ {message}</p>
      <button
        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg transition font-medium text-sm shadow-lg"
        onClick={onRetry}
      >
        再試行
      </button>
    </div>
  );
}
