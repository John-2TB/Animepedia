import React, { useState } from 'react'

const AnimeDescription = ({ text, maxLength=200 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // If text is short, render normally
  if (!text || text.length <= maxLength) {
    return <p className="text-gray-300 text-lg leading-relaxed">{text}</p>;
  }

  return (
    // The parent must allow children to flow inline
    <p className="text-gray-300 text-lg leading-relaxed">
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      
      {/* Changing the button to inline-block keeps it on the same line */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-block ml-1 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline decoration-dotted underline-offset-2 transition-colors"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>
    </p>
  );
}

export default AnimeDescription