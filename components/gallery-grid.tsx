"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X, Download, Calendar, Telescope, Clock, Heart, Share2 } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  category: "nebula" | "galaxy" | "planet" | "star" | "event"
  date: string
  telescope: string
  exposure: string
  description: string
  likes: number
  gradient: string
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Orion Nebula",
    category: "nebula",
    date: "Jan 15, 2026",
    telescope: "Celestron EdgeHD 14",
    exposure: "4 hours",
    description: "The Orion Nebula (M42) is a diffuse nebula situated in the Milky Way. It is one of the brightest nebulae and is visible to the naked eye in the night sky.",
    likes: 342,
    gradient: "from-pink-500/30 via-purple-500/20 to-blue-500/30",
  },
  {
    id: "2",
    title: "Andromeda Galaxy",
    category: "galaxy",
    date: "Dec 28, 2025",
    telescope: "Celestron EdgeHD 14",
    exposure: "6 hours",
    description: "The Andromeda Galaxy (M31) is a barred spiral galaxy and the nearest major galaxy to the Milky Way. It is expected to collide with our galaxy in about 4.5 billion years.",
    likes: 528,
    gradient: "from-blue-500/30 via-cyan-500/20 to-teal-500/30",
  },
  {
    id: "3",
    title: "Saturn and Rings",
    category: "planet",
    date: "Nov 12, 2025",
    telescope: "Meade LX200",
    exposure: "30 minutes",
    description: "Saturn captured at opposition, showing its magnificent ring system and the Cassini Division. Several moons are also visible in this composite image.",
    likes: 456,
    gradient: "from-amber-500/30 via-orange-500/20 to-yellow-500/30",
  },
  {
    id: "4",
    title: "Crab Nebula",
    category: "nebula",
    date: "Jan 5, 2026",
    telescope: "Celestron EdgeHD 14",
    exposure: "5 hours",
    description: "The Crab Nebula (M1) is a supernova remnant in the constellation of Taurus. The pulsar at its center spins 30 times per second.",
    likes: 289,
    gradient: "from-orange-500/30 via-red-500/20 to-pink-500/30",
  },
  {
    id: "5",
    title: "Jupiter and Moons",
    category: "planet",
    date: "Oct 22, 2025",
    telescope: "Meade LX200",
    exposure: "45 minutes",
    description: "Jupiter with its four Galilean moons: Io, Europa, Ganymede, and Callisto. The Great Red Spot is visible on the planet's surface.",
    likes: 398,
    gradient: "from-orange-400/30 via-amber-500/20 to-red-400/30",
  },
  {
    id: "6",
    title: "Pleiades Cluster",
    category: "star",
    date: "Dec 10, 2025",
    telescope: "Celestron EdgeHD 14",
    exposure: "3 hours",
    description: "The Pleiades (M45), also known as the Seven Sisters, is an open star cluster containing middle-aged hot B-type stars in the constellation of Taurus.",
    likes: 312,
    gradient: "from-blue-400/30 via-indigo-500/20 to-purple-400/30",
  },
  {
    id: "7",
    title: "Total Lunar Eclipse",
    category: "event",
    date: "Sep 18, 2025",
    telescope: "Canon EOS R5",
    exposure: "Composite",
    description: "A composite image showing the progression of a total lunar eclipse, from partial to total, capturing the blood moon at totality.",
    likes: 623,
    gradient: "from-red-600/30 via-orange-500/20 to-red-400/30",
  },
  {
    id: "8",
    title: "Whirlpool Galaxy",
    category: "galaxy",
    date: "Nov 25, 2025",
    telescope: "Celestron EdgeHD 14",
    exposure: "8 hours",
    description: "The Whirlpool Galaxy (M51) is an interacting grand-design spiral galaxy with a Seyfert 2 active galactic nucleus. Its companion NGC 5195 is visible.",
    likes: 445,
    gradient: "from-purple-500/30 via-pink-500/20 to-blue-500/30",
  },
  {
    id: "9",
    title: "Perseid Meteor Shower",
    category: "event",
    date: "Aug 12, 2025",
    telescope: "Canon EOS R5",
    exposure: "All-night composite",
    description: "A composite of multiple meteor trails from the annual Perseid meteor shower, one of the most spectacular astronomical events of the year.",
    likes: 567,
    gradient: "from-cyan-400/30 via-blue-500/20 to-indigo-500/30",
  },
]

const categories = ["all", "nebula", "galaxy", "planet", "star", "event"] as const

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const toggleLike = (id: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === "all" ? "All Images" : `${category}s`}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <article
            key={image.id}
            className="group relative bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
            onClick={() => setSelectedImage(image)}
          >
            {/* Placeholder image with gradient */}
            <div className={`aspect-[4/3] bg-gradient-to-br ${image.gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                    <Telescope className="w-8 h-8 text-foreground/70" />
                  </div>
                  <span className="text-sm text-foreground/70 font-medium">{image.title}</span>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-foreground font-medium">View Details</span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground line-clamp-1">{image.title}</h3>
                <Badge variant="secondary" className="capitalize shrink-0">{image.category}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {image.date}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(image.id)
                  }}
                  className={`flex items-center gap-1 transition-colors ${
                    likedImages.has(image.id) ? "text-red-500" : "hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                  {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-card border-border">
          {selectedImage && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2 capitalize">{selectedImage.category}</Badge>
                    <DialogTitle className="text-2xl">{selectedImage.title}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              {/* Image placeholder */}
              <div className={`aspect-video rounded-lg bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
                <div className="text-center">
                  <Telescope className="w-16 h-16 mx-auto text-foreground/50 mb-2" />
                  <span className="text-foreground/50">High-resolution image</span>
                </div>
              </div>

              <DialogDescription className="text-muted-foreground leading-relaxed">
                {selectedImage.description}
              </DialogDescription>

              <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="font-medium text-foreground">{selectedImage.date}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Telescope className="w-4 h-4" />
                    <span className="text-sm">Telescope</span>
                  </div>
                  <p className="font-medium text-foreground text-sm">{selectedImage.telescope}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Exposure</span>
                  </div>
                  <p className="font-medium text-foreground">{selectedImage.exposure}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedImages.has(selectedImage.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedImages.has(selectedImage.id) ? "fill-current" : ""}`} />
                    {selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)} likes
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
