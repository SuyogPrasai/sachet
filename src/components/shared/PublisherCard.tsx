import React from 'react';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

interface PublisherInformationProps {
  initials: string;
  name: string;
  established?: string; // Optional, as not all publishers provide this
  position?: string;
}

const PublisherInformation: React.FC<PublisherInformationProps> = ({ initials, name, established, position }) => {
  let formattedDate = '';

  if (established && !isNaN(Date.parse(established))) {
    try {
      formattedDate = format(new Date(established), 'MMMM yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  } else if (established) {
    console.warn('Invalid or missing established date:', established);
  }

  // Capitalize the first letter of each word in the name
  const capitalizedName = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm max-w-[700px] mb-10 mt-10 xl:mt-0">
      {/* Circular badge with publisher initials */}
      <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
        <span className="text-xl font-bold text-black font-roboto">{initials ? initials.toUpperCase() : 'A'}</span>
      </div>
      {/* Publisher information */}
      <div>
        <p className="text-sm text-gray-600 font-mono">Publisher of this article</p>
        <h2 className="text-xl font-semibold text-black font-mono flex gap-3">
          {position && (
            <Badge className="text-xs text-gray-500 font-mono bg-white hover:bg-white">
              {position}
            </Badge>
          )}
          <div className="text-black-600 hover:underline">
            {capitalizedName}
          </div>
        </h2>
        {formattedDate && (
          <p className="text-sm text-gray-600 font-mono mt-1">Published: {formattedDate}</p>
        )}
      </div>

    </div>
  );
};

export default PublisherInformation;