"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Telescope, Clock, Users, Check, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TelescopeOption {
  id: string
  name: string
  aperture: string
  type: string
  features: string[]
  pricePerHour: number
  available: boolean
}

const telescopes: TelescopeOption[] = [
  {
    id: "celestron-14",
    name: "Celestron EdgeHD 14\"",
    aperture: "14 inch",
    type: "Schmidt-Cassegrain",
    features: ["Deep sky imaging", "Planetary observation", "Computerized tracking"],
    pricePerHour: 75,
    available: true,
  },
  {
    id: "meade-lx200",
    name: "Meade LX200 16\"",
    aperture: "16 inch",
    type: "Schmidt-Cassegrain",
    features: ["Premium optics", "GPS alignment", "Advanced tracking"],
    pricePerHour: 95,
    available: true,
  },
  {
    id: "takahashi",
    name: "Takahashi TOA-150",
    aperture: "150mm",
    type: "Apochromatic Refractor",
    features: ["Astrophotography", "Wide field views", "Exceptional clarity"],
    pricePerHour: 85,
    available: false,
  },
]

const timeSlots = [
  { id: "evening-early", label: "7:00 PM - 9:00 PM", period: "Early Evening" },
  { id: "evening-late", label: "9:00 PM - 11:00 PM", period: "Late Evening" },
  { id: "night-early", label: "11:00 PM - 1:00 AM", period: "Early Night" },
  { id: "night-late", label: "1:00 AM - 3:00 AM", period: "Late Night" },
]

export function BookingSystem() {
  const [step, setStep] = useState(1)
  const [selectedTelescope, setSelectedTelescope] = useState<TelescopeOption | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [guests, setGuests] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleSubmit = () => {
    setBookingComplete(true)
  }

  const totalPrice = selectedTelescope ? selectedTelescope.pricePerHour * 2 : 0

  if (bookingComplete) {
    return (
      <Card className="max-w-2xl mx-auto bg-card border-border">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your telescope session has been reserved. Check your email for confirmation details.
          </p>
          
          <div className="bg-secondary/50 rounded-lg p-6 text-left mb-6">
            <h3 className="font-semibold text-foreground mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telescope</span>
                <span className="text-foreground font-medium">{selectedTelescope?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground font-medium">
                  {selectedDate ? format(selectedDate, "PPP") : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground font-medium">
                  {timeSlots.find(t => t.id === selectedTime)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span className="text-foreground font-medium">{guests}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="text-foreground font-semibold">Total</span>
                <span className="text-foreground font-bold">${totalPrice}</span>
              </div>
            </div>
          </div>

          <Button onClick={() => {
            setBookingComplete(false)
            setStep(1)
            setSelectedTelescope(null)
            setSelectedDate(undefined)
            setSelectedTime(null)
            setGuests(1)
            setFormData({ name: "", email: "", phone: "", notes: "" })
          }}>
            Book Another Session
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => s < step && setStep(s)}
              disabled={s > step}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </button>
            {s < 4 && (
              <div className={cn(
                "w-16 sm:w-24 h-1 mx-2",
                step > s ? "bg-primary" : "bg-secondary"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Telescope */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Choose Your Telescope
          </h2>
          <div className="grid gap-4">
            {telescopes.map((telescope) => (
              <Card
                key={telescope.id}
                className={cn(
                  "cursor-pointer transition-all border-border",
                  !telescope.available && "opacity-50 cursor-not-allowed",
                  selectedTelescope?.id === telescope.id && "border-primary ring-2 ring-primary/20"
                )}
                onClick={() => telescope.available && setSelectedTelescope(telescope)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Telescope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{telescope.name}</h3>
                          {!telescope.available && (
                            <Badge variant="secondary">Unavailable</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {telescope.aperture} {telescope.type}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {telescope.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">${telescope.pricePerHour}</div>
                      <div className="text-sm text-muted-foreground">per hour</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedTelescope}
              size="lg"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Select Date & Time
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border border-border"
                />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Time Slot
                </CardTitle>
                <CardDescription>2-hour observation sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTime(slot.id)}
                      className={cn(
                        "w-full p-4 rounded-lg border text-left transition-all",
                        selectedTime === slot.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="font-medium text-foreground">{slot.label}</div>
                      <div className="text-sm text-muted-foreground">{slot.period}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!selectedDate || !selectedTime}
              size="lg"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Guest Details */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Details
          </h2>
          <Card className="bg-card border-border max-w-xl mx-auto">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Number of Guests
                </Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium text-foreground w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(4, guests + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">(Max 4 guests)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific celestial objects you'd like to observe?"
                  className="bg-input border-border"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(4)}
              disabled={!formData.name || !formData.email}
              size="lg"
            >
              Review Booking
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Review Your Booking
          </h2>
          <Card className="bg-card border-border max-w-xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Telescope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedTelescope?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTelescope?.aperture} {selectedTelescope?.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <p className="font-medium text-foreground">
                      {selectedDate ? format(selectedDate, "PPP") : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time</span>
                    <p className="font-medium text-foreground">
                      {timeSlots.find(t => t.id === selectedTime)?.label}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Guests</span>
                    <p className="font-medium text-foreground">{guests} {guests === 1 ? "person" : "people"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration</span>
                    <p className="font-medium text-foreground">2 hours</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-foreground font-semibold">Total Price</span>
                    <span className="text-foreground font-bold">${totalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment will be collected at the observatory
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(3)}>
              Back
            </Button>
            <Button onClick={handleSubmit} size="lg">
              <Star className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
