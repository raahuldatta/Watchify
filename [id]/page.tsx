"use client"

import { useEffect, useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { fetchPersonDetails, clearPersonDetails } from "@/store/tmdbSlice"
import type { RootState } from "@/store/store"
import Header from "@/components/Header"
import {
  Loader2,
  Calendar,
  Award,
  Film,
  Star,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Trophy,
  User,
  Sparkles,
  Medal,
  ChevronDown,
  ChevronUp,
  Globe,
  Share2,
  Heart,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ActorDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { personDetails, loading, error } = useSelector((state: RootState) => state.tmdb)

  const [activeTab, setActiveTab] = useState<"awards" | "bio" | "movies">("awards")
  const [awardFilter, setAwardFilter] = useState<"all" | "major" | "festivals" | "critics">("all")
  const [isBioExpanded, setIsBioExpanded] = useState(false)
  const [movieSort, setMovieSort] = useState<"popularity" | "year" | "rating">("popularity")
  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonDetails({ id: id as string }) as any)
    }

    return () => {
      dispatch(clearPersonDetails())
    }
  }, [dispatch, id])

  const calculateAge = (birthday: string, deathday: string | null) => {
    if (!birthday) return null
    const birth = new Date(birthday)
    const end = deathday ? new Date(deathday) : new Date()
    let age = end.getFullYear() - birth.getFullYear()
    const m = end.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: personDetails?.name ? `${personDetails.name} - Bio & Awards | Watchify` : "Watchify Actor",
          url: window.location.href,
        })
      } catch (err) {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const castMovies = useMemo(() => {
    const cast = personDetails?.movie_credits?.cast || []
    return [...cast].sort((a: any, b: any) => {
      if (movieSort === "popularity") {
        return (b.popularity || 0) - (a.popularity || 0)
      }
      if (movieSort === "rating") {
        return (b.vote_average || 0) - (a.vote_average || 0)
      }
      const yearA = a.release_date ? new Date(a.release_date).getFullYear() : 0
      const yearB = b.release_date ? new Date(b.release_date).getFullYear() : 0
      return yearB - yearA
    })
  }, [personDetails, movieSort])

  const filteredAwards = useMemo(() => {
    const awards = personDetails?.awards || []
    if (awardFilter === "all") return awards
    if (awardFilter === "major") {
      return awards.filter((a: any) => a.isMajor)
    }
    if (awardFilter === "festivals") {
      return awards.filter((a: any) => a.category?.includes("Festival") || a.category?.includes("Film Award"))
    }
    if (awardFilter === "critics") {
      return awards.filter((a: any) => a.category?.includes("Critics") || a.category?.includes("Guild") || a.category?.includes("Other"))
    }
    return awards
  }, [personDetails, awardFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center pt-20">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { repeat: Infinity, duration: 1.5 } }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <Trophy className="w-8 h-8 text-yellow-400 absolute inset-0 m-auto" />
        </motion.div>
        <p className="text-gray-300 mt-6 text-lg font-medium animate-pulse">Loading Actor Bio Data & Awards...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 text-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-gray-900 border border-red-500/40 rounded-2xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Actor Profile</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!personDetails) {
    return null
  }

  const {
    name,
    biography,
    birthday,
    deathday,
    place_of_birth,
    profile_path,
    known_for_department,
    popularity,
    also_known_as,
    gender,
    imdb_id,
    homepage,
    awards = [],
    awardHighlights = "",
    awardStats = {},
    wikiSummary = "",
  } = personDetails

  const age = calculateAge(birthday, deathday)
  const profileUrl = profile_path ? `https://image.tmdb.org/t/p/h632${profile_path}` : "/placeholder.svg?height=600&width=400"
  const genderText = gender === 1 ? "Female" : gender === 2 ? "Male" : gender === 3 ? "Non-binary" : "Not specified"

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 pb-16 selection:bg-purple-500 selection:text-white">
      <Header />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation & Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-800 px-4 py-2 rounded-xl transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-xl border transition-all ${
                isLiked
                  ? "bg-red-500/20 border-red-500/40 text-red-400"
                  : "bg-gray-900/80 hover:bg-gray-800 border-gray-800 text-gray-400 hover:text-white"
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl text-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Link Copied!" : "Share Profile"}</span>
            </button>
          </div>
        </div>

        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-900/40 border border-gray-800 backdrop-blur-xl p-6 md:p-8 shadow-2xl mb-10 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Profile Poster */}
            <div className="relative group flex-shrink-0">
              <div className="w-56 sm:w-64 aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-colors">
                <Image
                  src={profileUrl}
                  alt={name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 224px, 256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-purple-200 font-medium">{known_for_department || "Actor"}</span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {known_for_department || "Acting"}
                </span>

                {awards.length > 0 && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    {awards.length} Awards & Honors
                  </span>
                )}

                {popularity && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Popularity: {popularity.toFixed(1)}
                  </span>
                )}
              </div>

              {/* Full Name */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-purple-300 mb-4 tracking-tight">
                {name}
              </h1>

              {/* Bio Accolades Highlight Snippet */}
              {awardHighlights && (
                <div className="bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-transparent border-l-4 border-yellow-400 p-4 rounded-r-xl mb-6 text-left">
                  <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    Career Accolades Highlight
                  </div>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic">
                    "{awardHighlights}"
                  </p>
                </div>
              )}

              {/* Key Bio Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {/* Born / Age */}
                <div className="bg-gray-800/60 border border-gray-700/60 p-3.5 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>Birthday & Age</span>
                  </div>
                  <div className="font-semibold text-white text-sm truncate">
                    {birthday ? new Date(birthday).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                  </div>
                  {age !== null && (
                    <div className="text-xs text-purple-400 font-medium">
                      {deathday ? `Lived to ${age}` : `${age} years old`}
                    </div>
                  )}
                </div>

                {/* Birthplace */}
                <div className="bg-gray-800/60 border border-gray-700/60 p-3.5 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>Birthplace</span>
                  </div>
                  <div className="font-semibold text-white text-sm truncate" title={place_of_birth || "N/A"}>
                    {place_of_birth || "N/A"}
                  </div>
                  <div className="text-xs text-gray-400">{genderText}</div>
                </div>

                {/* Total Awards */}
                <div className="bg-gray-800/60 border border-gray-700/60 p-3.5 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Major Trophies</span>
                  </div>
                  <div className="font-bold text-yellow-400 text-base">
                    {awardStats.majorCount || awards.filter((a: any) => a.isMajor).length || awards.length} Wins
                  </div>
                  <div className="text-xs text-gray-400">
                    {awardStats.oscars ? `${awardStats.oscars} Oscar(s)` : `${awards.length} Total Awards`}
                  </div>
                </div>

                {/* Total Credits */}
                <div className="bg-gray-800/60 border border-gray-700/60 p-3.5 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                    <Film className="w-3.5 h-3.5 text-green-400" />
                    <span>Filmography</span>
                  </div>
                  <div className="font-bold text-white text-base">
                    {castMovies.length} Titles
                  </div>
                  <div className="text-xs text-purple-400 font-medium">Starring Roles</div>
                </div>
              </div>

              {/* External Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {imdb_id && (
                  <a
                    href={`https://www.imdb.com/name/${imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5C518] hover:bg-[#E5B508] text-black font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>IMDb Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <a
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, "_"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-medium rounded-lg transition-colors"
                >
                  <Globe className="w-3 h-3 text-blue-400" />
                  <span>Wikipedia Bio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium rounded-lg transition-colors"
                  >
                    <span>Official Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prestigious Awards Highlights Banner */}
        {awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Oscars */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-yellow-900/30 to-amber-950/20 border border-yellow-500/30 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-yellow-300">{awardStats.oscars || 0}</div>
                  <div className="text-xs text-yellow-200/80 font-medium">Academy Awards</div>
                </div>
              </div>

              {/* Golden Globes */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-900/30 to-yellow-950/20 border border-amber-500/30 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                  <Medal className="w-6 h-6 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-amber-300">{awardStats.goldenGlobes || 0}</div>
                  <div className="text-xs text-amber-200/80 font-medium">Golden Globes</div>
                </div>
              </div>

              {/* BAFTAs */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-purple-900/30 to-indigo-950/20 border border-purple-500/30 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-purple-300">{awardStats.baftas || 0}</div>
                  <div className="text-xs text-purple-200/80 font-medium">BAFTA Awards</div>
                </div>
              </div>

              {/* SAG Awards */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-900/30 to-cyan-950/20 border border-blue-500/30 flex items-center gap-3 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-blue-300">{awardStats.sag || 0}</div>
                  <div className="text-xs text-blue-200/80 font-medium">SAG Awards</div>
                </div>
              </div>

              {/* Total International Honors */}
              <div className="rounded-2xl p-4 bg-gradient-to-br from-pink-900/30 to-rose-950/20 border border-pink-500/30 flex items-center gap-3 shadow-lg col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-pink-300">{awards.length}</div>
                  <div className="text-xs text-pink-200/80 font-medium">Total Accolades</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 mb-8 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("awards")}
            className={`pb-4 px-6 font-semibold text-sm sm:text-base flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "awards"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Awards & Accolades ({awards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("bio")}
            className={`pb-4 px-6 font-semibold text-sm sm:text-base flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "bio"
                ? "border-purple-400 text-purple-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Biography & Full Bio Data</span>
          </button>

          <button
            onClick={() => setActiveTab("movies")}
            className={`pb-4 px-6 font-semibold text-sm sm:text-base flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "movies"
                ? "border-blue-400 text-blue-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Filmography ({castMovies.length})</span>
          </button>
        </div>

        {/* TAB 1: AWARDS & ACCOLADES */}
        {activeTab === "awards" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Award Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAwardFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    awardFilter === "all"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  All Accolades ({awards.length})
                </button>
                <button
                  onClick={() => setAwardFilter("major")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    awardFilter === "major"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Major Honors ({awards.filter((a: any) => a.isMajor).length})
                </button>
                <button
                  onClick={() => setAwardFilter("festivals")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    awardFilter === "festivals"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Film Festival Awards
                </button>
                <button
                  onClick={() => setAwardFilter("critics")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    awardFilter === "critics"
                      ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Critics & Guilds
                </button>
              </div>

              <div className="text-xs text-gray-400">
                Verified records from Wikidata & Wikipedia archives
              </div>
            </div>

            {/* Awards Grid */}
            {filteredAwards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAwards.map((award: any, index: number) => {
                  const isGold = award.isMajor
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ y: -4 }}
                      className={`relative rounded-2xl p-5 border transition-all shadow-lg flex flex-col justify-between ${
                        isGold
                          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-950/20 border-yellow-500/40 hover:border-yellow-400 hover:shadow-yellow-500/10"
                          : "bg-gray-900/90 border-gray-800 hover:border-purple-500/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isGold ? "bg-yellow-500/20 text-yellow-400" : "bg-purple-500/20 text-purple-400"
                              }`}
                            >
                              <Trophy className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                              {award.category}
                            </span>
                          </div>

                          {award.year && (
                            <span className="text-sm font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/20">
                              {award.year}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white mb-2 leading-snug">
                          {award.name}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                        <span>Recipient: <strong className="text-gray-200">{name}</strong></span>
                        {isGold && <span className="text-yellow-400 font-semibold">★ Prestigious Win</span>}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
                <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No awards recorded under this filter</h3>
                <p className="text-sm text-gray-400">
                  Try viewing "All Accolades" or check the biography tab for career honors.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: BIOGRAPHY & FULL BIO DATA */}
        {activeTab === "bio" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left: Biography Narrative */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Biography & Life Story</h2>
                </div>

                {biography || wikiSummary ? (
                  <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
                    {(() => {
                      const bioText = biography || wikiSummary
                      const paragraphs = bioText.split("\n\n").filter(Boolean)
                      const displayParagraphs = isBioExpanded ? paragraphs : paragraphs.slice(0, 3)

                      return (
                        <>
                          {displayParagraphs.map((p: string, idx: number) => (
                            <p key={idx}>{p}</p>
                          ))}

                          {paragraphs.length > 3 && (
                            <button
                              onClick={() => setIsBioExpanded(!isBioExpanded)}
                              className="mt-4 inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
                            >
                              {isBioExpanded ? (
                                <>
                                  <span>Show Less</span>
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  <span>Read Full Biography ({paragraphs.length - 3} more paragraphs)</span>
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </>
                      )
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No detailed biography is currently available for this actor.</p>
                )}
              </div>

              {/* Wikipedia Career Summary if available */}
              {wikiSummary && biography && (
                <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" /> Wikipedia Career Summary
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{wikiSummary}</p>
                </div>
              )}
            </div>

            {/* Right: Personal Bio Data Table */}
            <div className="space-y-6">
              <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Personal Information
                </h3>

                <div className="divide-y divide-gray-800 space-y-4">
                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Official Name</span>
                    <span className="text-sm font-semibold text-white text-right">{name}</span>
                  </div>

                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Known For</span>
                    <span className="text-sm font-semibold text-purple-300 text-right">{known_for_department || "Acting"}</span>
                  </div>

                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Gender</span>
                    <span className="text-sm font-semibold text-white text-right">{genderText}</span>
                  </div>

                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Birth Date</span>
                    <span className="text-sm font-semibold text-white text-right">
                      {birthday ? new Date(birthday).toLocaleDateString("en-US", { dateStyle: "long" }) : "N/A"}
                    </span>
                  </div>

                  {age !== null && (
                    <div className="pt-3 flex justify-between items-start gap-4">
                      <span className="text-sm text-gray-400">Age / Status</span>
                      <span className="text-sm font-semibold text-purple-400 text-right">
                        {deathday ? `Deceased (Aged ${age})` : `${age} Years Old`}
                      </span>
                    </div>
                  )}

                  {deathday && (
                    <div className="pt-3 flex justify-between items-start gap-4">
                      <span className="text-sm text-gray-400">Died</span>
                      <span className="text-sm font-semibold text-red-400 text-right">
                        {new Date(deathday).toLocaleDateString("en-US", { dateStyle: "long" })}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Place of Birth</span>
                    <span className="text-sm font-semibold text-white text-right">{place_of_birth || "N/A"}</span>
                  </div>

                  <div className="pt-3 flex justify-between items-start gap-4">
                    <span className="text-sm text-gray-400">Known Works</span>
                    <span className="text-sm font-semibold text-white text-right">{castMovies.length} Movies</span>
                  </div>
                </div>
              </div>

              {/* Also Known As */}
              {also_known_as && also_known_as.length > 0 && (
                <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-3">Alternative Names</h3>
                  <div className="flex flex-wrap gap-2">
                    {also_known_as.slice(0, 8).map((alias: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-full"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: COMPLETE FILMOGRAPHY */}
        {activeTab === "movies" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Filmography Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 p-4 rounded-2xl">
              <div className="text-sm font-semibold text-white">
                All Appearances & Roles ({castMovies.length} Titles)
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort by:</span>
                <button
                  onClick={() => setMovieSort("popularity")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    movieSort === "popularity" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Popularity
                </button>
                <button
                  onClick={() => setMovieSort("rating")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    movieSort === "rating" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Top Rated
                </button>
                <button
                  onClick={() => setMovieSort("year")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    movieSort === "year" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Release Date
                </button>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {castMovies.map((movie: any, index: number) => {
                const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null
                const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null
                const poster = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : "/placeholder.svg?height=450&width=300"

                return (
                  <motion.div
                    key={movie.id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
                    whileHover={{ y: -6 }}
                  >
                    <Link href={`/tmdb-movie/${movie.id}`} className="block h-full group">
                      <div className="bg-gray-900 border border-gray-800 group-hover:border-purple-500/50 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col transition-all">
                        {/* Poster */}
                        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
                          <Image
                            src={poster}
                            alt={movie.title || "Movie poster"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                          />
                          {rating && rating !== "0.0" && (
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 text-[11px] font-bold text-yellow-400">
                              <Star className="w-3 h-3 fill-yellow-400" />
                              <span>{rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Title & Role */}
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                              {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                              {movie.character ? `as ${movie.character}` : "Cast"}
                            </p>
                          </div>

                          <div className="mt-2 pt-2 border-t border-gray-800 text-[11px] text-gray-400 flex items-center justify-between">
                            <span>{year || "N/A"}</span>
                            <span className="text-purple-400 font-medium group-hover:underline">Details →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

