"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Telescope, Sparkles, Globe, Moon, Sun, Atom, ChevronRight, Clock, ExternalLink } from "lucide-react"

interface Topic {
  id: string
  title: string
  category: "planets" | "stars" | "galaxies" | "phenomena" | "equipment"
  level: "beginner" | "intermediate" | "advanced"
  readTime: string
  description: string
  content: string
  facts: string[]
}

const topics: Topic[] = [
  {
    id: "solar-system",
    title: "Our Solar System",
    category: "planets",
    level: "beginner",
    readTime: "5 min",
    description: "An introduction to our cosmic neighborhood and the eight planets that orbit our Sun.",
    content: "Our solar system consists of the Sun, eight planets, dwarf planets, moons, asteroids, comets, and other celestial objects bound by gravity. The four inner planets (Mercury, Venus, Earth, Mars) are rocky terrestrial worlds, while the four outer planets (Jupiter, Saturn, Uranus, Neptune) are gas and ice giants.",
    facts: [
      "The Sun contains 99.86% of all mass in the solar system",
      "Jupiter could fit all other planets inside it",
      "A day on Venus is longer than its year",
      "Saturn would float if placed in water (if there was a bathtub big enough)",
    ],
  },
  {
    id: "star-lifecycle",
    title: "The Life Cycle of Stars",
    category: "stars",
    level: "intermediate",
    readTime: "8 min",
    description: "From stellar nurseries to supernovae: understanding how stars are born, live, and die.",
    content: "Stars begin their lives in vast clouds of gas and dust called nebulae. As gravity pulls material together, the core heats up until nuclear fusion ignites. Depending on their mass, stars can live for millions to trillions of years before exhausting their fuel and ending their lives as white dwarfs, neutron stars, or black holes.",
    facts: [
      "Our Sun is about 4.6 billion years old and halfway through its life",
      "The largest known star could fit 10 billion Suns inside it",
      "Neutron stars are so dense that a teaspoon would weigh about 6 billion tons",
      "Black holes are formed when massive stars collapse under their own gravity",
    ],
  },
  {
    id: "milky-way",
    title: "The Milky Way Galaxy",
    category: "galaxies",
    level: "beginner",
    readTime: "6 min",
    description: "Exploring our home galaxy: a barred spiral containing billions of stars.",
    content: "The Milky Way is a barred spiral galaxy approximately 100,000 light-years in diameter, containing 100-400 billion stars. Our solar system is located in the Orion Arm, about 26,000 light-years from the galactic center. The galaxy completes one rotation approximately every 230 million years.",
    facts: [
      "You can see about 2,500 stars from a dark location with the naked eye",
      "The center of our galaxy contains a supermassive black hole called Sagittarius A*",
      "The Milky Way will collide with Andromeda in about 4.5 billion years",
      "Our galaxy is part of the Local Group, containing over 80 galaxies",
    ],
  },
  {
    id: "meteor-showers",
    title: "Understanding Meteor Showers",
    category: "phenomena",
    level: "beginner",
    readTime: "4 min",
    description: "What causes shooting stars and how to best observe annual meteor showers.",
    content: "Meteor showers occur when Earth passes through trails of debris left by comets or asteroids. As these tiny particles enter our atmosphere at high speeds, they burn up and create bright streaks of light. Annual meteor showers like the Perseids and Geminids are predictable and can produce dozens of visible meteors per hour.",
    facts: [
      "Most meteors are no larger than a grain of sand",
      "Meteors typically travel at speeds of 25,000-160,000 mph",
      "The Perseid meteor shower comes from comet Swift-Tuttle",
      "A meteor that reaches the ground is called a meteorite",
    ],
  },
  {
    id: "telescopes-guide",
    title: "Choosing Your First Telescope",
    category: "equipment",
    level: "beginner",
    readTime: "7 min",
    description: "A comprehensive guide to selecting the right telescope for beginners.",
    content: "When choosing your first telescope, consider three main types: refractors (using lenses), reflectors (using mirrors), and compound telescopes (using both). For beginners, aperture (the diameter of the main lens or mirror) is the most important specification, as it determines how much light the telescope can gather and how detailed your views will be.",
    facts: [
      "A 6-inch telescope can show details on planets and deep-sky objects",
      "Binoculars are an excellent starting point for beginners",
      "Dobsonian telescopes offer the best value for aperture",
      "Mount stability is as important as optical quality",
    ],
  },
  {
    id: "black-holes",
    title: "The Mystery of Black Holes",
    category: "phenomena",
    level: "advanced",
    readTime: "10 min",
    description: "Exploring the most extreme objects in the universe: regions where gravity is so strong that nothing can escape.",
    content: "Black holes are regions of spacetime where gravity is so intense that nothing, not even light, can escape once it crosses the event horizon. They form when massive stars collapse at the end of their lives, or through the merger of dense objects. Despite their name, black holes can be detected through their effects on nearby matter and light.",
    facts: [
      "The first image of a black hole was captured in 2019",
      "Time slows down near a black hole due to gravitational time dilation",
      "The smallest known black holes are about 3 times the mass of our Sun",
      "Supermassive black holes can contain billions of solar masses",
    ],
  },
  {
    id: "exoplanets",
    title: "Exoplanets: Worlds Beyond Our Solar System",
    category: "planets",
    level: "intermediate",
    readTime: "8 min",
    description: "Discovering planets orbiting other stars and the search for potentially habitable worlds.",
    content: "Exoplanets are planets that orbit stars other than our Sun. Since the first confirmed detection in 1992, astronomers have discovered over 5,000 exoplanets using various methods including the transit method and radial velocity measurements. Some of these worlds exist in the habitable zone where liquid water could potentially exist.",
    facts: [
      "The closest known exoplanet is Proxima Centauri b, 4.2 light-years away",
      "Some exoplanets orbit two stars, like Tatooine in Star Wars",
      "Hot Jupiters are gas giants that orbit very close to their stars",
      "The TRAPPIST-1 system has 7 Earth-sized planets, 3 in the habitable zone",
    ],
  },
  {
    id: "astrophotography",
    title: "Introduction to Astrophotography",
    category: "equipment",
    level: "intermediate",
    readTime: "9 min",
    description: "Getting started with capturing stunning images of the night sky.",
    content: "Astrophotography combines astronomy with photography to capture images of celestial objects. You can start with just a camera and tripod for wide-field shots of the Milky Way, or invest in tracking mounts and telescopes for detailed images of planets and deep-sky objects. Long exposures and image stacking are key techniques for capturing faint details.",
    facts: [
      "You can photograph the Milky Way with a basic DSLR and tripod",
      "The Orion Nebula is one of the easiest deep-sky objects to photograph",
      "Professional astrophotographers may take hundreds of exposures for one image",
      "Light pollution filters can help capture details from urban areas",
    ],
  },
]

const categoryConfig = {
  planets: { icon: Globe, color: "bg-blue-500/20 text-blue-400" },
  stars: { icon: Sun, color: "bg-amber-500/20 text-amber-400" },
  galaxies: { icon: Sparkles, color: "bg-purple-500/20 text-purple-400" },
  phenomena: { icon: Atom, color: "bg-green-500/20 text-green-400" },
  equipment: { icon: Telescope, color: "bg-cyan-500/20 text-cyan-400" },
}

const levelColors = {
  beginner: "bg-green-500/20 text-green-400",
  intermediate: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400",
}

const faqs = [
  {
    question: "What is the best time to stargaze?",
    answer: "The best stargazing conditions occur on clear, moonless nights, away from city lights. The hours between midnight and dawn often provide the darkest skies. Check local weather forecasts and moon phases before planning your observation session.",
  },
  {
    question: "Can I see planets without a telescope?",
    answer: "Yes! Mercury, Venus, Mars, Jupiter, and Saturn are all visible to the naked eye. Venus is the brightest object in the sky after the Sun and Moon. Jupiter and Saturn are also easily spotted. Use a stargazing app to help locate them.",
  },
  {
    question: "How do I find the North Star?",
    answer: "Locate the Big Dipper asterism, then draw an imaginary line through the two stars at the end of the 'cup' (Dubhe and Merak). Extend this line about 5 times the distance between these stars, and you'll find Polaris, the North Star.",
  },
  {
    question: "What causes the phases of the Moon?",
    answer: "The Moon's phases are caused by its orbit around Earth. As the Moon orbits, different portions of its sunlit side are visible from Earth. It takes about 29.5 days to complete one cycle from New Moon to New Moon.",
  },
  {
    question: "Why do stars twinkle?",
    answer: "Stars twinkle due to atmospheric turbulence. As starlight passes through different layers of Earth's atmosphere with varying temperatures and densities, the light is refracted in different directions, causing the twinkling effect known as scintillation.",
  },
]

export function EducationalContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="guides">Quick Guides</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="topics">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {Object.entries(categoryConfig).map(([category, config]) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  <config.icon className="w-4 h-4 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTopics.map((topic) => {
              const config = categoryConfig[topic.category]
              const Icon = config.icon
              const isExpanded = expandedTopic === topic.id
              
              return (
                <Card 
                  key={topic.id} 
                  className={`bg-card border-border transition-all cursor-pointer ${
                    isExpanded ? "md:col-span-2" : ""
                  }`}
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{topic.title}</CardTitle>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={levelColors[topic.level]}>
                              {topic.level}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {topic.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{topic.description}</CardDescription>
                    
                    {isExpanded && (
                      <div className="pt-4 border-t border-border space-y-4 animate-in fade-in slide-in-from-top-2">
                        <p className="text-foreground leading-relaxed">{topic.content}</p>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Interesting Facts
                          </h4>
                          <ul className="space-y-2">
                            {topic.facts.map((fact, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                {fact}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No topics found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "How to Find Constellations",
                description: "Learn to navigate the night sky using star patterns",
                icon: Sparkles,
              },
              {
                title: "Setting Up Your Telescope",
                description: "Step-by-step guide for first-time telescope users",
                icon: Telescope,
              },
              {
                title: "Photographing the Moon",
                description: "Tips for capturing stunning lunar images",
                icon: Moon,
              },
              {
                title: "Using Star Charts",
                description: "How to read and use astronomical charts effectively",
                icon: BookOpen,
              },
              {
                title: "Light Pollution Solutions",
                description: "Getting the best views despite city lights",
                icon: Sun,
              },
              {
                title: "Planetary Observation",
                description: "Best practices for viewing planets in our solar system",
                icon: Globe,
              },
            ].map((guide) => (
              <Card key={guide.title} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer group">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Read Guide
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card className="bg-card border-border max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about astronomy and stargazing</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
