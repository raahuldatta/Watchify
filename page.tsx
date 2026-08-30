"use client"

import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import MovieList from "@/components/MovieList"

export default function HomePage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <MovieList />
    </motion.div>
  )
}
