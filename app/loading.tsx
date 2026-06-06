export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-bg-base">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet animate-pulse" />
          <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet opacity-40 blur-lg animate-pulse" />
        </div>
        <p className="text-xs font-mono text-slate-600 tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
