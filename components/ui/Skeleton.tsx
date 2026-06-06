// skeleton loaders — nothing fancy, just pulsing boxes
export function CourseCardSkeleton() {
  return (
    <div className="rounded-xl bg-bg-surface border border-border p-5 space-y-4">
      <div className="w-9 h-9 rounded-lg skeleton" />
      <div className="space-y-2">
        <div className="h-3.5 w-2/3 rounded skeleton" />
        <div className="h-3 w-1/3 rounded skeleton" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full skeleton" />
        <div className="flex justify-between">
          <div className="h-2.5 w-14 rounded skeleton" />
          <div className="h-2.5 w-10 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}

export function CoursesGridSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </>
  );
}
