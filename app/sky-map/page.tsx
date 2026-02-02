import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SkyMapViewer } from "@/components/sky-map-viewer"

export const metadata = {
  title: "Interactive Sky Map | Stellar Observatory",
  description: "Explore the night sky in real-time with our interactive celestial map. Identify stars, constellations, and planets.",
}

export default function SkyMapPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <SkyMapViewer />
      </div>
      <Footer />
    </main>
  )
}
