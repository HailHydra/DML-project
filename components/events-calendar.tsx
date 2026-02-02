"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Moon, Sun, Sparkles, Eye, Clock, MapPin, Bell, ChevronRight } from "lucide-react"

interface CelestialEvent {
  id: string
  title: string
  date: string
  time: string
  type: "eclipse" | "meteor" | "planet" | "moon" | "conjunction"
  description: string
  visibility: string
  bestViewing: string
  featured: boolean
}

const celestialEvents: CelestialEvent[] = [
  {
    id: "1",
    title: "Total Lunar Eclipse",
    date: "February 12, 2026",
    time: "10:30 PM - 2:15 AM",
    type: "eclipse",
    description: "A total lunar eclipse will be visible across North America. The Moon will pass through Earth's shadow, turning a stunning red-orange color at totality. This is one of the best lunar eclipses of the decade.",
    visibility: "Excellent visibility across North America",
    bestViewing: "Look east as the Moon rises, no equipment needed",
    featured: true,
  },
  {
    id: "2",
    title: "Venus at Greatest Brilliance",
    date: "March 8, 2026",
    time: "Evening sky",
    type: "planet",
    description: "Venus reaches its maximum brightness at magnitude -4.6, making it the brightest object in the evening sky after the Sun and Moon. Perfect for evening observation and photography.",
    visibility: "Visible worldwide in the western sky after sunset",
    bestViewing: "Best viewed 30-45 minutes after sunset",
    featured: true,
  },
  {
    id: "3",
    title: "Lyrid Meteor Shower Peak",
    date: "April 22, 2026",
    time: "Midnight - Dawn",
    type: "meteor",
    description: "The annual Lyrid meteor shower reaches its peak, producing up to 20 meteors per hour. These bright meteors often leave persistent trains and occasionally produce fireballs.",
    visibility: "Best viewed from dark locations",
    bestViewing: "Look toward the constellation Lyra after midnight",
    featured: false,
  },
  {
    id: "4",
    title: "Jupiter-Saturn Conjunction",
    date: "May 15, 2026",
    time: "Pre-dawn",
    type: "conjunction",
    description: "Jupiter and Saturn will appear remarkably close together in the pre-dawn sky, separated by less than 1 degree. A rare opportunity to see both gas giants in the same telescope field of view.",
    visibility: "Visible worldwide in the eastern sky before sunrise",
    bestViewing: "Use binoculars or a small telescope",
    featured: true,
  },
  {
    id: "5",
    title: "Strawberry Moon",
    date: "June 14, 2026",
    time: "All night",
    type: "moon",
    description: "The full Moon in June, traditionally called the Strawberry Moon. This full Moon will appear particularly large and golden as it rises, making it ideal for photography.",
    visibility: "Visible worldwide",
    bestViewing: "Watch the Moon rise on the eastern horizon",
    featured: false,
  },
  {
    id: "6",
    title: "Perseid Meteor Shower Peak",
    date: "August 12, 2026",
    time: "10:00 PM - Dawn",
    type: "meteor",
    description: "The most popular meteor shower of the year reaches its peak with up to 100 meteors per hour. Perseids are known for their brightness and frequent fireballs.",
    visibility: "Best conditions with minimal moonlight",
    bestViewing: "Find a dark location away from city lights",
    featured: true,
  },
  {
    id: "7",
    title: "Partial Solar Eclipse",
    date: "September 3, 2026",
    time: "11:00 AM - 2:00 PM",
    type: "eclipse",
    description: "A partial solar eclipse visible across parts of North America. Up to 60% of the Sun will be covered by the Moon in some locations. Remember to use proper solar viewing equipment!",
    visibility: "Partial visibility across North America",
    bestViewing: "Use certified solar eclipse glasses only",
    featured: false,
  },
  {
    id: "8",
    title: "Orionid Meteor Shower Peak",
    date: "October 21, 2026",
    time: "Midnight - Dawn",
    type: "meteor",
    description: "Debris from Halley's Comet creates the annual Orionid meteor shower. Expect 15-20 fast, bright meteors per hour with occasional fireballs.",
    visibility: "Best after midnight",
    bestViewing: "Look toward the constellation Orion",
    featured: false,
  },
  {
    id: "9",
    title: "Mars Opposition",
    date: "November 18, 2026",
    time: "All night",
    type: "planet",
    description: "Mars reaches opposition, appearing at its biggest and brightest for the year. The Red Planet will be visible all night and show excellent surface detail through telescopes.",
    visibility: "Visible all night",
    bestViewing: "Use our telescopes for best views of surface features",
    featured: true,
  },
  {
    id: "10",
    title: "Geminid Meteor Shower Peak",
    date: "December 14, 2026",
    time: "9:00 PM - Dawn",
    type: "meteor",
    description: "The strongest meteor shower of the year with up to 150 multicolored meteors per hour. Geminids are bright, colorful, and put on a spectacular show.",
    visibility: "Excellent conditions this year",
    bestViewing: "Best after 10 PM, look toward Gemini",
    featured: true,
  },
]

const eventTypeConfig = {
  eclipse: { icon: Moon, color: "bg-orange-500/20 text-orange-400", label: "Eclipse" },
  meteor: { icon: Sparkles, color: "bg-blue-500/20 text-blue-400", label: "Meteor Shower" },
  planet: { icon: Sun, color: "bg-amber-500/20 text-amber-400", label: "Planetary Event" },
  moon: { icon: Moon, color: "bg-slate-500/20 text-slate-300", label: "Lunar Event" },
  conjunction: { icon: Eye, color: "bg-purple-500/20 text-purple-400", label: "Conjunction" },
}

export function EventsCalendar() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [subscribedEvents, setSubscribedEvents] = useState<Set<string>>(new Set())

  const filteredEvents = selectedType === "all" 
    ? celestialEvents 
    : celestialEvents.filter(event => event.type === selectedType)

  const featuredEvents = celestialEvents.filter(event => event.featured)

  const toggleSubscription = (eventId: string) => {
    setSubscribedEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              All Events
            </Button>
            {Object.entries(eventTypeConfig).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {config.label}
              </Button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const config = eventTypeConfig[event.type]
              const Icon = config.icon
              
              return (
                <Card key={event.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Date Badge */}
                      <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 lg:w-32 shrink-0">
                        <div className="flex items-center gap-2 lg:mb-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{event.date.split(",")[0]}</span>
                        </div>
                        <Badge variant="outline" className={config.color}>
                          <Icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                          {event.featured && (
                            <Badge className="bg-accent text-accent-foreground shrink-0">Featured</Badge>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-primary mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Time</span>
                              <p className="text-foreground">{event.time}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Eye className="w-4 h-4 text-primary mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Visibility</span>
                              <p className="text-foreground">{event.visibility}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-primary mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">Best Viewing</span>
                              <p className="text-foreground">{event.bestViewing}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 shrink-0">
                        <Button
                          variant={subscribedEvents.has(event.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSubscription(event.id)}
                          className="flex-1 lg:flex-none"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          {subscribedEvents.has(event.id) ? "Subscribed" : "Remind Me"}
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1 lg:flex-none bg-transparent">
                          <a href="/booking">
                            Book Session
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.map((event) => {
              const config = eventTypeConfig[event.type]
              const Icon = config.icon
              
              return (
                <Card key={event.id} className="bg-card border-border hover:border-primary/30 transition-colors overflow-hidden">
                  {/* Decorative header */}
                  <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary/50" />
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={config.color}>
                        {config.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.time}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant={subscribedEvents.has(event.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSubscription(event.id)}
                        className="flex-1"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        {subscribedEvents.has(event.id) ? "Subscribed" : "Remind Me"}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/booking">
                          Book
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
