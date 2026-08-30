"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Watchify
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your AI-powered movie recommendation companion, designed to help you discover 
            amazing films tailored to your taste and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We believe everyone deserves to find movies they'll truly love. Watchify combines 
              cutting-edge AI technology with a deep understanding of cinema to deliver 
              personalized recommendations that go beyond simple genre matching.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're in the mood for a heartwarming drama, an action-packed thriller, 
              or a thought-provoking documentary, our intelligent system learns your preferences 
              and suggests films that match your current mood and taste.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                AI-powered recommendation engine
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Multi-language movie support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Advanced filtering options
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Personalized user experience
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Real-time movie data
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-gray-800 p-8 rounded-lg mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Next.js", desc: "React Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "Framer Motion", desc: "Animations" },
              { name: "Redux Toolkit", desc: "State Management" },
              { name: "TMDB API", desc: "Movie Data" },
              { name: "IMDB API", desc: "Additional Data" },
              { name: "Vercel", desc: "Deployment" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="font-semibold text-white mb-1">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Developer</h2>
          <div className="bg-gray-800 p-8 rounded-lg max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Raahul Datta</h3>
            <p className="text-gray-300 mb-6">Full Stack Developer & Movie Enthusiast</p>
            <p className="text-gray-300 mb-6">
              Passionate about creating intuitive applications that enhance user experiences. 
              Watchify was born from a love of cinema and a desire to help others discover 
              amazing films they might otherwise miss.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/yourusername"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
