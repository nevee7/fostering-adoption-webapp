"use client"

import { useEffect, useState } from "react"
import { animalService, type Animal } from "@/lib/animals"
import { shelterService } from "@/lib/shelters"
import { NavBar } from "@/components/nav-bar"
import { AnimalCard } from "@/components/animal-card"
import { ShelterSelector } from "@/components/shelter-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, PawPrint } from "lucide-react"

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [speciesFilter, setSpeciesFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("available")
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null)

  useEffect(() => {
    const allAnimals = animalService.getAll()
    setAnimals(allAnimals)
    setFilteredAnimals(allAnimals.filter((a) => a.status === "available"))
  }, [])

  useEffect(() => {
    let filtered = animals

    if (selectedShelterId) {
      filtered = filtered.filter((a) => a.shelterId === selectedShelterId)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter)
    }

    if (speciesFilter !== "all") {
      filtered = filtered.filter((a) => a.species.toLowerCase() === speciesFilter.toLowerCase())
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredAnimals(filtered)
  }, [searchQuery, speciesFilter, statusFilter, selectedShelterId, animals])

  const selectedShelter = selectedShelterId ? shelterService.getById(selectedShelterId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50">
      <NavBar />

      <section className="bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-20">
          <PawPrint className="h-16 w-16" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <PawPrint className="h-20 w-20" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <PawPrint className="h-12 w-12" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-balance flex items-center justify-center gap-3">
            <PawPrint className="h-12 w-12" />
            Find Your Paw-fect Match
            <PawPrint className="h-12 w-12" />
          </h1>
          <p className="text-xl mb-8 text-purple-100 text-pretty">
            Give a loving home to animals in need. Browse our available pets for fostering or adoption.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl cute-shadow p-6 mb-8 border-2 border-pink-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ShelterSelector selectedShelterId={selectedShelterId} onSelectShelter={setSelectedShelterId} />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fuchsia-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name, breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-purple-200 focus:border-fuchsia-400"
              />
            </div>

            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="rounded-full border-purple-200">
                <SelectValue placeholder="All Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-full border-purple-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="fostered">Fostered</SelectItem>
                <SelectItem value="adopted">Adopted</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedShelterId && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setSelectedShelterId(null)}
                variant="outline"
                className="rounded-full border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <PawPrint className="mr-2 h-4 w-4" />
                View All Shelters
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2 flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-purple-500" />
            {filteredAnimals.length} {filteredAnimals.length === 1 ? "Animal" : "Animals"} Found
            {selectedShelter && ` at ${selectedShelter.name}`}
          </h2>
          <p className="text-purple-700">Browse through our wonderful companions looking for homes</p>
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl cute-shadow border-2 border-pink-100">
            <p className="text-xl text-gray-600">No animals found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSpeciesFilter("all")
                setStatusFilter("available")
                setSelectedShelterId(null)
              }}
              className="mt-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
