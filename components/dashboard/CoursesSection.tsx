import type { Course } from "@/types";
import { getCourses } from "@/lib/data";
import CourseCard from "@/components/dashboard/CourseCard";
import ErrorTile from "@/components/ui/ErrorTile";
import { BentoItem } from "@/components/dashboard/BentoGrid";

export default async function CoursesSection() {
  let courses : Course[] = [] ;
  let error: string | null = null;

  try {
    courses = await getCourses();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
    courses = [];
  }

  if (error) {
    return (
      <BentoItem className="col-span-full">
        <ErrorTile message={error} />
      </BentoItem>
    );
  }

  if (courses.length === 0) {
    return (
      <BentoItem className="col-span-full">
        <ErrorTile message="No courses found. Add some rows to your Supabase 'courses' table." />
      </BentoItem>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <BentoItem key={course.id}>
          <CourseCard course={course} index={index} />
        </BentoItem>
      ))}
    </>
  );
}
