import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { QueryProvider } from './QueryProvider'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wind Invest',
  applicationName: 'Wind Invest',
  description: 'Análise automatizada do mercado acionário brasileiro.',
  viewport: 'width=device-width, initial-scale=1',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt" className="bg-neutral-900 text-neutral-50">
      <QueryProvider>
        <body
          className={`flex min-h-screen flex-col justify-between ${nunito.className}`}
        >
          <div>
            <Header />
            {children}
          </div>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  )
}

export default RootLayout
