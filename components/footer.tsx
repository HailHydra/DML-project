import Link from "next/link"
import { Star } from "lucide-react"

const navigation = {
  explore: [
    { name: "Sky Map", href: "/sky-map" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Learn", href: "/learn" },
  ],
  services: [
    { name: "Book Telescope", href: "/booking" },
    { name: "Private Sessions", href: "/booking" },
    { name: "Group Tours", href: "/booking" },
    { name: "Gift Cards", href: "/booking" },
  ],
  resources: [
    { name: "Stargazing Tips", href: "/learn" },
    { name: "Equipment Guide", href: "/learn" },
    { name: "FAQ", href: "/learn" },
    { name: "Contact", href: "/learn" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-primary/20" />
                <Star className="absolute inset-1 w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                Stellar Observatory
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your gateway to the universe. Explore the cosmos with our state-of-the-art observatory.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-3">
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Stellar Observatory. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Clear skies await you.
          </p>
        </div>
      </div>
    </footer>
  )
}
