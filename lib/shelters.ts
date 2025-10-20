"use client"

export interface Shelter {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  latitude: number
  longitude: number
  description: string
  createdAt: string
  updatedAt: string
}

const SHELTERS_STORAGE_KEY = "shelters"

// Initialize with sample shelters in Timisoara
const initializeShelters = () => {
  if (typeof window === "undefined") return

  const existingShelters = localStorage.getItem(SHELTERS_STORAGE_KEY)
  if (!existingShelters) {
    const sampleShelters: Shelter[] = [
      {
        id: "1",
        name: "Timisoara Central Animal Shelter",
        address: "Strada Fabricii 12",
        city: "Timisoara",
        phone: "+40 256 123 456",
        email: "contact@centralshelter.ro",
        latitude: 45.7489,
        longitude: 21.2087,
        description: "Main animal shelter in Timisoara, caring for dogs and cats since 2005.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Happy Paws Rescue Center",
        address: "Bulevardul Liviu Rebreanu 45",
        city: "Timisoara",
        phone: "+40 256 234 567",
        email: "info@happypaws.ro",
        latitude: 45.7537,
        longitude: 21.2257,
        description: "Specialized in rescuing and rehabilitating abandoned pets.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Furry Friends Sanctuary",
        address: "Strada Circumvalatiunii 78",
        city: "Timisoara",
        phone: "+40 256 345 678",
        email: "hello@furryfriends.ro",
        latitude: 45.7412,
        longitude: 21.1987,
        description: "A safe haven for cats and small animals in need of loving homes.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem(SHELTERS_STORAGE_KEY, JSON.stringify(sampleShelters))
  }
}

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const shelterService = {
  // Get all shelters
  getAll: (): Shelter[] => {
    if (typeof window === "undefined") return []
    initializeShelters()
    const shelters = localStorage.getItem(SHELTERS_STORAGE_KEY)
    return shelters ? JSON.parse(shelters) : []
  },

  // Get shelter by ID
  getById: (id: string): Shelter | null => {
    const shelters = shelterService.getAll()
    return shelters.find((s) => s.id === id) || null
  },

  // Get shelters sorted by distance from user location
  getNearby: (userLat: number, userLon: number): (Shelter & { distance: number })[] => {
    const shelters = shelterService.getAll()
    return shelters
      .map((shelter) => ({
        ...shelter,
        distance: calculateDistance(userLat, userLon, shelter.latitude, shelter.longitude),
      }))
      .sort((a, b) => a.distance - b.distance)
  },

  // Create new shelter
  create: (shelter: Omit<Shelter, "id" | "createdAt" | "updatedAt">): Shelter => {
    const shelters = shelterService.getAll()
    const newShelter: Shelter = {
      ...shelter,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    shelters.push(newShelter)
    localStorage.setItem(SHELTERS_STORAGE_KEY, JSON.stringify(shelters))
    return newShelter
  },

  // Update shelter
  update: (id: string, updates: Partial<Omit<Shelter, "id" | "createdAt">>): Shelter | null => {
    const shelters = shelterService.getAll()
    const index = shelters.findIndex((s) => s.id === id)

    if (index === -1) return null

    shelters[index] = {
      ...shelters[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(SHELTERS_STORAGE_KEY, JSON.stringify(shelters))
    return shelters[index]
  },

  // Delete shelter
  delete: (id: string): boolean => {
    const shelters = shelterService.getAll()
    const filtered = shelters.filter((s) => s.id !== id)

    if (filtered.length === shelters.length) return false

    localStorage.setItem(SHELTERS_STORAGE_KEY, JSON.stringify(filtered))
    return true
  },
}
