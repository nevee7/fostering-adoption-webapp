"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Animal } from "@/lib/animals"
import { Heart, Calendar, Ruler, Stethoscope } from "lucide-react"
import { useState } from "react"
import { AdoptionFormDialog } from "@/components/adoption-form-dialog"

interface AnimalDetailDialogProps {
  animal: Animal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnimalDetailDialog({ animal, open, onOpenChange }: AnimalDetailDialogProps) {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false)

  const statusColors = {
    available: "bg-green-500",
    fostered: "bg-blue-500",
    adopted: "bg-purple-500",
    pending: "bg-yellow-500",
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image src={animal.imageUrl || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
              <Badge className={`absolute top-4 right-4 ${statusColors[animal.status]}`}>{animal.status}</Badge>
            </div>
            <DialogTitle className="text-3xl text-amber-900">{animal.name}</DialogTitle>
            <DialogDescription className="text-lg">
              {animal.breed} • {animal.species}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-semibold">
                    {animal.age} {animal.age === 1 ? "year" : "years"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-semibold">{animal.size}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-amber-900">About {animal.name}</h3>
              <p className="text-gray-700 leading-relaxed">{animal.description}</p>
            </div>

            {/* Medical Notes */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-blue-900">Medical Information</h3>
                  <p className="text-gray-700 leading-relaxed">{animal.medicalNotes}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{animal.species}</Badge>
              <Badge variant="outline">{animal.gender}</Badge>
              <Badge variant="outline">{animal.size}</Badge>
              <Badge variant="outline">{animal.breed}</Badge>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              disabled={animal.status !== "available"}
              onClick={() => {
                onOpenChange(false)
                setShowAdoptionForm(true)
              }}
            >
              <Heart className="mr-2 h-4 w-4" />
              {animal.status === "available" ? "Apply to Adopt" : "Unavailable"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adoption Form Dialog */}
      <AdoptionFormDialog animal={animal} open={showAdoptionForm} onOpenChange={setShowAdoptionForm} />
    </>
  )
}
