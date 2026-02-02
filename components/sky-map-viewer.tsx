"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw, Star, Info, Compass, Clock } from "lucide-react"

interface CelestialObject {
  id: string
  name: string
  type: "star" | "planet" | "constellation"
  x: number
  y: number
  magnitude: number
  constellation?: string
  description: string
}

const celestialObjects: CelestialObject[] = [
  { id: "polaris", name: "Polaris", type: "star", x: 50, y: 15, magnitude: 2.0, constellation: "Ursa Minor", description: "The North Star, a guiding beacon for navigators throughout history." },
  { id: "sirius", name: "Sirius", type: "star", x: 25, y: 65, magnitude: -1.46, constellation: "Canis Major", description: "The brightest star in the night sky, also known as the Dog Star." },
  { id: "betelgeuse", name: "Betelgeuse", type: "star", x: 35, y: 45, magnitude: 0.42, constellation: "Orion", description: "A red supergiant star, one of the largest visible to the naked eye." },
  { id: "rigel", name: "Rigel", type: "star", x: 32, y: 55, magnitude: 0.13, constellation: "Orion", description: "A blue supergiant star, the brightest star in the Orion constellation." },
  { id: "vega", name: "Vega", type: "star", x: 70, y: 25, magnitude: 0.03, constellation: "Lyra", description: "One of the brightest stars, part of the Summer Triangle." },
  { id: "arcturus", name: "Arcturus", type: "star", x: 55, y: 35, magnitude: -0.05, constellation: "Boötes", description: "A red giant star, the brightest in the northern celestial hemisphere." },
  { id: "capella", name: "Capella", type: "star", x: 45, y: 20, magnitude: 0.08, constellation: "Auriga", description: "A bright yellow giant star, the sixth brightest in the night sky." },
  { id: "aldebaran", name: "Aldebaran", type: "star", x: 40, y: 40, magnitude: 0.85, constellation: "Taurus", description: "A red giant star, the eye of the bull in Taurus." },
  { id: "mars", name: "Mars", type: "planet", x: 60, y: 50, magnitude: -2.0, description: "The Red Planet, fourth from the Sun." },
  { id: "jupiter", name: "Jupiter", type: "planet", x: 75, y: 45, magnitude: -2.5, description: "The largest planet in our solar system." },
  { id: "saturn", name: "Saturn", type: "planet", x: 80, y: 55, magnitude: 0.5, description: "The ringed planet, known for its stunning ring system." },
]

const constellationLines = [
  { from: "betelgeuse", to: "rigel" },
  { from: "polaris", to: "capella" },
]

export function SkyMapViewer() {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLabels, setShowLabels] = useState(true)
  const [filterType, setFilterType] = useState<"all" | "star" | "planet">("all")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const drawSkyMap = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Clear and set background
    ctx.fillStyle = "#0a0a12"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw background stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 1.5
      const opacity = Math.random() * 0.5 + 0.2
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fill()
    }

    // Draw constellation lines
    ctx.strokeStyle = "rgba(100, 150, 255, 0.3)"
    ctx.lineWidth = 1
    constellationLines.forEach(line => {
      const from = celestialObjects.find(o => o.id === line.from)
      const to = celestialObjects.find(o => o.id === line.to)
      if (from && to) {
        const fromX = (from.x / 100) * canvas.width
        const fromY = (from.y / 100) * canvas.height
        const toX = (to.x / 100) * canvas.width
        const toY = (to.y / 100) * canvas.height
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.stroke()
      }
    })

    // Draw celestial objects
    celestialObjects.forEach(obj => {
      if (filterType !== "all" && obj.type !== filterType) return

      const x = (obj.x / 100) * canvas.width
      const y = (obj.y / 100) * canvas.height
      const baseSize = Math.max(3, 8 - obj.magnitude * 1.5)
      const size = baseSize * zoom

      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
      if (obj.type === "planet") {
        gradient.addColorStop(0, "rgba(255, 180, 100, 0.8)")
        gradient.addColorStop(0.5, "rgba(255, 180, 100, 0.2)")
        gradient.addColorStop(1, "rgba(255, 180, 100, 0)")
      } else {
        gradient.addColorStop(0, "rgba(200, 220, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(200, 220, 255, 0.2)")
        gradient.addColorStop(1, "rgba(200, 220, 255, 0)")
      }
      ctx.beginPath()
      ctx.arc(x, y, size * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = obj.type === "planet" ? "#ffb464" : "#e8f0ff"
      ctx.fill()

      // Label
      if (showLabels && zoom >= 1) {
        ctx.font = "12px Inter, sans-serif"
        ctx.fillStyle = obj === selectedObject ? "#ffffff" : "rgba(255, 255, 255, 0.7)"
        ctx.textAlign = "center"
        ctx.fillText(obj.name, x, y + size + 16)
      }

      // Selection indicator
      if (obj === selectedObject) {
        ctx.strokeStyle = "#64a0ff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, size + 8, 0, Math.PI * 2)
        ctx.stroke()
      }
    })

    // Compass directions
    ctx.font = "14px Inter, sans-serif"
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.textAlign = "center"
    ctx.fillText("N", canvas.width / 2, 20)
    ctx.fillText("S", canvas.width / 2, canvas.height - 10)
    ctx.fillText("E", canvas.width - 15, canvas.height / 2)
    ctx.fillText("W", 15, canvas.height / 2)
  }, [zoom, selectedObject, showLabels, filterType])

  useEffect(() => {
    drawSkyMap()
    window.addEventListener("resize", drawSkyMap)
    return () => window.removeEventListener("resize", drawSkyMap)
  }, [drawSkyMap])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100
    const clickY = ((e.clientY - rect.top) / rect.height) * 100

    const clicked = celestialObjects.find(obj => {
      if (filterType !== "all" && obj.type !== filterType) return false
      const distance = Math.sqrt(Math.pow(obj.x - clickX, 2) + Math.pow(obj.y - clickY, 2))
      return distance < 5
    })

    setSelectedObject(clicked || null)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Controls Bar */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(zoom + 0.25, 3))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => { setZoom(1); setRotation(0); }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter:</span>
                {(["all", "star", "planet"] as const).map(type => (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>Looking North</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sky Map Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 h-[60vh] lg:h-[calc(100vh-8rem)] relative cursor-crosshair"
        >
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card/50 p-4 lg:h-[calc(100vh-8rem)] overflow-y-auto">
          {selectedObject ? (
            <Card className="bg-secondary/50 border-border">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {selectedObject.type === "planet" ? "Planet" : "Star"}
                    </Badge>
                    <CardTitle className="text-xl">{selectedObject.name}</CardTitle>
                  </div>
                  <Star className="w-5 h-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedObject.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Magnitude</span>
                    <p className="font-medium text-foreground">{selectedObject.magnitude}</p>
                  </div>
                  {selectedObject.constellation && (
                    <div>
                      <span className="text-muted-foreground">Constellation</span>
                      <p className="font-medium text-foreground">{selectedObject.constellation}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <Info className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Select an Object</h3>
              <p className="text-sm text-muted-foreground">
                Click on any star or planet to view detailed information about it.
              </p>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-semibold text-foreground mb-3">Visible Tonight</h4>
            <div className="space-y-2">
              {celestialObjects
                .filter(obj => filterType === "all" || obj.type === filterType)
                .slice(0, 6)
                .map(obj => (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObject(obj)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-colors ${
                      selectedObject?.id === obj.id 
                        ? "bg-primary/20 text-foreground" 
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${obj.type === "planet" ? "bg-accent" : "bg-primary"}`} />
                      {obj.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {obj.magnitude > 0 ? "+" : ""}{obj.magnitude}
                    </Badge>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
