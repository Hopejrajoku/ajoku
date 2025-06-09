'use client'

import React, { useEffect, useState } from 'react'
import getAllBusinessList from '@/lib/queries/getAllBusinessList'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fallbackImg = 'https://placehold.co/500x300?text=No+Image'
const ITEMS_PER_PAGE = 12

const BusinessImages = () => {
  const [businesses, setBusinesses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getAllBusinessList()
      setBusinesses(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const totalPages = Math.ceil(businesses.length / ITEMS_PER_PAGE)
  const paginatedBusinesses = businesses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)

      // Scroll to top of business section without jumping
      const section = document.getElementById('services')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div
      id="services"
      className="min-h-screen flex flex-col items-center gap-6 p-6 bg-[#F2E4E1] pt-20 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40"
      style={{ fontFamily: 'var(--font-sf-pro)' }}
    >
      <div className="w-full flex flex-col items-center mb-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center gradient-title gradient">
          <span>Popular Services</span>
        </h2>
        <p className="text-center text-gray-700 font-semibold text-sm md:text-base max-w-xl">
          Here are some of the most popular services our esteemed clients request.
        </p>
      </div>

      {/* Business Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {loading ? (
          <div className="text-gray-600 text-lg mt-10">Loading services...</div>
        ) : (
          paginatedBusinesses.map((business) => {
            const imageUrl = business?.images?.url || fallbackImg

            return (
              <div
                key={business.id}
                className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-[#BF7B66] flex flex-col justify-between min-h-[400px] h-auto"
                style={{ fontFamily: 'var(--font-sf-pro)' }}
              >
                <div>
                  <div className="w-full h-[200px] relative">
                    <Image
                      src={imageUrl}
                      alt={business.name}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full rounded-t-lg"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                      priority
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h2 className="font-bold text-lg md:text-xl text-gray-800 truncate break-words">
                      {business.name}
                    </h2>
                    <p className="text-sm text-purple-700 bg-purple-100 px-2 py-1 inline-block rounded-[4px] truncate max-w-full">
                      {business.category?.name || 'Uncategorized'}
                    </p>
                    <p className="text-medium text-gray-800 flex items-center gap-1 break-words">
                      <BsDot className="text-green-500 text-3xl animate-ping-slow" />
                      {business.contactPerson}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 break-words truncate max-w-full">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      {business.address || 'No address provided'}
                    </p>
                  </div>
                </div>
                <div className="p-2 pt-0">
                  <Button
                    onClick={() => router.push(`/business/${business.id}`)}
                    className="w-full bg-[#BF7B66] text-white text-sm px-4 py-2 rounded-md hover:bg-purple-400 transition"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex items-center gap-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default BusinessImages
