'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section 
    id="about"
    ref={ref} 
    className="flex items-center justify-center px-6 md:px-16 min-h-[50vh] ">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl w-full mx-auto justify-between pt-20 pb-20">

        {/* Left: Image with Badge */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-md md:max-w-lg"
        >
          <Image
            src="/about.jpeg"
            alt="Experienced professional"
            width={600}
            height={400}
            className="rounded-[20px] object-cover w-full max-w-md md:max-w-lg sm:rounded-[15px] shadow-lg sm:h-[200px] md:h-[300px] lg:h-[400px]"
          />

          {/* Badge */}
          <div className="absolute bottom-[70px] left-1/3 transform -translate-x-1/2 bg-[#BF7B66] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 shadow-md">
            <span className="bg-white text-[#BF7B66] rounded-full p-1">
              <CheckCircle className="w-5 h-5" />
            </span>
            <span>Experienced Professionals</span>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-center md:text-left max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 gradient-title gradient">
            Built to Support Your Everyday Life
          </h2>
          <p className="text-gray-800 font-semibold mb-8">
            <strong className='gradient gradient-title'>AJOKU</strong> was created to bridge the gap between busy lives and everyday needs. From domestic help to
            lifestyle and tech support, our goal is simple, to make life easier, one task at a time.
          </p>
          <button className="bg-[#BF7B66] hover:bg-[#a45e4d] text-white font-semibold py-3 px-10 rounded-2xl shadow-lg text-lg">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
