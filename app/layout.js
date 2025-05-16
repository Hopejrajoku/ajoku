import localFont from 'next/font/local'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'


const sfPro = localFont({
  src: [
    {
      path: '../public/fonts/SFPro/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFPro/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SFPro/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
})
export const metadata = {
  title: 'Ajoku',
  description: 'Get the help you need, when you need it.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sfPro.variable} antialiased`}
      >
        <LoadingScreen>{children}</LoadingScreen>
      </body>
    </html>
  )
}
