import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { EventsPreview } from "@/components/events-preview"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturesSection />
      <EventsPreview />
      <Footer />
    </main>
  )
}
