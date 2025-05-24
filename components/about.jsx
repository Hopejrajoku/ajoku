'use client'

import React from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Button } from './ui/button'

const AboutSection = () => {

  const handleNavigate = () => {
    // Navigate to the dashboard or any other page
    window.location.href = '/#services'
  }
  return (
    <section
      id="about"
      className="flex items-center justify-center px-6 sm:px-10 md:px-16 min-h-[50vh] bg-white"
    >
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-7xl w-full mx-auto justify-between py-20">

        {/* Left: Image with Badge */}
        <div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <Image
            src="/about.jpeg"
            alt="Experienced professional"
            width={600}
            height={400}
            className="rounded-2xl object-cover w-full h-auto shadow-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badge */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-[#BF7B66] text-white font-semibold py-2 px-5 rounded-md flex items-center gap-2 shadow-md">
            <span className="bg-white text-[#BF7B66] rounded-full p-1">
              <CheckCircle className="w-5 h-5" />
            </span>
            <span className="text-sm sm:text-base">Experienced Professionals</span>
          </div>
        </div>

        {/* Right: Text */}
        <div
          className="max-w-full md:max-w-xl text-center md:text-left px-2 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 gradient-title gradient leading-tight">
            Built to Support Your Everyday Life
          </h2>
          <p className="text-gray-800 font-semibold mb-8 text-sm sm:text-base leading-relaxed">
            <strong className="gradient gradient-title">AJOKU</strong> was created to bridge the gap between busy lives and everyday needs. From domestic help to lifestyle and tech support, our goal is simple — to make life easier, one task at a time.
          </p>
          <Button
            onClick={handleNavigate}
            className="bg-[#BF7B66] hover:bg-[#a45e4d] text-white font-semibold py-3 px-8 sm:px-10 rounded-2xl shadow-lg text-base sm:text-lg transition-colors"
          >
            Get Started
          </Button>
        </div>

      </div>
    </section>
  )
}

export default AboutSection
