import { Suspense } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import HeroTile from "@/components/dashboard/HeroTile";
import ActivityTile from "@/components/dashboard/ActivityTile";
import StatsTile from "@/components/dashboard/StatsTile";
import CoursesSection from "@/components/dashboard/CoursesSection";
import { BentoGrid, BentoItem } from "@/components/dashboard/BentoGrid";
import { CoursesGridSkeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">

          {/* simple top bar */}
          <header className="flex items-center justify-between mb-6 pt-2">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Student Portal</p>
              <h2 className="font-display font-bold text-lg text-white">My Dashboard</h2>
            </div>
            {/* avatar placeholder */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden sm:block">Alex Johnson</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </header>

          <BentoGrid>
            {/* hero — full width */}
            <BentoItem className="col-span-1 md:col-span-2 xl:col-span-4">
              <HeroTile name="Alex" streak={12} xp={3840} level={7} />
            </BentoItem>

            {/* stats narrow, activity wide */}
            <BentoItem className="col-span-1 xl:col-span-1">
              <StatsTile />
            </BentoItem>
            <BentoItem className="col-span-1 md:col-span-1 xl:col-span-3">
              <ActivityTile />
            </BentoItem>

            {/* courses header */}
            <BentoItem className="col-span-1 md:col-span-2 xl:col-span-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-white">My Courses</h2>
                <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  see all →
                </a>
              </div>
            </BentoItem>

            <Suspense fallback={<CoursesGridSkeleton />}>
              <CoursesSection />
            </Suspense>
          </BentoGrid>
        </div>
      </main>
    </div>
  );
}
