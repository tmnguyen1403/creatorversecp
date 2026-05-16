import {Link} from "react-router-dom";
import type { Creator } from "../../models/Creator";

type CreatorCardProps = {
  creator: Creator;
};

export default function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link to={`/creators/${creator.id}`} className="block group">
      <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white">
        
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {creator.name}
          </h3>

          <p className="text-sm text-gray-500">
            @{creator.name}
          </p>

          {creator.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {creator.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}