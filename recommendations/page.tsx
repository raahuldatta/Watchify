"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MovieList from "@/components/MovieList";
import RecommendationForm from "@/components/RecommendationForm";

export default function RecommendationsPage() {
  const [hasSelection, setHasSelection] = useState(false);

  return (
    <div className="min-h-screen py-20 px-6 relative">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
              Get Movie Recommendations
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Get personalized movie recommendations powered by Watchify.
          </motion.p>
        </motion.div>

        {/* Recommendation Form */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <RecommendationForm onSelectionMade={setHasSelection} />
        </motion.div>

        {/* Movie List */}
        {hasSelection && <MovieList />}
      </div>
    </div>
  );
}
