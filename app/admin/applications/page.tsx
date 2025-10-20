"use client"

import { useEffect, useState } from "react"
import { applicationService, type Application } from "@/lib/applications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Mail, Phone, MapPin, PawPrint, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = () => {
    const apps = applicationService.getAll()
    setApplications(apps)
  }

  const handleStatusUpdate = (id: string, status: "approved" | "rejected") => {
    applicationService.updateStatus(id, status)
    loadApplications()
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleDelete = () => {
    if (deleteId) {
      applicationService.delete(deleteId)
      loadApplications()
      setDeleteId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-purple-900 mb-2">Adoption Applications</h1>
        <p className="text-purple-600">Review and manage adoption applications from potential pet parents</p>
      </div>

      {applications.length === 0 ? (
        <Card className="border-purple-200">
          <CardContent className="p-12 text-center">
            <PawPrint className="h-16 w-16 text-purple-300 mx-auto mb-4" />
            <p className="text-purple-600 text-lg">No applications yet</p>
            <p className="text-purple-500 text-sm mt-2">Applications will appear here when users submit them</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <Card key={app.id} className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-purple-900">{app.applicantName}</CardTitle>
                    <CardDescription className="text-purple-600 mt-1">
                      Applying for: <span className="font-semibold">{app.animalName}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(app.status)}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(app.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{app.applicantEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{app.applicantPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{app.applicantAddress}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-semibold text-purple-900">Pet Experience:</span>{" "}
                      <span className="text-purple-700">{app.hasExperience ? "Yes" : "No"}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-purple-900">Other Pets:</span>{" "}
                      <span className="text-purple-700">{app.hasOtherPets ? "Yes" : "No"}</span>
                    </div>
                    {app.hasOtherPets && app.otherPetsDetails && (
                      <div className="text-sm">
                        <span className="font-semibold text-purple-900">Details:</span>{" "}
                        <span className="text-purple-700">{app.otherPetsDetails}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-purple-900 mb-2">Reason for Adoption:</h4>
                  <p className="text-purple-700 text-sm bg-purple-50 p-4 rounded-lg">{app.reasonForAdoption}</p>
                </div>

                <div className="text-xs text-purple-500 mb-4">
                  Submitted: {new Date(app.createdAt).toLocaleDateString()} at{" "}
                  {new Date(app.createdAt).toLocaleTimeString()}
                </div>

                {app.status === "pending" && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(app.id, "approved")}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(app.id, "rejected")}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
