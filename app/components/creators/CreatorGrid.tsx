import CreatorCard from "./CreatorCard";
import type { Creator } from "./CreatorType";

type CreatorListProps = {
  creators: Creator[];
};

export default function CreatorList({ creators }: CreatorListProps) {
  if (!creators || creators.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No creators found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  );
}