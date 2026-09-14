import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime, onSelect }) => {
  return (
    <div className='anime-card' onClick={() => onSelect(anime)}>
      <img src={
        anime.images?.webp?.image_url ||
        anime.images?.jpg?.image_url ||
        './no-image.avif'
        } alt={anime.title_english} 
      />

      <div className="mt-4">
        <h3 className="text-white">{anime.title_english || anime.title}</h3>

        <div className="content">
          <div className="rating">
            <img src="./Rating.svg" alt="Ratings star icon" />
            <p>{anime.score ? anime.score : 'N/A'}</p>
          </div>

          <span>●</span>
          <p className="source">{anime.source}</p>

          <span>●</span>
          <p className="year">{anime.aired?.from?.split('-')[0] || 'N/A'}</p>
        </div>
      </div>

      <Link to={`/anime/${anime.mal_id}`} onClick={(e) => e.stopPropagation()} className= "underline decoration-dotted text-[#a595ff] hover:text-[#8f7bff] font-semibold cursor-pointer">
        View Details
      </Link>

    </div>
  )
}

export default AnimeCard