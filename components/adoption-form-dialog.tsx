"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Animal } from "@/lib/animals"
import { applicationService } from "@/lib/applications"
import { animalService } from "@/lib/animals"
import { useAuth } from "@/lib/auth-context"
import { Heart } from "lucide-react"

interface AdoptionFormDialogProps {
  animal: Animal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdoptionFormDialog({ animal, open, onOpenChange }: AdoptionFormDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: user?.email || "",
    applicantPhone: "",
    applicantAddress: "",
    hasExperience: false,
    hasOtherPets: false,
    otherPetsDetails: "",
    reasonForAdoption: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create application
      applicationService.create({
        animalId: animal.id,
        animalName: animal.name,
        ...formData,
      })

      animalService.update(animal.id, { status: "pending" })

      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        setSubmitted(false)
        setFormData({
          applicantName: "",
          applicantEmail: user?.email || "",
          applicantPhone: "",
          applicantAddress: "",
          hasExperience: false,
          hasOtherPets: false,
          otherPetsDetails: "",
          reasonForAdoption: "",
        })
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <DialogTitle className="text-2xl mb-2 text-fuchsia-900">Application Submitted!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for your interest in adopting {animal.name}. We'll review your application and get back to you
              soon!
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-fuchsia-900">Apply to Adopt {animal.name}</DialogTitle>
          <DialogDescription>
            Please fill out this form to apply for adoption. We'll review your application and contact you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.applicantEmail}
                onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.applicantPhone}
                onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                required
                value={formData.applicantAddress}
                onChange={(e) => setFormData({ ...formData, applicantAddress: e.target.value })}
                placeholder="123 Main St, City, State"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience"
                checked={formData.hasExperience}
                onCheckedChange={(checked) => setFormData({ ...formData, hasExperience: checked as boolean })}
              />
              <Label htmlFor="experience" className="font-normal cursor-pointer">
                I have experience with {animal.species.toLowerCase()}s
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="otherPets"
                checked={formData.hasOtherPets}
                onCheckedChange={(checked) => setFormData({ ...formData, hasOtherPets: checked as boolean })}
              />
              <Label htmlFor="otherPets" className="font-normal cursor-pointer">
                I have other pets at home
              </Label>
            </div>

            {formData.hasOtherPets && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="otherPetsDetails">Please describe your other pets</Label>
                <Textarea
                  id="otherPetsDetails"
                  value={formData.otherPetsDetails}
                  onChange={(e) => setFormData({ ...formData, otherPetsDetails: e.target.value })}
                  placeholder="e.g., 2 cats, 1 dog..."
                  rows={2}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Why do you want to adopt {animal.name}? *</Label>
            <Textarea
              id="reason"
              required
              value={formData.reasonForAdoption}
              onChange={(e) => setFormData({ ...formData, reasonForAdoption: e.target.value })}
              placeholder="Tell us why you'd be a great match for this pet..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-fuchsia-600 hover:bg-fuchsia-700">
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
