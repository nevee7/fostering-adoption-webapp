"use client"

import { animalService } from "./animals"
import { notificationService } from "./notifications"

export interface Application {
  id: string
  animalId: string
  animalName: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantAddress: string
  hasExperience: boolean
  hasOtherPets: boolean
  otherPetsDetails?: string
  reasonForAdoption: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

const APPLICATIONS_STORAGE_KEY = "shelter_applications"

export const applicationService = {
  // Get all applications
  getAll: (): Application[] => {
    if (typeof window === "undefined") return []
    const applications = localStorage.getItem(APPLICATIONS_STORAGE_KEY)
    return applications ? JSON.parse(applications) : []
  },

  // Get applications by animal ID
  getByAnimalId: (animalId: string): Application[] => {
    return applicationService.getAll().filter((a) => a.animalId === animalId)
  },

  // Create new application
  create: (application: Omit<Application, "id" | "createdAt" | "status">): Application => {
    const applications = applicationService.getAll()
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    applications.push(newApplication)
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications))
    return newApplication
  },

  // Update application status
  updateStatus: (id: string, status: "pending" | "approved" | "rejected"): Application | null => {
    const applications = applicationService.getAll()
    const index = applications.findIndex((a) => a.id === id)

    if (index === -1) return null

    const application = applications[index]
    applications[index] = {
      ...application,
      status,
    }

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications))

    if (status === "approved") {
      animalService.update(application.animalId, { status: "adopted" })

      // Create notification for the applicant
      notificationService.create({
        userId: application.applicantEmail,
        title: "Application Approved! 🎉",
        message: `Congratulations! Your application to adopt ${application.animalName} has been approved. We'll contact you soon with next steps.`,
        type: "success",
      })

      // Reject all other pending applications for this animal
      const otherApplications = applications.filter(
        (a) => a.animalId === application.animalId && a.id !== id && a.status === "pending",
      )

      otherApplications.forEach((app) => {
        applicationService.updateStatus(app.id, "rejected")
      })
    } else if (status === "rejected") {
      notificationService.create({
        userId: application.applicantEmail,
        title: "Application Update",
        message: `Thank you for your interest in ${application.animalName}. Unfortunately, we've decided to move forward with another applicant. Please check out our other available pets!`,
        type: "info",
      })
    }

    return applications[index]
  },

  // Delete application
  delete: (id: string): boolean => {
    const applications = applicationService.getAll()
    const filtered = applications.filter((a) => a.id !== id)

    if (filtered.length === applications.length) return false

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(filtered))
    return true
  },
}
