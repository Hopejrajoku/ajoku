'use client'

import React, { useEffect, useState } from 'react'
import getCategory from '@/lib/queries/getCategory'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CategorySection = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <section
      id="services"
      className="bg-[#fefefe] py-12 px-4 sm:px-6 md:px-8"
    >
      <div
        className="max-w-6xl mx-auto"
        style={{ fontFamily: 'var(--font-sf-pro)' }}
      >
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 gradient gradient-title"
        >
          Explore Our Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/search/${encodeURIComponent(category.slug || category.name)}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 60 }}
                className="group relative flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition h-28 sm:h-32 hover:shadow-lg hover:shadow-[#BF7B66] cursor-pointer"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full mb-2"
                  style={{ backgroundColor: category.bgcolor?.hex || '#BF7B66' }}
                >
                  <img
                    src={category.icon?.url}
                    alt={category.name}
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                  />
                </div>

                <p className="text-center text-gray-700 leading-tight truncate max-w-[70px] sm:max-w-[80px] font-medium text-sm sm:text-base">
                  {category.name}
                </p>

                <span className="absolute bottom-[-30px] bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
