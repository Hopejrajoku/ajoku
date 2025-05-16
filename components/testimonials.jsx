'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Chinedu M.',
    location: 'Abuja',
    stars: 5,
    image: '/pic1.webp',
    feedback: `AJOKU has completely changed how I manage my home. The cleaning team is punctual, thorough, and super friendly. I now have more time to focus on work and family.`,
  },
  {
    name: 'Kunle & Mariam',
    location: 'Abuja',
    stars: 5,
    image: '/pic2.jfif',
    feedback: `I no longer stress about running errands during work hours. AJOKU handles my market runs and deliveries flawlessly.`,
  },
  {
    name: 'Fatima S.',
    location: 'Abuja',
    stars: 5,
    image: '/pic3.jfif',
    feedback: `AJOKU is a life-saver! Their wellness support service has helped me maintain balance while working full-time.`,
  },
  {
    name: 'Alhassan A.',
    location: 'Abuja',
    stars: 5,
    image: '/pic4.jfif',
    feedback: `From house chores to tech help, they’ve been efficient and trustworthy. Highly recommend AJOKU!`,
  },
  {
    name: 'Rachel H.',
    location: 'Abuja',
    stars: 5,
    image: '/pic5.jfif',
    feedback: `AJOKU built us a fast, modern site with smooth auth and clean design. Highly recommend`,
  },
]

export default function TestimonialsCarousel() {
  return (
    <section 
    id="testimonials"
    className="bg-[#F2E4E1] py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-10 " style={{ fontFamily: 'var(--font-sf-pro)' }}>
        <h2 className="font-bold text-3xl md:text-4xl mb-2 gradient gradient-title" >
          What Our Customers Say
        </h2>
        <p className="text-gray-600 font-medium">
          Real stories from the people who trust AJOKU every day.
        </p>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        viewport={{ once: true }}
        className="overflow-x-auto snap-x snap-mandatory flex gap-6 md:gap-8 px-2 md:px-0"
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="min-w-[300px] max-w-[350px] md:min-w-[350px] bg-white/90 rounded-2xl text-white p-6 snap-start shrink-0"
            style={{ fontFamily: 'var(--font-sf-pro)' }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={item.image}
                  width={96}
                  height={96}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-yellow-400 text-lg mb-1">
                {'★'.repeat(item.stars)}
              </p>
              <p className="font-bold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-700 mb-4">{item.location}</p>
              <p className="text-sm font-regular leading-relaxed text-gray-800">
                "{item.feedback}"
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
