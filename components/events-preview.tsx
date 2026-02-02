import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Moon, Sun, Sparkles } from "lucide-react"

const upcomingEvents = [
  {
    date: "Feb 12, 2026",
    title: "Lunar Eclipse",
    type: "Eclipse",
    description: "A total lunar eclipse visible across North America. The Moon will turn a stunning red.",
    icon: Moon,
  },
  {
    date: "Mar 8, 2026",
    title: "Venus at Peak Brightness",
    type: "Planet",
    description: "Venus reaches its maximum brightness, making it the perfect time for observation.",
    icon: Sun,
  },
  {
    date: "Apr 22, 2026",
    title: "Lyrid Meteor Shower",
    type: "Meteor Shower",
    description: "Annual meteor shower producing up to 20 meteors per hour at its peak.",
    icon: Sparkles,
  },
]

export function EventsPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 
              className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Upcoming Celestial Events
            </h2>
            <p className="text-muted-foreground">{"Don't miss these astronomical phenomena"}</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <article
              key={event.title}
              className="group relative bg-card/50 border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
                <Badge variant="secondary">{event.type}</Badge>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <event.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {event.description}
              </p>

              {index === 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-accent text-accent-foreground">Coming Soon</Badge>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
