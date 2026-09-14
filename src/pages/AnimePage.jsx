import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import AnimeDescription from '../components/AnimeDescription';
import Spinner from '../components/Spinner';

const AnimePage = () => {

  const { id } = useParams();

    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

      const fetchAnime = async() => {
        try {
          const response = await fetch(`/api/anime/${id}`)

          if (!response.ok) {
            setIsLoading(false);
            throw new Error('Failed to fetch anime');
          }

          const data = await response.json();

          if (!data.data) {
            throw new Error('No anime found');
          }

          setAnime(data.data);

        } catch (error) {
          console.error(error);
          setAnime(null)
        } finally {
          setIsLoading(false);
        }
      };

      fetchAnime();
    }, [id]);

    if (isLoading) {
      return (
      <main className="anime-page">
        <div className="anime-container h-screen">
          <p className='text-white'>Loading anime information...</p>
          <Spinner />
        </div>
      </main>
    )
    }

    if (!anime) {
      return (
        <main className="anime-page">
          <div className="anime-container">
            <p className="text-red-500">Anime not found.</p>
          </div>
       </main>
      );
    }

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
    <>
      
      <Helmet>
        <title>{anime.title} - Animepedia</title>

        <meta
          name="description"
          content={
            anime.synopsis
              ? anime.synopsis.slice(0, 160)
              : `Learn more about ${anime.title} on Animepedia.`
          }
        />

        <link
          rel="canonical"
          href={`https://react-vert-theta.vercel.app/anime/${anime.mal_id}`}
        />

        <meta
          property="og:title"
          content={`${anime.title} - Animepedia`}
        />

        <meta
          property="og:description"
          content={
            anime.synopsis ||
            `Learn more about ${anime.title} on Animepedia.`
          }
        />

        <meta
          property="og:url"
          content={`https://react-vert-theta.vercel.app/anime/${anime.mal_id}`}
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content={
            anime.images?.webp?.large_image_url ||
            anime.images?.webp?.image_url ||
            anime.images?.jpg?.large_image_url
          }
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={`${anime.title} - Animepedia`}
        />

        <meta
          name="twitter:description"
          content={
            anime.synopsis ||
            `Learn more about ${anime.title} on Animepedia.`
          }
        />

        <meta
          name="twitter:image"
          content={
            anime.images?.webp?.large_image_url ||
            anime.images?.webp?.image_url ||
            anime.images?.jpg?.large_image_url
          }
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TVSeries',
            name: anime.title_english || anime.title,
            description: anime.synopsis || '',
            image:
              anime.images?.webp?.large_image_url ||
              anime.images?.webp?.image_url ||
              anime.images?.jpg?.large_image_url,
            numberOfEpisodes: anime.episodes || undefined,
            genre: anime.genres?.map((genre) => genre.name) || [],
            datePublished: anime.aired?.from || undefined,

            aggregateRating:
              anime.score && anime.scored_by
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: anime.score,
                    ratingCount: anime.scored_by,
                    bestRating: 10,
                    worstRating: 1,
                  }
                : undefined,
          })}
        </script>
      </Helmet>



      <main className='anime-page'>
          <div className='anime-container'>
        
            <button
              onClick={() => window.history.back()}
              className='flex items-center gap-2 self-start text-white'
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            {/* Title */}
            <div className='flex flex-col items-start md:flex-row md:items-center md:justify-around'>
              <h2>{anime.title_english || anime.title}</h2>

              <div className='flex justify-center items-center bg-light-100/20 px-4 py-2 rounded-lg'>
                <img src="/Rating.svg" alt="Rating star" />
                <p className='text-light-100'><span className='text-light-100 text-lg font-bold ml-2'>{anime.score ? anime.score : (<p className='text-white text-lg'>N/A</p>)}</span>/10</p>
              </div>
            </div>
            {/* Details */}
            <div className='text-gray-100 my-4'>
              <p>{anime.aired?.from?.split('-')[0] || 'N/A'} ● {anime.rating.split(' ')[0] || 'N/A'} ● {anime.episodes? anime.episodes : 'No'} Episodes</p>
        
            </div>
            {/* Image and trailer */}
            <div className='media-display mb-6'>
              {/* Image */}
              <div className='w-full h-full flex justify-center'>
                {
                  anime.images.webp.image_url ?
                  (<img src={anime.images.webp.image_url} alt='Poster image' />) :
                  anime.images.jpg.image_url ?
                  (<img src={anime.images.jpg.image_url} alt='Poster image' />) :
                  (<img src='/no-poster.avif' alt='No image' />)
                }
              </div>
              {/* Trailer */}
              <div className='rounded-lg w-full'>
                {
                  anime.trailer.embed_url ?
                  (<iframe className='w-full aspect-video h-full object-cover' src={anime.trailer.embed_url} title={`${anime.title} trailer`} />) :
                  anime.trailer.url ?
                  (<a href={anime.trailer.url} target='_blank' rel='noopener noreferrer'>
                    <img src={anime.trailer.images.image_url} className='w-full h-full object-cover' />
                  </a>) :
                  (<img src='/no-video.avif' alt='No video'/>)
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
      </main>
    </>  
  )
}

export default AnimePage