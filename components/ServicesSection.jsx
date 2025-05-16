'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, ShoppingBag, MonitorSmartphone, Heart, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    icon: <Home className="w-8 h-8 text-white" />,
    title: 'Domestic & Personal Help',
    description: 'Trusted hands for everything from house chores to meal prep.',
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-white" />,
    title: 'Errand Services',
    description: 'Let us run your errands, relax and stay productive.',
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8 text-white" />,
    title: 'Office & Tech Help',
    description: 'From fixing devices to setting up your space, we got you.',
  },
  {
    icon: <Home className="w-8 h-8 text-white" />,
    title: 'Home Maintenance',
    description: 'Professional fixes to keep your home running smoothly.',
  },
  {
    icon: <Code className="w-8 h-8 text-white" />,
    title: 'Web & App Development',
    description: "From concept to launch – we've got your digital presence covered.",
  },
  {
    icon: <Heart className="w-8 h-8 text-white"  />,
    title: 'Lifestyle Services',
    description: 'From personal shopping to wellness support, enjoy a more balanced lifestyle.',
  },
]

const ServicesSection = () => {
  const router = useRouter()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section 
      id="services"
      ref={ref}
      className="bg-cover bg-center bg-no-repeat bg-[#BF7B66] text-white flex min-h-[50vh]"
    >
      <motion.div
        initial={{ x: '-100vw', opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="bg-white/80 backdrop-blur-sm px-6 md:px-12 pt-32 pb-32 mx-auto max-w-7xl"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center gradient-title gradient mb-4" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <span>Here's what AJOKU brings to your</span> doorstep
        </h2>
        <p className="text-center text-gray-700 font-semibold text-sm md:text-base mb-12" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          Professional, trusted services designed to simplify your busy life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 60 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col justify-between h-full"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#BF7B66] rounded-full w-14 h-14 flex items-center justify-center" >
                  {service.icon}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800" style={{ fontFamily: 'var(--font-sf-pro)' }}>{service.title}</h3>
              <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'var(--font-sf-pro)' }}>{service.description}</p>
              <button
                onClick={() => router.push(`/dashboard`)}
                className="mt-auto bg-[#BF7B66] hover:bg-[#a45e4d] text-white font-semibold py-2 rounded-md shadow-md" style={{ fontFamily: 'var(--font-sf-pro)' }}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default ServicesSection
