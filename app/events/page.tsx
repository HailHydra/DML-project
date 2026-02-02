import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsCalendar } from "@/components/events-calendar"

export const metadata = {
  title: "Celestial Events | Stellar Observatory",
  description: "Stay updated on upcoming meteor showers, eclipses, planetary alignments, and other astronomical phenomena.",
}

export default function EventsPage() {
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
              Celestial Events Calendar
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {"Don't miss these upcoming astronomical phenomena. Plan your stargazing sessions around these spectacular events."}
            </p>
          </div>
          <EventsCalendar />
        </div>
      </div>
      <Footer />
    </main>
  )
}
