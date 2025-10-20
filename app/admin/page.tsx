"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { animalService, type Animal } from "@/lib/animals"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AdminAnimalTable } from "@/components/admin-animal-table"
import { AnimalFormDialog } from "@/components/animal-form-dialog"

export default function AdminPage() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadAnimals()
  }, [])

  const loadAnimals = () => {
    const allAnimals = animalService.getAll()
    setAnimals(allAnimals)
  }

  const handleAdd = () => {
    setShowAddDialog(true)
  }

  const handleAddSuccess = () => {
    loadAnimals()
    setShowAddDialog(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="bg-white rounded-3xl cute-shadow border-2 border-purple-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-purple-700 mt-1">Manage animals in the shelter system</p>
          </div>
          <Button
            onClick={handleAdd}
            size="lg"
            className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Animal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200">
            <p className="text-sm text-green-600 font-semibold">Available</p>
            <p className="text-3xl font-bold text-green-700">
              {animals.filter((a) => a.status === "available").length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
            <p className="text-sm text-blue-600 font-semibold">Fostered</p>
            <p className="text-3xl font-bold text-blue-700">{animals.filter((a) => a.status === "fostered").length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <p className="text-sm text-purple-600 font-semibold">Adopted</p>
            <p className="text-3xl font-bold text-purple-700">{animals.filter((a) => a.status === "adopted").length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200">
            <p className="text-sm text-yellow-600 font-semibold">Pending</p>
            <p className="text-3xl font-bold text-yellow-700">{animals.filter((a) => a.status === "pending").length}</p>
          </div>
        </div>

        <AdminAnimalTable animals={animals} onUpdate={loadAnimals} />
      </div>

      <AnimalFormDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={handleAddSuccess} />
    </div>
  )
}
