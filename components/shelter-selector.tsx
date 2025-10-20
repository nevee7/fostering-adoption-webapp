"use client"

import { useState, useEffect } from "react"
import { shelterService, type Shelter } from "@/lib/shelters"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Navigation, Phone, Mail, Building2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ShelterSelectorProps {
  selectedShelterId: string | null
  onSelectShelter: (shelterId: string | null) => void
}

export function ShelterSelector({ selectedShelterId, onSelectShelter }: ShelterSelectorProps) {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [nearbyShelters, setNearbyShelters] = useState<(Shelter & { distance: number })[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [open, setOpen] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    const allShelters = shelterService.getAll()
    setShelters(allShelters)
  }, [])

  const handleFindNearest = () => {
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lon: longitude })
        const nearby = shelterService.getNearby(latitude, longitude)
        setNearbyShelters(nearby)
        setLocationError(null)
      },
      (error) => {
        // Handle different geolocation errors gracefully
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location access was denied. Please enable location permissions to find nearby shelters.")
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError("Location information is unavailable. Please try again.")
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Location request timed out. Please try again.")
        } else {
          setLocationError("Unable to get your location. Please try again.")
        }
      },
    )
  }

  const selectedShelter = selectedShelterId ? shelterService.getById(selectedShelterId) : null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-white cute-shadow"
        >
          <Building2 className="mr-2 h-5 w-5 flex-shrink-0" />
          <span className="truncate max-w-[150px]">{selectedShelter ? selectedShelter.name : "All Shelters"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Choose a Shelter
          </DialogTitle>
          <DialogDescription>Browse animals from different shelters in Timisoara</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onSelectShelter(null)
                setOpen(false)
              }}
              variant={selectedShelterId === null ? "default" : "outline"}
              className="flex-1 rounded-full"
            >
              All Shelters
            </Button>
            <Button onClick={handleFindNearest} variant="outline" className="rounded-full bg-transparent">
              <Navigation className="mr-2 h-4 w-4" />
              Find Nearest
            </Button>
          </div>

          {locationError && (
            <Alert className="border-purple-300 bg-purple-50">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-900">{locationError}</AlertDescription>
            </Alert>
          )}

          {nearbyShelters.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Nearest Shelters
              </h3>
              <div className="space-y-2">
                {nearbyShelters.map((shelter) => (
                  <div
                    key={shelter.id}
                    className="bg-white p-3 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() => {
                      onSelectShelter(shelter.id)
                      setOpen(false)
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-purple-900">{shelter.name}</h4>
                        <p className="text-sm text-purple-600">{shelter.address}</p>
                      </div>
                      <Badge variant="secondary" className="bg-purple-200 text-purple-900">
                        {shelter.distance.toFixed(1)} km
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold text-purple-900">All Shelters in Timisoara</h3>
            {shelters.map((shelter) => (
              <div
                key={shelter.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedShelterId === shelter.id
                    ? "border-purple-500 bg-purple-50"
                    : "border-purple-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                }`}
                onClick={() => {
                  onSelectShelter(shelter.id)
                  setOpen(false)
                }}
              >
                <h4 className="font-bold text-lg text-purple-900 mb-2">{shelter.name}</h4>
                <p className="text-sm text-purple-700 mb-3">{shelter.description}</p>
                <div className="space-y-1 text-sm text-purple-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {shelter.address}, {shelter.city}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {shelter.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {shelter.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
