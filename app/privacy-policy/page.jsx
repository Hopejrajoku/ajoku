'use client'
import { useRouter } from 'next/navigation'

const metadata = {
  title: 'Privacy Policy | Ajoku',
  description: 'How we protect your personal data at Ajoku',
}

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-gray-800" style={{ fontFamily: 'var(--font-sf-pro)' }}>
    <div className="mt-10">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 hover:bg-[#a45e4d] text-gray-500 font-medium rounded-md transition bg-transparent border border-[#BF7B66] hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 pt-22">Privacy Policy</h1>

      <p className="mb-4">
        At Ajoku, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email, phone number, address, and service preferences when you register or use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to provide and improve our services, communicate with you, process bookings, and ensure a safe experience for all users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Protection</h2>
      <p className="mb-4">
        Your data is securely stored and only accessible by authorized personnel. We use industry-standard encryption and do not share your data with third parties without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your user experience. You can disable cookies in your browser settings, but some features may not work properly.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can access, update, or delete your personal information by contacting us. You also have the right to withdraw consent at any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this policy, please contact us at{' '}
        <a href="mailto:support@ajoku.ng" className="text-[#BF7B66] underline">support@ajoku.ng</a>.
      </p>

      <p className="text-sm text-gray-500 mt-10">Effective date: May 15, 2025</p>

      <div className="mt-10">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-[#BF7B66] hover:bg-[#a45e4d] text-white font-medium rounded-md transition"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  )
}
