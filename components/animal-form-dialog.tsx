"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { animalService, type Animal } from "@/lib/animals"
import { shelterService } from "@/lib/shelters"

interface AnimalFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  animal?: Animal
}

export function AnimalFormDialog({ open, onOpenChange, onSuccess, animal }: AnimalFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male" as "Male" | "Female" | "Unknown",
    size: "Medium" as "Small" | "Medium" | "Large" | "Extra Large",
    description: "",
    medicalNotes: "",
    status: "available" as "available" | "fostered" | "adopted" | "pending",
    imageUrl: "",
    shelterId: "",
  })

  const [loading, setLoading] = useState(false)
  const [shelters, setShelters] = useState(shelterService.getAll())

  useEffect(() => {
    setShelters(shelterService.getAll())

    if (animal) {
      setFormData({
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        age: animal.age.toString(),
        gender: animal.gender,
        size: animal.size,
        description: animal.description,
        medicalNotes: animal.medicalNotes,
        status: animal.status,
        imageUrl: animal.imageUrl,
        shelterId: animal.shelterId,
      })
    } else {
      const defaultShelterId = shelters.length > 0 ? shelters[0].id : ""
      setFormData({
        name: "",
        species: "Dog",
        breed: "",
        age: "",
        gender: "Male",
        size: "Medium",
        description: "",
        medicalNotes: "",
        status: "available",
        imageUrl: "",
        shelterId: defaultShelterId,
      })
    }
  }, [animal, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const animalData = {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: Number.parseInt(formData.age),
        gender: formData.gender,
        size: formData.size,
        description: formData.description,
        medicalNotes: formData.medicalNotes,
        status: formData.status,
        imageUrl: formData.imageUrl || "/placeholder.svg?height=400&width=400",
        shelterId: formData.shelterId,
      }

      if (animal) {
        animalService.update(animal.id, animalData)
      } else {
        animalService.create(animalData)
      }

      onSuccess()
    } catch (error) {
      console.error("Failed to save animal:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{animal ? "Edit Animal" : "Add New Animal"}</DialogTitle>
          <DialogDescription>
            {animal
              ? "Update the animal's information below."
              : "Fill in the details to add a new animal to the shelter."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shelter">Shelter *</Label>
            <Select
              value={formData.shelterId}
              onValueChange={(value) => setFormData({ ...formData, shelterId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a shelter" />
              </SelectTrigger>
              <SelectContent>
                {shelters.map((shelter) => (
                  <SelectItem key={shelter.id} value={shelter.id}>
                    {shelter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed *</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: "Male" | "Female" | "Unknown") => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size *</Label>
              <Select
                value={formData.size}
                onValueChange={(value: "Small" | "Medium" | "Large" | "Extra Large") =>
                  setFormData({ ...formData, size: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                  <SelectItem value="Extra Large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "available" | "fostered" | "adopted" | "pending") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="fostered">Fostered</SelectItem>
                  <SelectItem value="adopted">Adopted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="/placeholder.svg?height=400&width=400"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNotes">Medical Notes *</Label>
            <Textarea
              id="medicalNotes"
              rows={3}
              value={formData.medicalNotes}
              onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : animal ? "Update Animal" : "Add Animal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
