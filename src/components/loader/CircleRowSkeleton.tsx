import { Skeleton } from "./Skeleton";

export default function CircleRowSkeleton() {
  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 flex justify-between items-center">
      <div>
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-4 w-28" />
      </div>

      <Skeleton className="h-10 w-36 rounded-md" />
    </div>
  );
}

