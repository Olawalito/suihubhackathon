import { Skeleton } from "./Skeleton";

export default function DashboardCardSkeleton() {
  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 w-72">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-10 w-32 mb-2" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
