import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NewHero = () => {
  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative px-4 md:px-8 lg:px-16 py-14 lg:py-28">
        {/* Text Content Container */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-24">
          <div className="flex flex-col items-center gap-6">
            {/* Optional: Badge above heading */}
            <div className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-800 mb-4">
              ✨ Welcome to our platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Medium length hero heading goes here
            </h1>

            <p className="text-lg md:text-xl text-center max-w-2xl text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="group px-6 py-3 bg-black text-white border border-black rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                Learn More
              </button>
            </div>

            {/* Optional: Trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200 w-full">
              <p className="text-sm text-gray-500 text-center mb-4">
                Trusted by leading companies
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Images Grid with Parallax Effect */}
        <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[600px] lg:h-[768px]">
          {/* Center Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[300px] md:w-[450px] lg:w-[604px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1733227565/Placeholder_Image_s9jrfa.png"
              alt="Main featured image"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>

          {/* Left Image */}
          <div className="absolute left-0 top-1/3 w-[250px] md:w-[400px] lg:w-[512px] aspect-square rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1733227565/Placeholder_Image_s9jrfa.png"
              alt="Supporting visual"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Image */}
          <div className="absolute right-0 top-1/4 w-[250px] md:w-[400px] lg:w-[512px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1733227565/Placeholder_Image_s9jrfa.png"
              alt="Additional visual"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Optional: Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
    </section>
  );
};

// Add this to your globals.css or equivalent:

export default NewHero;
