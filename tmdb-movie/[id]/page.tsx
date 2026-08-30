"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { fetchMovieDetails } from "@/store/tmdbSlice"
import type { RootState } from "@/store/store"
import Header from "@/components/Header"
import ReviewBox from "@/components/ReviewBox"
import { Loader2, Star, Clock, Calendar, Tag, Play, Heart, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TMDbMovieDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { movieDetails, similarMovies, loading, error } = useSelector((state: RootState) => state.tmdb)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails({ id: id as string }) as any)
    }
  }, [dispatch, id])

  useEffect(() => {
    if (movieDetails && !loading) {
      setIsLoaded(true)
    }
  }, [movieDetails, loading])

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-6 relative">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-12 text-center">
            <motion.div
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-300">Loading movie details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 px-6 relative">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!movieDetails) {
    return null
  }

  const { title, release_date, vote_average, runtime, genres, overview, poster_path, backdrop_path, credits } = movieDetails

  const directors = credits?.crew?.filter((person: any) => person.job === "Director") || []
  const cast = credits?.cast || []
  const year = release_date ? new Date(release_date).getFullYear() : null
  const rating = vote_average ? vote_average / 2 : null

  const posterUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder-movie.jpg"
  
  const backdropUrl = backdrop_path 
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "/placeholder-backdrop.jpg"

  return (
    <div className="min-h-screen relative">
      {/* Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 15
          }}
        />
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Movies</span>
          </motion.button>

          {/* Movie Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Poster */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg overflow-hidden">
                <div className="aspect-[2/3] relative group">
                  <img
                    src={posterUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Movie Details */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-8">
                {/* Title and Rating */}
                <div className="mb-6">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {title}
                  </motion.h1>
                  
                  <div className="flex items-center gap-6 text-gray-300 mb-4">
                    {rating && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{rating.toFixed(1)}/5</span>
                      </div>
                    )}
                    {year && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{year}</span>
                      </div>
                    )}
                    {runtime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(runtime / 60)}h {runtime % 60}m</span>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {genres && genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {genres.map((genre: { id: number; name: string }) => (
                        <motion.span
                          key={genre.id}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {genre.name}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview */}
                {overview && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {overview}
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button className="px-8 py-3 text-lg font-semibold">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Now
                  </button>
                  <button className="p-3 glass-button rounded-full">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 glass-button rounded-full">
                    <Share2 className="w-5 h-5" />
                  </button>
                </motion.div>

                {/* Additional Details */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {/* Directors */}
                  {directors.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Director{directors.length > 1 ? "s" : ""}</h4>
                      <div className="space-y-2">
                        {directors.slice(0, 3).map((director: any, index: number) => (
                          <Link
                            key={director.id || index}
                            href={`/actor/${director.id}`}
                            className="block text-gray-300 hover:text-purple-400 transition-colors font-medium"
                          >
                            {director.name} <span className="text-xs text-purple-400 font-normal">→ View Bio</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cast */}
                  {cast.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Cast</h4>
                      <div className="flex flex-wrap gap-2">
                        {cast.slice(0, 6).map((actor: any) => (
                          <Link
                            key={actor.id}
                            href={`/actor/${actor.id}`}
                            className="px-2.5 py-1 bg-white/10 hover:bg-purple-600/30 hover:border-purple-400 border border-transparent text-gray-300 hover:text-white rounded text-sm transition-all"
                          >
                            {actor.name}
                          </Link>
                        ))}
                        {cast.length > 6 && (
                          <span className="px-2 py-1 text-gray-400 text-sm">+{cast.length - 6} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Cast Section */}
          {cast && cast.length > 0 && (
            <motion.section
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Cast</h2>
                  <span className="text-xs text-purple-400 font-medium bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Click any actor to view full bio & awards 🏆
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <AnimatePresence>
                    {cast.slice(0, 12).map((actor: any, index: number) => (
                      <motion.div
                        key={actor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link href={`/actor/${actor.id}`} className="block h-full">
                          <div className="rounded-xl bg-gray-900 border border-gray-700 hover:border-purple-500/50 shadow-lg overflow-hidden group h-full flex flex-col transition-colors">
                            <div className="relative aspect-[2/3] w-full overflow-hidden">
                              <Image
                                src={
                                  actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                    : "/placeholder.svg?height=450&width=300"
                                }
                                alt={actor.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                <span className="text-[11px] text-purple-300 font-medium bg-purple-900/80 px-2 py-0.5 rounded w-full text-center">
                                  View Bio & Awards 🏆
                                </span>
                              </div>
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between">
                              <h3 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                                {actor.name}
                              </h3>
                              <p className="text-xs text-gray-400 truncate">{actor.character || "Cast"}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}

          {/* Similar Movies Section */}
          {similarMovies?.length > 0 && (
            <motion.section
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <AnimatePresence>
                    {similarMovies.map((movie, index) => (
                      <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link href={`/tmdb-movie/${movie.id}`}>
                          <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-lg overflow-hidden group">
                            <div className="relative aspect-[2/3] w-full">
                              <Image
                                src={
                                  movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                                    : "/placeholder.svg?height=450&width=300"
                                }
                                alt={movie.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                              />
                            </div>
                            <div className="p-3">
                              <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                              <p className="text-xs text-gray-400">
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewBox movieId={id as string} movieTitle={title} />
    </div>
  )
}
