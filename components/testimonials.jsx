import Image from 'next/image'

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
      className="bg-[#F2E4E1] py-16 px-4 sm:px-8 md:px-12"
    >
      <div
        className="max-w-7xl mx-auto text-center mb-10 px-2 sm:px-0"
        style={{ fontFamily: 'var(--font-sf-pro)' }}
      >
        <h2 className="font-bold text-3xl sm:text-4xl mb-2 gradient gradient-title">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 font-medium max-w-xl mx-auto">
          Real stories from the people who trust AJOKU every day.
        </p>
      </div>

      <div
        className="overflow-x-auto snap-x snap-mandatory flex gap-6 md:gap-8 px-2 md:px-0 scrollbar-thin scrollbar-thumb-[#BF7B66]/60 scrollbar-track-transparent"
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="min-w-[280px] max-w-[320px] sm:min-w-[320px] sm:max-w-[360px] md:min-w-[350px] bg-white/90 rounded-2xl text-gray-900 p-6 snap-start shrink-0 shadow-lg"
            style={{ fontFamily: 'var(--font-sf-pro)' }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={item.image}
                  width={96}
                  height={96}
                  alt={item.name}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 96px"
                />
              </div>
              <p className="text-yellow-400 text-lg mb-1 tracking-widest">
                {'★'.repeat(item.stars)}
              </p>
              <p className="font-bold text-gray-800 text-lg">{item.name}</p>
              <p className="text-sm text-gray-700 mb-4">{item.location}</p>
              <p className="text-sm leading-relaxed text-gray-800">
                &ldquo;{item.feedback}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
