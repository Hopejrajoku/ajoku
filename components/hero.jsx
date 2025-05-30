'use client'

import React, { useRef, useEffect, useState } from 'react'

const Hero = () => {
  const videoRef = useRef(null)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Pause video after it ends
    const handleEnded = () => video.pause()
    video.addEventListener('ended', handleEnded)

    // Pause video when it's out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
        }
      },
      { threshold: 0.5 } // Adjust based on how much visibility is required
    )
    observer.observe(video)

    return () => {
      video.removeEventListener('ended', handleEnded)
      observer.disconnect()
    }
  }, [])

  const handleNavigate = () => {
    // Navigate to the dashboard or any other page
    window.location.href = '/#services'
  }

  return (
    <section
     id="/"
     className="min-h-[40vh] flex items-center px-6 md:px-20 py-20 ">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Text Content */}
        <div className="flex flex-col justify-center h-full pt-10 pb-2"  style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-title gradient">
            Instant Support So You Can Focus On What Really Matters.
          </h1>
          <p className="mt-6 text-gray-800 text-base md:text-lg font-medium max-w-md ">
            Whether it’s a quick task or ongoing help, you’ll get instant support that keeps you moving forward—no delays, no distractions.
          </p>
          <button 
          onClick={handleNavigate}
          className="mt-8 bg-[#BF7B66] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#F2E4E1] transition-all w-max text-gray-800">
            Get Started
          </button>
        </div>

        {/* Right Video */}
        <div
          className="w-full h-full flex items-center group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src="/video.mp4"
            autoPlay
            muted
            playsInline
            controls={showControls}
            className="w-full rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
