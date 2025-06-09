'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import getAllBusinessList from '@/lib/queries/getAllBusinessList'
import getCategory from '@/lib/queries/getCategory'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { MapPin } from 'lucide-react'

const fallbackImg = 'https://placehold.co/500x300?text=No+Image'

export default function CategoryPage() {
  const params = useParams()
  const slug = decodeURIComponent(params?.slug || '').toLowerCase()

  const [categories, setCategories] = useState([])
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedBusiness, setSelectedBusiness] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [catData, bizData] = await Promise.all([
        getCategory(),
        getAllBusinessList()
      ])
      setCategories(catData)

      const filtered = bizData.filter(
        (biz) => biz.category?.name?.toLowerCase().replace(/\s+/g, '-') === slug
      )
      setFilteredBusinesses(filtered)
      setLoading(false)
    }

    fetchData()
  }, [slug])

  const decodedSlug = slug.replace(/-/g, ' ')
  const closeBooking = () => setSelectedBusiness(null)

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row font-sf-pro">
        {/* Sidebar */}
        <aside className="w-full md:w-64 p-6 space-y-6 overflow-y-auto bg-white border-r pt-32 sticky top-0 h-screen hidden md:block">
          <h2 className="text-lg font-bold gradient gradient-title mb-4">Categories</h2>
          <div className="flex flex-col items-start gap-3">
            {categories.map((category, index) => {
              const categorySlug = category.slug.toLowerCase()
              const isActive = categorySlug === slug

              return (
                <Link key={category.id} href={`/search/${encodeURIComponent(category.slug)}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group flex items-center gap-3 p-3 rounded-md transition cursor-pointer border w-full font-medium
                      ${isActive
                        ? ' text-gray-800 border-[#BF7B66] hover:shadow-lg hover:shadow-[#BF7B66]'
                        : 'hover:shadow-lg hover:shadow-[#BF7B66] text-gray-700'
                      }`}
                    style={{ fontFamily: 'var(--font-sf-pro)' }}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0`}
                      style={{ backgroundColor: isActive ? '#BF7B66' : (category.bgcolor?.hex || '#BF7B66') }}
                    >
                      <img
                        src={category.icon?.url}
                        alt={category.name}
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <span className="text-xs truncate max-w-[80px]">
                      {category.name}
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </aside>

        {/* Main */}
        <main className="w-full md:flex-1 p-6 pt-32 bg-gray-50 min-h-screen" style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <h1 className="text-3xl font-bold mb-6 capitalize">
            <span className="text-purple-600 gradient gradient-title">{decodedSlug}</span>
          </h1>

          {loading ? (
            <p className="text-gray-500 text-lg">Loading businesses...</p>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.map((biz) => {
                const imageUrl = biz.images?.url || fallbackImg
                return (
                  <div
                    key={biz.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full hover:shadow-lg hover:shadow-[#BF7B66]"
                    style={{ fontFamily: 'var(--font-sf-pro)' }}
                  >
                    <div>
                      <div className="relative w-full h-[180px]">
                        <Image
                          src={imageUrl}
                          alt={biz.name}
                          width={500}
                          height={300}
                          className="object-cover w-full h-full"
                          unoptimized
                          priority
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h2 className="text-lg font-semibold">{biz.name}</h2>
                        <p className="text-sm text-[#BF7B66] bg-purple-100 px-2 py-1 inline-block rounded-md">
                          {biz.category?.name || 'Uncategorized'}
                        </p>

                        {/* ✅ Show price only for Food and Livestock */}
                        {['food and livestock'].includes(biz.category?.name?.toLowerCase()) && biz.price && (
                          <p className="text-green-600 font-semibold text-sm">
                            ₦{parseFloat(biz.price).toLocaleString()}
                          </p>
                        )}

                        <p className="font-medium text-gray-800 flex items-center gap-1">
                          <BsDot className="text-green-500 text-3xl animate-ping-slow" />
                          {biz.contactPerson}
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#BF7B66]" />
                          {biz.address || 'No address provided'}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <Link
                          href={`/business/${biz.id}`}
                          className="mt-2 block text-center bg-[#A0522D] text-white text-sm px-4 py-2 rounded-md hover:bg-[#8B4513] transition"
                        >
                          Book Now
                        </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No businesses found in this category.</p>
          )}
        </main>
      </div>

      {/* Booking Modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeBooking}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Book: {selectedBusiness.name}</h2>
            <p className="mb-4">{selectedBusiness.about || 'No additional info available.'}</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
