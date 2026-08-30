"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovieDetails, fetchSimilarMovies, clearMovieDetails } from "@/store/imdbSlice"
import type { RootState } from "@/store/store"
import Header from "@/components/Header"
import { Loader2, Star, Clock, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MovieDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { movieDetails, similarMovies, loading, error } = useSelector((state: RootState) => state.imdb)

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id as string) as any)
      dispatch(fetchSimilarMovies(id as string) as any)
    }

    return () => {
      dispatch(clearMovieDetails())
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            <p>Error loading movie details: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!movieDetails) {
    return null
  }

  const { title, titleType, year, rating, runtime, genres, plot, image, directors, cast } = movieDetails

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          {/* Hero section with backdrop */}
          <div className="relative h-64 md:h-96 w-full bg-gray-700">
            {image?.url && (
              <Image
                src={image.url || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover opacity-30"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
          </div>

          {/* Content section */}
          <div className="relative -mt-32 md:-mt-48 px-4 md:px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={image?.url || "/placeholder.svg?height=450&width=300"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {year && (
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{year}</span>
                    </div>
                  )}

                  {rating?.aggregate?.value && (
                    <div className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{rating.aggregate.value}/10</span>
                    </div>
                  )}

                  {runtime?.seconds && (
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{Math.floor(runtime.seconds / 60)} min</span>
                    </div>
                  )}

                  {titleType && <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">{titleType}</span>}
                </div>

                {genres?.genres && (
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-400 mb-2 flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {genres.genres.map((genre: any) => (
                        <span key={genre.id} className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                          {genre.text}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {plot?.plotText?.plainText && (
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-400 mb-2">Synopsis</h3>
                    <p className="text-gray-300">{plot.plotText.plainText}</p>
                  </div>
                )}

                {directors?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-400 mb-2">Director{directors.length > 1 ? "s" : ""}</h3>
                    <div className="text-gray-300">
                      {directors.map((director: any, index: number) => (
                        <span key={director.id}>
                          {director.name}
                          {index < directors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cast?.edges?.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Cast</h3>
                    <div className="text-gray-300">
                      {cast.edges.slice(0, 5).map((edge: any, index: number) => (
                        <Link
                          href={`/actor/${edge.node.name.id}`}
                          key={edge.node.name.id}
                          className="hover:text-purple-400 transition-colors"
                        >
                          {edge.node.name.nameText.text}
                          {index < Math.min(cast.edges.length - 1, 4) ? ", " : ""}
                        </Link>
                      ))}
                      {cast.edges.length > 5 && "..."}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {cast?.edges?.length > 0 && (
            <div className="px-4 md:px-8 py-8 border-t border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cast.edges.slice(0, 12).map((edge: any) => (
                  <Link href={`/actor/${edge.node.name.id}`} key={edge.node.name.id}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-105">
                      <div className="relative aspect-[2/3] w-full">
                        <Image
                          src={edge.node.name.primaryImage?.url || "/placeholder.svg?height=450&width=300"}
                          alt={edge.node.name.nameText.text}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-medium text-white truncate">{edge.node.name.nameText.text}</h3>
                        <p className="text-xs text-gray-400 truncate">{edge.node.characters?.[0]?.name || ""}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies Section */}
          {similarMovies?.length > 0 && (
            <div className="px-4 md:px-8 py-8 border-t border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {similarMovies.map((movie: any) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-105">
                      <div className="relative aspect-[2/3] w-full">
                        <Image
                          src={movie.image?.url || "/placeholder.svg?height=450&width=300"}
                          alt={movie.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                        <p className="text-xs text-gray-400">{movie.year}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
