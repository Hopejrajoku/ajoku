'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, ShoppingBag, MonitorSmartphone, Heart } from 'lucide-react'

const services = [
  {
    icon: <Home className="w-8 h-8 text-white" />,
    title: 'Domestic & Personal Help',
    description: 'Trusted hands for everything from house chores to childcare.',
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
    description: 'Professional fixes  to keep your home running smoothly.',
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />, // Use another icon if you prefer
    title: 'Lifestyle Services',
    description: 'From personal shopping to wellness support, enjoy a more balanced lifestyle.',
  },
]

const ServicesSection = () => {
  const router = useRouter()

  return (
    <section
      className="bg-cover bg-center bg-no-repeat bg-[#BF7B66] text-white flex"
      style={{ minHeight: '100vh' }}
    >
      <div className="bg-white/80 backdrop-blur-sm px-6 md:px-12 pt-40 pb-16 mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center gradient-title gradient mb-4">
          <span>Here's what AJOKU brings to your</span> doorstep
        </h2>
        <p className="text-center text-gray-700 font-semibold text-sm md:text-base mb-12">
          Professional, trusted services designed to simplify your busy life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col justify-between h-full"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#BF7B66] rounded-full w-14 h-14 flex items-center justify-center">
                  {service.icon}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-6">{service.description}</p>
              <button
                onClick={() => router.push(`/dashboard=${encodeURIComponent(service.title)}`)}
                className="mt-auto bg-[#BF7B66] hover:bg-[#a45e4d] text-white font-semibold py-2 rounded-md shadow-md"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
