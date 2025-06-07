'use client'

import React, { useRef, useEffect, useState } from 'react'
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'

const Hero = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsPlaying(false)
      video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    video.addEventListener('ended', handleEnded)

    return () => {
      observer.disconnect()
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(err => console.error('Playback error:', err))
    }

    setIsPlaying(!isPlaying)
  }

  const handleRewind = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10)
    }
  }

  const handleForward = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10)
    }
  }

  const handleNavigate = () => {
    window.location.href = '/#services'
  }

  return (
    <section id="/" className="min-h-[40vh] flex items-center px-6 md:px-20 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

        {/* Left Text Content */}
        <div className="flex flex-col justify-center h-full pt-10 pb-2" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-title gradient">
            Instant Support So You Can Focus On What Really Matters.
          </h1>
          <p className="mt-6 text-gray-800 text-base md:text-lg font-medium max-w-md ">
            Whether it’s a quick task or ongoing help, you’ll get instant support that keeps you moving forward—no delays, no distractions.
          </p>
          <button
            onClick={handleNavigate}
            className="mt-8 bg-[#BF7B66] text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#F2E4E1] transition-all w-max text-gray-800"
          >
            Get Started
          </button>
        </div>

        {/* Right Video with Overlay and Controls */}
        <div
          className="relative w-full h-full flex items-center justify-center group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src="/video.mp4"
            autoPlay={false}
            playsInline
            className="w-full rounded-md shadow-lg"
            controls={false}
          />

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-center gap-6 text-white z-10 text-1xl">
            <button
              onClick={handleRewind}
              className="hover:scale-110 transition-transform"
              aria-label="Rewind 10 seconds"
            >
              <FaBackward />
            </button>

            <button
              onClick={handlePlayPause}
              className="hover:scale-110 transition-transform text-2xl"
              aria-label="Play/Pause"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              onClick={handleForward}
              className="hover:scale-110 transition-transform"
              aria-label="Fast forward 10 seconds"
            >
              <FaForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
