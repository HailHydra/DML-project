import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingSystem } from "@/components/booking-system"

export const metadata = {
  title: "Book Telescope Session | Stellar Observatory",
  description: "Reserve time on our professional-grade telescopes for your own observation sessions.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Book a Telescope Session
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Experience the cosmos through our professional-grade telescopes. Choose your telescope, date, and time slot.
            </p>
          </div>
          <BookingSystem />
        </div>
      </div>
      <Footer />
    </main>
  )
}
