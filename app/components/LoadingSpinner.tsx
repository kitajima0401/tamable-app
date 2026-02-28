"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="w-12 h-12 border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-300 text-sm font-medium">データ取得中...</p>
    </div>
  );
}

