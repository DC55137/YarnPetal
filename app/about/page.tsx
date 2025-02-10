"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Leaf,
  Star,
  Instagram,
  Sparkles,
  MapPin,
  MessageCircle,
  FlowerIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const floatingAnimation = {
  animate: {
    y: [-5, 5, -5],
    rotate: [-3, 3, -3],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-secondary-100 to-secondary-200">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.02]"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dddxwdp7v/image/upload/v1738737751/YarnPetals/LongLogo_gd6oqa.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "300px",
          }}
        />
      </div>

      {/* Hero Section with Enhanced Floating Images */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('/noise.jpg')] opacity-5" />

        {/* Enhanced decorative floating images */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: -12 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-10 right-10 w-48 h-48 hidden lg:block"
        >
          <motion.div
            animate={floatingAnimation.animate}
            transition={floatingAnimation.transition}
            className="relative w-full h-full"
          >
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738740179/YarnPetals/WhatsApp_Image_2025-02-03_at_15.35.19_2_2_aw7kag.jpg"
              alt="Decorative Bouquet"
              fill
              className="object-cover rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-main-500/20 to-transparent rounded-lg" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 12 }}
          animate={{ opacity: 1, y: 0, rotate: 12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-40 left-10 w-40 h-40 hidden lg:block"
        >
          <motion.div
            animate={floatingAnimation.animate}
            transition={floatingAnimation.transition}
            className="relative w-full h-full"
          >
            <Image
              src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1738740178/YarnPetals/WhatsApp_Image_2025-02-03_at_15.35.19_2_vfqwdv.jpg"
              alt="Decorative Bouquet"
              fill
              className="object-cover rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-main-500/20 to-transparent rounded-lg" />
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div className="relative inline-block mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-8 -right-8"
              >
                <Sparkles className="w-8 h-8 text-main-500" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [5, -5, 5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
                className="absolute -bottom-8 -left-8"
              >
                <FlowerIcon className="w-8 h-8 text-accent-500" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-handwriting text-main-600">
                Our Story
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              At Yarn Petals, we craft timeless blooms that create lasting
              memories. Based in the heart of Gold Coast, we&apos;re proud to be
              your local artisans of joy, creating eco-friendly and
              allergy-friendly yarn bouquets that celebrate life&apos;s special
              moments.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Image Gallery Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1738738160/YarnPetals/giftBoyfriend_anvnh1.jpg",
                title: "Timeless Beauty",
                delay: 0.2,
              },
              {
                src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1738740179/YarnPetals/WhatsApp_Image_2025-02-03_at_15.35.19_2_2_aw7kag.jpg",
                title: "Handcrafted with Love",
                delay: 0.3,
              },
              {
                src: "https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg",
                title: "Lasting Memories",
                delay: 0.4,
              },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: image.delay }}
                className="relative group overflow-hidden rounded-lg shadow-xl"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={image.src}
                    alt="Yarn Petals Creation"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="text-white font-handwriting text-2xl transform -rotate-3">
                    {image.title}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Values Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-accent-500" />,
                title: "Sustainability",
                description:
                  "We&apos;re committed to minimizing our environmental impact by using sustainable materials in every bouquet we create. Each bloom represents our dedication to a greener future.",
                delay: 0.2,
              },
              {
                icon: <Star className="w-8 h-8 text-main-500" />,
                title: "Quality & Craftsmanship",
                description:
                  "Each bouquet is crafted with meticulous attention to detail, ensuring both beauty and durability. Our commitment to quality shows in every petal we create.",
                delay: 0.3,
              },
              {
                icon: <Heart className="w-8 h-8 text-main-500" />,
                title: "Memory Making",
                description:
                  "From birthdays to graduations, our bouquets are designed to capture and preserve your special moments, creating lasting memories that you can cherish forever.",
                delay: 0.4,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: value.delay }}
                className="bg-white p-8 rounded-lg shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Local Section */}
      <section className="py-16 bg-main-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-6 -left-6"
                >
                  <Sparkles className="w-8 h-8 text-main-500" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-handwriting text-main-600">
                  Locally Crafted with Love
                </h2>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-main-500" />
                <span>Gold Coast, Australia</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                As a proud Gold Coast business, we pour our hearts into every
                creation. Each bouquet is handcrafted in-house with careful
                attention to detail, ensuring that every arrangement meets our
                high standards and exceeds your expectations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We celebrate life&apos;s precious moments - from birthdays and
                graduations to Mother&apos;s Day celebrations - with bouquets
                that stand the test of time, creating lasting memories for you
                and your loved ones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl transform group hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="https://res.cloudinary.com/dddxwdp7v/image/upload/v1716298927/YarnPetals/DSCF0752_psr0md.jpg"
                  alt="Our Workshop"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-main-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              y: [-10, 10, -10],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-main-100 rounded-full blur-3xl opacity-50"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-100 rounded-full blur-3xl opacity-50"
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <MessageCircle className="w-12 h-12 text-main-500" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-main-200 rounded-full -z-10 blur-lg"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-handwriting text-main-600 mb-6 relative">
                Get in Touch
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -right-8 -top-4"
                >
                  <Heart className="w-6 h-6 text-main-400" />
                </motion.div>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Have a special request or want to learn more about our bouquets?
                Follow us on Instagram for the latest updates and reach out with
                any questions - we&apos;d love to hear from you!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="https://www.instagram.com/yarn.petals.gc/"
                target="_blank"
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-main-400 to-main-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button className="relative px-8 py-6 text-lg bg-main-500 hover:bg-main-600 transition-all duration-300 flex items-center gap-2 group-hover:gap-4 group-hover:scale-105">
                  Follow Us on Instagram
                  <Instagram className="w-5 h-5 transition-all duration-300" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
