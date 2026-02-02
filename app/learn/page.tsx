import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EducationalContent } from "@/components/educational-content"

export const metadata = {
  title: "Learn About Space | Stellar Observatory",
  description: "Explore educational content about planets, stars, galaxies, and space phenomena. Perfect for beginners and enthusiasts.",
}

export default function LearnPage() {
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
              Learn About the Cosmos
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore our collection of educational resources about planets, stars, galaxies, and the wonders of the universe.
            </p>
          </div>
          <EducationalContent />
        </div>
      </div>
      <Footer />
    </main>
  )
}
