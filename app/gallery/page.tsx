import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"

export const metadata = {
  title: "Astrophotography Gallery | Stellar Observatory",
  description: "Explore stunning captures of nebulae, galaxies, and celestial events from our observatory.",
}

export default function GalleryPage() {
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
              Astrophotography Gallery
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Stunning captures of nebulae, galaxies, and celestial phenomena from our state-of-the-art telescopes.
            </p>
          </div>
          <GalleryGrid />
        </div>
      </div>
      <Footer />
    </main>
  )
}
