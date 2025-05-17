import { LocationEditIcon } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <Image
            src="/logo.svg"
            alt="Ajoku Logo"
            width={150}
            height={100}
            className="h-10 w-auto mb-4"
            />
          <p className="text-sm text-gray-400" style={{ fontFamily: 'var(--font-sf-pro)' }}>
            Ajoku is proudly registered with the Corporate Affairs Commission (CAC), providing trusted and verified domestic and lifestyle services across Nigeria.
            <Image
              src="/cac.png"
              alt="CAC Logo"
              width={100}
              height={100}
              className="h-16 w-auto mb-1"
            />
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-[#BF7B66] transition">Services</a></li>
            <li><a href="#testimonials" className="hover:text-[#BF7B66] transition">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-[#BF7B66] transition">Contact</a></li>
            <li><a href="/privacy-policy" className="hover:text-[#BF7B66] transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ fontFamily: 'var(--font-sf-pro)' }}>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@ajoku.ng</p>
          <p className="text-sm text-gray-400 mt-2">Phone: +234 913 1200 470</p>
          <p className="text-sm text-gray-400 mt-2">
            <LocationEditIcon className="inline-block mr-1" size={16} />
            Abuja, Nigeria</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500" style={{ fontFamily: 'var(--font-sf-pro)' }}>
        © {new Date().getFullYear()} Ajoku Ltd. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
