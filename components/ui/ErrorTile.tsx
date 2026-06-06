"use client";

import { AlertCircle } from "lucide-react";

export default function ErrorTile({ message }: { message?: string }) {
  return (
    <div className="col-span-full rounded-xl border border-red-500/20 bg-red-500/5 p-5 flex items-start gap-3">
      <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-white">Couldn&apos;t load courses</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {message ?? "Make sure your Supabase env vars are set correctly in .env.local"}
        </p>
      </div>
    </div>
  );
}
