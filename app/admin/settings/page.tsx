"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Building2, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
          Settings
        </h1>
        <p className="text-purple-700 mb-6">Manage your account settings and preferences</p>

        <div className="grid gap-6 max-w-2xl">
          <Card className="border-purple-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-purple-900">Account Information</CardTitle>
              <CardDescription>Your current account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-purple-800">Email</Label>
                <Input value={user?.email || ""} disabled className="border-purple-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-800">User ID</Label>
                <Input value={user?.uid || ""} disabled className="border-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Shelter Configuration
              </CardTitle>
              <CardDescription>Customize your shelter information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200 border-dashed">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-purple-700 text-sm">Exciting new features are on the way!</p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-3 text-purple-600">
                    <Building2 className="h-4 w-4" />
                    <span>Shelter name and branding</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-600">
                    <MapPin className="h-4 w-4" />
                    <span>Location and address details</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-600">
                    <Phone className="h-4 w-4" />
                    <span>Contact information</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-600">
                    <Mail className="h-4 w-4" />
                    <span>Email notifications settings</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-600">
                    <Clock className="h-4 w-4" />
                    <span>Operating hours configuration</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
