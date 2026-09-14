import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AnimeDescription from './AnimeDescription';

const AnimeModal = ({ anime, onSelect }) => {
  // console.log(anime)

  let isoString;

  anime.aired.from ? isoString = anime.aired.from : null

  const date = new Date(isoString);

  const releaseDate = date.toLocaleString('en-US', { 
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  

  return (
    <div className='modal'>
      <button
        className="remove-modal"
        onClick={() => onSelect(null)}
        aria-label="Close modal"
      >
        <X size={32} />
      </button>
      <div className='anime-container'>
        
        {/* Title */}
        <div className='flex flex-col items-start md:flex-row md:items-center md:justify-between'>
          <h2>{anime.title_english || anime.title}</h2>

          <div className='flex justify-center items-center bg-light-100/20 px-4 py-2 rounded-lg'>
            <img src="./Rating.svg" alt="Rating star" />
            <p className='text-light-100'><span className='text-light-100 text-lg font-bold ml-2'>{anime.score ? anime.score : (<p className='text-white text-lg'>N/A</p>)}</span>/10</p>
          </div>

        </div>

        {/* Details */}
        <div className='text-gray-100 my-4'>

          <p>{anime.aired?.from?.split('-')[0] || (<p className='text-white text-lg'>N/A</p>)} ● {anime.rating ? anime.rating.split(' ')[0] : (<p className='text-white text-lg'>N/A</p>)} ● {anime.episodes? anime.episodes : 'No'} Episodes</p>
          
        </div>

        {/* Image and trailer */}
        <div className='media-display mb-6'>

          {/* Image */}
          <div className='w-full h-auto md:col-span-4 flex justify-center md:justify-start'>
            {
              anime.images.webp.image_url ? 
              (<img src={anime.images.webp.image_url} alt='Poster image' />) : 
              anime.images.jpg.image_url ? 
              (<img src={anime.images.jpg.image_url} alt='Poster image' />) : 
              (<img src='no-poster.avif' alt='No image' />)
            }
          </div>

          {/* Trailer */}
          <div className='rounded-lg md:col-span-8 w-full md:h-full'>
            {
              anime.trailer.embed_url ? 
              (<iframe className='w-full aspect-video h-auto md:h-full object-cover' src={anime.trailer.embed_url} />) : 
              anime.trailer.url ? 
              (<a href={anime.trailer.url} target='_blank'>
                <img src={anime.trailer.images.image_url} className='w-full h-full object-cover' />
              </a>) : 
              (<img src='./no-video.avif' alt='No video'/>)
            }
          </div>

        </div>

        {/* Anime information */}
        <div className='anime-info'>

          {/* Genres */}
          <div className='info-row'>
            <p className='title'>Genres</p>

            <div className='flex flex-wrap gap-4 items-center gap-x-4 gap-y-1'>
              {anime.genres.map((genre) => (
                <p
                  key={genre.mal_id}
                  className='text-lg text-white bg-light-100/20 py-1 px-2 rounded-lg'
                >
                  {genre.name}
                </p>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className='info-row'>
            <p className='title'>Overview</p>

            <AnimeDescription text={anime.synopsis} />

            {/* <p className='text-white'>
              {anime.synopsis || 'N/A'}
            </p> */}
          </div>

          {/* Release Date */}
          <div className='info-row'>
            <p className='title'>Release date</p>

            <p className='text-white'>
              {releaseDate || 'N/A'}
            </p>
          </div>

          {/* Source */}
          <div className='info-row'>
            <p className='title'>Source</p>

            <p className='text-white'>
              {anime.source || 'N/A'}
            </p>
          </div>

          {/* Airing status */}
          <div className='info-row'>
            <p className='title'>Airing status</p>

            <p className='text-white'>
              {anime.status || 'N/A'}
            </p>
          </div>

          {/* Demographics */}
          <div className='info-row'>
            <p className='title'>Demographics</p>

            <div className='flex flex-wrap gap-4'>
              {anime.demographics?.length > 0 ? (
                anime.demographics.map((demographic) => (
                  <p
                    key={demographic.mal_id}
                    className='text-lg text-white bg-light-100/20 py-1 px-2 rounded-lg'
                  >
                    {demographic.name}
                  </p>
                ))
              ) : (
                <p className='text-white text-lg'>N/A</p>
              )}
            </div>
          </div>

          {/* Producers */}
          <div className='info-row'>
            <p className='title'>Producers</p>

            <div className='flex flex-wrap gap-4'>
              {anime.producers?.length > 0 ? (
                anime.producers.map((producer) => (
                  <p
                    key={producer.mal_id}
                    className='text-lg text-white bg-light-100/20 py-1 px-2 rounded-lg'
                  >
                    {producer.name}
                  </p>
                ))
              ) : (
                <p className='text-white text-lg'>N/A</p>
              )}
            </div>
          </div>

          {/* Studio */}
          <div className='info-row'>
            <p className='title'>Studio</p>

            <div className='flex flex-wrap gap-4'>
              {anime.studios?.length > 0 ? (
                anime.studios.map((studio) => (
                  <p
                    key={studio.mal_id}
                    className='text-lg text-white bg-light-100/20 py-1 px-2 rounded-lg'
                  >
                    {studio.name}
                  </p>
                ))
              ) : (
                <p className='text-white text-lg'>N/A</p>
              )}
            </div>
          </div>

</div>

      </div>
    </div>
  )
}

export default AnimeModal