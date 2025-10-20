"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { shelterService, type Shelter } from "@/lib/shelters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, Plus, Pencil, Trash2, MapPin, Phone, Mail } from "lucide-react"

export default function SheltersPage() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "Timisoara",
    phone: "",
    email: "",
    latitude: 45.7489,
    longitude: 21.2087,
    description: "",
  })

  useEffect(() => {
    loadShelters()
  }, [])

  const loadShelters = () => {
    const allShelters = shelterService.getAll()
    setShelters(allShelters)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingShelter) {
      shelterService.update(editingShelter.id, formData)
    } else {
      shelterService.create(formData)
    }

    loadShelters()
    handleCloseDialog()
  }

  const handleEdit = (shelter: Shelter) => {
    setEditingShelter(shelter)
    setFormData({
      name: shelter.name,
      address: shelter.address,
      city: shelter.city,
      phone: shelter.phone,
      email: shelter.email,
      latitude: shelter.latitude,
      longitude: shelter.longitude,
      description: shelter.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this shelter? This action cannot be undone.")) {
      shelterService.delete(id)
      loadShelters()
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingShelter(null)
    setFormData({
      name: "",
      address: "",
      city: "Timisoara",
      phone: "",
      email: "",
      latitude: 45.7489,
      longitude: 21.2087,
      description: "",
    })
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
            <Building2 className="h-8 w-8 text-purple-500" />
            Shelter Management
          </h1>
          <p className="text-purple-700 mt-1">Manage shelters in Timisoara</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Shelter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingShelter ? "Edit Shelter" : "Add New Shelter"}</DialogTitle>
              <DialogDescription>
                {editingShelter ? "Update shelter information" : "Add a new shelter to the system"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Shelter Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: Number.parseFloat(e.target.value) })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: Number.parseFloat(e.target.value) })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="rounded-full bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                >
                  {editingShelter ? "Update" : "Create"} Shelter
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="bg-white rounded-3xl cute-shadow border-2 border-purple-100 p-6 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-purple-500" />
                  <h3 className="text-xl font-bold text-purple-900">{shelter.name}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-purple-700">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-purple-500" />
                    <div>
                      <p className="font-medium">{shelter.address}</p>
                      <p className="text-sm text-purple-600">{shelter.city}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span>{shelter.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <Mail className="h-4 w-4 text-purple-500" />
                      <span className="truncate">{shelter.email}</span>
                    </div>
                  </div>
                </div>

                {shelter.description && (
                  <p className="text-purple-600 text-sm leading-relaxed">{shelter.description}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(shelter)}
                  className="rounded-full border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(shelter.id)}
                  className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {shelters.length === 0 && (
          <div className="bg-purple-50 rounded-3xl border-2 border-dashed border-purple-300 p-12 text-center">
            <Building2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">No shelters yet</h3>
            <p className="text-purple-600 mb-4">Get started by adding your first shelter</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Shelter
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
