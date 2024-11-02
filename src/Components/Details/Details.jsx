import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Details() {
  const { id } = useParams();

  // Fetch movie details
  const getMoviesDetail = () =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c`
    );
  const getSeriesDetail = () =>
    axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c`
    );
  // Fetch actors (credits)
  const getActors = () =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7ed0dce7265e624dc38e6c0da1a5ad4c`
    );

  // Queries for movie and actors data
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["DetailsMovies", id],
    queryFn: getMoviesDetail,
  });

  const {
    data: tvData,
    isError: istvError,
    isLoading: isTvLoading,
    error: TvError,
  } = useQuery({
    queryKey: ["TV", id],
    queryFn: getSeriesDetail,
  });

  const {
    data: actorsData,
    isError: isActorsError,
    isLoading: isActorsLoading,
    error: actorsError,
  } = useQuery({
    queryKey: ["Actors", id],
    queryFn: getActors,
  });

  // Loading and error handling
  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );
  if (isActorsLoading)
    return (
      <p>
        <Loader />
      </p>
    );
  if (isError) return <p>Error loading movie: {error.message}</p>;
  if (isActorsError) return <p>Error loading actors: {actorsError.message}</p>;

  const movie = data?.data;
  const actors = actorsData?.data?.cast; // Accessing cast from actors data

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center space-x-4 mb-6">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="w-48 h-auto rounded-lg shadow-md mb-4 md:mb-0"
          />
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              {movie.title}
            </h1>
            <p className="text-lg text-gray-300 italic">{movie.tagline}</p>
            <p className="text-sm text-gray-400 mt-1">
              {movie.release_date} • {movie.runtime} min
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="my-6">
          <h2 className="text-2xl font-semibold text-yellow-400">Overview</h2>
          <p className="text-gray-300 mt-2 leading-relaxed">{movie.overview}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Genres */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Genres</h3>
            <ul className="text-gray-300 mt-2">
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>

          {/* Production Companies */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">
              Production
            </h3>
            <ul className="text-gray-300 mt-2">
              {movie.production_companies.map((company) => (
                <li key={company.id}>
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={company.name}
                      className="w-16 h-auto my-2"
                    />
                  ) : (
                    <span>{company.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Details</h3>
            <ul className="text-gray-300 mt-2">
              <li>
                <strong>Language:</strong> {movie.original_language}
              </li>
              <li>
                <strong>Country:</strong>{" "}
                {movie.production_countries.map((c) => c.name).join(", ")}
              </li>
              <li>
                <strong>IMDB:</strong>{" "}
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  className="text-yellow-400 hover:underline"
                >
                  Link
                </a>
              </li>
              <li>
                <strong>Budget:</strong> $
                {movie.budget
                  ? `${Math.floor(movie.budget / 1_000_000)}M`
                  : "0M"}
              </li>
              <li>
                <strong>Revenue:</strong> $
                {movie.revenue
                  ? `${Math.floor(movie.revenue / 1_000_000)}M`
                  : "0M"}
              </li>
            </ul>
          </div>
        </div>

        {/* Ratings and Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-yellow-400">Ratings</h2>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold text-yellow-500">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Actors Section */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold text-yellow-400">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {actors?.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-md"
            >
              {/* Actor Image */}
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full shadow-lg mb-2"
              />
              {/* Actor Name */}
              <h3 className="text-lg font-semibold text-yellow-400 text-center">
                {actor.name}
              </h3>
              {/* Actor Role */}
              <p className="text-gray-300 text-sm italic text-center">
                {actor.character}
              </p>
              {/* Additional Detail (optional) */}
              <p className="text-gray-400 text-xs text-center mt-1">
                Popularity: {actor.popularity.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
