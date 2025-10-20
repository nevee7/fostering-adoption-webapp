"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Animal } from "@/lib/animals"
import { animalService } from "@/lib/animals"
import { Pencil, Trash2 } from "lucide-react"
import { AnimalFormDialog } from "@/components/animal-form-dialog"
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

interface AdminAnimalTableProps {
  animals: Animal[]
  onUpdate: () => void
}

export function AdminAnimalTable({ animals, onUpdate }: AdminAnimalTableProps) {
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [deletingAnimal, setDeletingAnimal] = useState<Animal | null>(null)

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal)
  }

  const handleDelete = (animal: Animal) => {
    setDeletingAnimal(animal)
  }

  const confirmDelete = () => {
    if (deletingAnimal) {
      animalService.delete(deletingAnimal.id)
      setDeletingAnimal(null)
      onUpdate()
    }
  }

  const handleEditSuccess = () => {
    setEditingAnimal(null)
    onUpdate()
  }

  const statusColors = {
    available: "bg-green-500",
    fostered: "bg-blue-500",
    adopted: "bg-purple-500",
    pending: "bg-yellow-500",
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No animals found. Add your first animal to get started.
                </TableCell>
              </TableRow>
            ) : (
              animals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell className="font-semibold">{animal.name}</TableCell>
                  <TableCell>{animal.species}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.gender}</TableCell>
                  <TableCell>{animal.size}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[animal.status]}>{animal.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(animal)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(animal)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingAnimal && (
        <AnimalFormDialog
          open={!!editingAnimal}
          onOpenChange={(open) => !open && setEditingAnimal(null)}
          onSuccess={handleEditSuccess}
          animal={editingAnimal}
        />
      )}

      <AlertDialog open={!!deletingAnimal} onOpenChange={(open) => !open && setDeletingAnimal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingAnimal?.name} from the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
