"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Check,
  Clock,
  Heart,
  Palette,
  PawPrint,
  Sparkles,
  Stars,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ValentinesHero() {
  return (
    <div className="relative overflow-hidden bg-pink-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-secondary-500" />
      <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5" />

      {/* Main content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left content section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 z-10 pt-20"
          >
            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-main-600 leading-tight">
                Create Your
                <span className="font-handwriting text-main-500 ml-2">
                  Perfect
                </span>
                <br />
                Bouquet Today
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Personalize every detail in three simple steps
              </p>
            </motion.div>

            {/* Customization steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              {[
                {
                  step: 1,
                  title: "Pick Your Colors",
                  description:
                    "Start with your favorite colors or match your theme",
                  icon: Palette,
                },
                {
                  step: 2,
                  title: "Choose Your Flowers",
                  description: "Select from roses, daisies, sunflowers & more",
                  icon: Heart,
                },
                {
                  step: 3,
                  title: "Add a Special Friend",
                  description:
                    "Make it unique with an adorable animal addition",
                  icon: PawPrint,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 group bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-secondary-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-main-100 text-main-600 flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-main-600 flex items-center gap-2">
                      {item.title}
                      <item.icon className="w-4 h-4 text-main-400" />
                    </h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative mb-6"
            >
              <a href="/create" className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-main-400 to-main-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button className="relative px-8 py-6 text-lg bg-main-500 hover:bg-main-600 text-white transition-all duration-200 flex items-center gap-3 group-hover:gap-5">
                  Start Creating
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Palette className="w-5 h-5" />
                  </motion.div>
                </Button>
              </a>
            </motion.div>

            {/* Features tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <Stars className="w-4 h-4 text-main-400" />
              Handcrafted with love - Lasting forever
            </motion.div>
          </motion.div>

          {/* Right section with scattered images */}
          <div className="lg:w-7/12 relative min-h-[700px] pt-10 w-full">
            <div className="relative w-full h-full">
              {/* Main center image */}
              <motion.div
                initial={{ opacity: 0, rotate: -5, y: 20 }}
                animate={{ opacity: 1, rotate: -5, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute lg:left-1/2 lg:top-1/2 left-0 -top-20 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 w-80 lg:w-auto"
              >
                <div className="bg-white p-4 rounded-lg shadow-xl transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738738160/YarnPetals/giftBoyfriend_anvnh1.jpg"
                      alt="Gift for Loved Ones"
                      width={400}
                      height={300}
                      className="rounded object-cover w-full h-[220px] lg:w-[300px] lg:h-[220px] transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center mt-3 font-handwriting text-gray-600">
                    The perfect gift
                  </p>
                </div>
              </motion.div>

              {/* Top image */}
              <motion.div
                initial={{ opacity: 0, rotate: 8, y: 20 }}
                animate={{ opacity: 1, rotate: 8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute lg:left-0 lg:top-0 left-1/2 top-40 z-10 w-80 lg:w-auto"
              >
                <div className="bg-white p-3 rounded-lg shadow-lg transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738740179/YarnPetals/WhatsApp_Image_2025-02-03_at_15.35.19_2_2_aw7kag.jpg"
                      alt="Valentine's Day Special"
                      width={300}
                      height={220}
                      className="rounded object-cover w-full h-[220px] lg:w-[300px] lg:h-[220px] transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center mt-3 font-handwriting text-gray-600">
                    Made with love
                  </p>
                </div>
              </motion.div>

              {/* Bottom right image */}
              <motion.div
                initial={{ opacity: 0, rotate: -8, y: 20 }}
                animate={{ opacity: 1, rotate: -8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden lg:block absolute lg:right-0 lg:bottom-[140px] right-0 top-[320px] z-10 w-80 lg:w-auto"
              >
                <div className="bg-white p-3 rounded-lg shadow-lg transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738740178/YarnPetals/WhatsApp_Image_2025-02-03_at_15.35.19_2_vfqwdv.jpg"
                      alt="Love Flower"
                      width={320}
                      height={240}
                      className="rounded object-cover w-full h-[200px] lg:w-[280px] lg:h-[200px] transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center mt-3 font-handwriting text-gray-600">
                    Forever yours
                  </p>
                </div>
              </motion.div>

              {/* Bottom left image */}
              <motion.div
                initial={{ opacity: 0, rotate: 12, y: 20 }}
                animate={{ opacity: 1, rotate: 12, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute lg:left-20 lg:bottom-[140px] left-0 top-[320px] z-10 w-80 lg:w-auto"
              >
                <div className="bg-white p-3 rounded-lg shadow-lg transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                  <div className="rounded overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738737755/YarnPetals/ValentinesDay_vqnwei.jpg"
                      alt="Valentine's Day Mood"
                      width={280}
                      height={200}
                      className="rounded object-cover w-full h-[200px] lg:w-[280px] lg:h-[200px] transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center mt-3 font-handwriting text-gray-600">
                    Timeless beauty
                  </p>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute top-40 right-40 hidden lg:block"
              >
                <Heart className="text-pink-400 w-8 h-8 fill-current" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
                className="absolute bottom-20 right-20 hidden lg:block"
              >
                <Stars className="text-pink-300 w-6 h-6" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
