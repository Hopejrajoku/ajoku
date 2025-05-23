'use client'

import React, { useEffect, useState } from 'react'
import getAllBusinessList from '@/lib/queries/getAllBusinessList'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const fallbackImg = 'https://placehold.co/500x300?text=No+Image'

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 50,
    },
  }),
}

const BusinessImages = () => {
  const [businesses, setBusinesses] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBusinessList()
      setBusinesses(data || [])
    }

    fetchData()
  }, [])

  return (
    <div
      id='services'
      className="min-h-screen flex flex-wrap justify-center gap-6 p-6 bg-[#F2E4E1] pt-20 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40"
      style={{ fontFamily: 'var(--font-sf-pro)' }}
    >
      <div className='w-full flex flex-col items-center mb-10'>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center gradient-title gradient">
          <span>Popular Services</span>
        </h2>
        <p className="text-center text-gray-700 font-semibold text-sm md:text-base mb-4">
          Here are some of the most popular services our esteemed clients request.
        </p>
      </div>

      {businesses.map((business, i) => {
        const imageUrl = business?.images?.url || fallbackImg
        const categorySlug = business.category?.name?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

        return (
          <motion.div
            key={business.id}
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-purple-500 flex flex-col justify-between h-[430px]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <div>
              <div className="relative w-full h-[200px]">
                <Image
                  src={imageUrl}
                  alt={business.name}
                  fill
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className="p-4 space-y-1">
                <h2 className="font-bold text-lg text-gray-800 md:text-xl truncate">
                  {business.name}
                </h2>
                <p className="text-sm text-purple-700 bg-purple-100 px-2 py-1 inline-block rounded-[4px]">
                  {business.category?.name || 'Uncategorized'}
                </p>
                <p className="text-medium text-gray-800 flex items-center gap-1">
                  <BsDot className="text-green-500 text-3xl animate-ping-slow" />
                  {business.contactPerson}
                </p>
                <p className="text-sm text-gray-400">
                  {business.address || 'No address provided'}
                </p>
              </div>
            </div>
            <div className="p-4 pt-2">
              <Button
                onClick={() => router.push(`/search/${categorySlug}`)}
                className="w-full"
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default BusinessImages
