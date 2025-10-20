"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Animal } from "@/lib/animals"
import { Heart, Info, Sparkles } from "lucide-react"
import { useState } from "react"
import { AnimalDetailDialog } from "@/components/animal-detail-dialog"
import { AdoptionFormDialog } from "@/components/adoption-form-dialog"

interface AnimalCardProps {
  animal: Animal
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showAdoptionForm, setShowAdoptionForm] = useState(false)

  const statusColors = {
    available: "bg-gradient-to-r from-green-400 to-emerald-400 text-white",
    fostered: "bg-gradient-to-r from-purple-400 to-violet-400 text-white",
    adopted: "bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white",
    pending: "bg-gradient-to-r from-pink-300 to-rose-300 text-white",
  }

  return (
    <>
      <Card className="overflow-hidden cute-shadow cute-shadow-hover transition-all duration-300 hover:scale-105 border-2 border-pink-100">
        <div className="relative h-64 w-full bg-gradient-to-br from-pink-50 to-purple-50">
          <Image src={animal.imageUrl || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
          <Badge
            className={`absolute top-4 right-4 ${statusColors[animal.status]} rounded-full px-3 py-1 flex items-center gap-1`}
          >
            <Sparkles className="h-3 w-3" />
            {animal.status}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            {animal.name}
          </CardTitle>
          <CardDescription className="text-purple-600">
            {animal.breed} • {animal.age} {animal.age === 1 ? "year" : "years"} old
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="rounded-full border-purple-300 text-purple-700">
              {animal.species}
            </Badge>
            <Badge variant="outline" className="rounded-full border-pink-300 text-pink-700">
              {animal.gender}
            </Badge>
            <Badge variant="outline" className="rounded-full border-fuchsia-300 text-fuchsia-700">
              {animal.size}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{animal.description}</p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={() => setShowDetails(true)} className="flex-1 rounded-full" variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Details
          </Button>
          <Button
            className="flex-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600"
            disabled={animal.status !== "available"}
            onClick={() => setShowAdoptionForm(true)}
          >
            <Heart className="mr-2 h-4 w-4" />
            {animal.status === "available" ? "Adopt" : "Unavailable"}
          </Button>
        </CardFooter>
      </Card>

      <AnimalDetailDialog animal={animal} open={showDetails} onOpenChange={setShowDetails} />
      <AdoptionFormDialog animal={animal} open={showAdoptionForm} onOpenChange={setShowAdoptionForm} />
    </>
  )
}
