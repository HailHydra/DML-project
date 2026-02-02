import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Telescope, Calendar, BookOpen, ImageIcon, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Interactive Sky Map",
    description: "Navigate the night sky in real-time with our 3D celestial map. Identify stars, constellations, and planets.",
    href: "/sky-map",
    color: "text-primary",
  },
  {
    icon: ImageIcon,
    title: "Astrophotography Gallery",
    description: "Explore stunning captures of nebulae, galaxies, and celestial events from our observatory.",
    href: "/gallery",
    color: "text-accent",
  },
  {
    icon: Telescope,
    title: "Telescope Booking",
    description: "Reserve time on our professional-grade telescopes for your own observation sessions.",
    href: "/booking",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Celestial Events",
    description: "Stay updated on upcoming meteor showers, eclipses, and planetary alignments.",
    href: "/events",
    color: "text-accent",
  },
  {
    icon: BookOpen,
    title: "Educational Content",
    description: "Learn about the cosmos with our comprehensive guides on planets, stars, and space phenomena.",
    href: "/learn",
    color: "text-primary",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Discover the Universe
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Everything you need to explore, learn, and experience the wonders of space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href} className="group">
              <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="flex items-center justify-between text-foreground">
                    {feature.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
