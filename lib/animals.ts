"use client"

export interface Animal {
  id: string
  name: string
  species: string
  breed: string
  age: number
  gender: "Male" | "Female" | "Unknown"
  size: "Small" | "Medium" | "Large" | "Extra Large"
  description: string
  medicalNotes: string
  status: "available" | "fostered" | "adopted" | "pending"
  imageUrl: string
  shelterId: string // Added shelterId to link animals to shelters
  createdAt: string
  updatedAt: string
}

const ANIMALS_STORAGE_KEY = "shelter_animals"

const migrateAnimalsWithShelters = () => {
  if (typeof window === "undefined") return

  const existingAnimals = localStorage.getItem(ANIMALS_STORAGE_KEY)
  if (existingAnimals) {
    const animals: Animal[] = JSON.parse(existingAnimals)
    let needsUpdate = false

    // Assign shelterIds to animals that don't have them
    const updatedAnimals = animals.map((animal, index) => {
      if (!animal.shelterId) {
        needsUpdate = true
        // Distribute animals across shelters 1, 2, and 3
        const shelterId = ((index % 3) + 1).toString()
        return { ...animal, shelterId }
      }
      return animal
    })

    if (needsUpdate) {
      localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(updatedAnimals))
    }
  }
}

// Initialize with sample data
const initializeAnimals = () => {
  if (typeof window === "undefined") return

  const existingAnimals = localStorage.getItem(ANIMALS_STORAGE_KEY)
  if (!existingAnimals) {
    const sampleAnimals: Animal[] = [
      {
        id: "1",
        name: "Max",
        species: "Dog",
        breed: "Golden Retriever",
        age: 3,
        gender: "Male",
        size: "Large",
        description:
          "Max is a friendly and energetic golden retriever who loves to play fetch and go on long walks. He is great with kids and other dogs.",
        medicalNotes: "Up to date on all vaccinations. Neutered.",
        status: "available",
        imageUrl: "/golden-retriever.png",
        shelterId: "1", // Assigned to Timisoara Central
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Luna",
        species: "Cat",
        breed: "Siamese",
        age: 2,
        gender: "Female",
        size: "Small",
        description:
          "Luna is a gentle and affectionate cat who enjoys quiet environments. She loves to cuddle and purr on your lap.",
        medicalNotes: "Spayed. Indoor cat only.",
        status: "available",
        imageUrl: "/siamese-cat.png",
        shelterId: "2", // Assigned to Happy Paws
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Charlie",
        species: "Dog",
        breed: "Labrador Mix",
        age: 5,
        gender: "Male",
        size: "Large",
        description:
          "Charlie is a loyal companion who has been with us for a while. He is calm, well-trained, and perfect for a family.",
        medicalNotes: "Neutered. Requires regular exercise.",
        status: "available",
        imageUrl: "/labrador-mix-dog.png",
        shelterId: "1", // Assigned to Timisoara Central
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "4",
        name: "Bella",
        species: "Cat",
        breed: "Tabby",
        age: 1,
        gender: "Female",
        size: "Small",
        description: "Bella is a playful kitten full of energy. She loves toys and exploring new places.",
        medicalNotes: "All vaccinations current. Spayed.",
        status: "available",
        imageUrl: "/tabby-kitten.png",
        shelterId: "3", // Assigned to Furry Friends
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "5",
        name: "Rocky",
        species: "Dog",
        breed: "German Shepherd",
        age: 4,
        gender: "Male",
        size: "Large",
        description:
          "Rocky is a protective and intelligent dog. He would do best in a home with experienced dog owners.",
        medicalNotes: "Neutered. Requires training and socialization.",
        status: "fostered",
        imageUrl: "/german-shepherd.png",
        shelterId: "2", // Assigned to Happy Paws
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "6",
        name: "Whiskers",
        species: "Cat",
        breed: "Persian",
        age: 6,
        gender: "Male",
        size: "Medium",
        description:
          "Whiskers is a senior cat looking for a quiet retirement home. He is very calm and loves to nap in sunny spots.",
        medicalNotes: "Senior care needed. Regular vet checkups.",
        status: "available",
        imageUrl: "/fluffy-persian-cat.png",
        shelterId: "3", // Assigned to Furry Friends
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "7",
        name: "Daisy",
        species: "Dog",
        breed: "Beagle",
        age: 2,
        gender: "Female",
        size: "Medium",
        description:
          "Daisy is an adventurous beagle with a great nose! She loves exploring and would be perfect for an active family.",
        medicalNotes: "Spayed. Up to date on vaccinations.",
        status: "available",
        imageUrl: "/beagle-dog.png",
        shelterId: "1", // Assigned to Timisoara Central
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "8",
        name: "Mittens",
        species: "Cat",
        breed: "Calico",
        age: 3,
        gender: "Female",
        size: "Small",
        description: "Mittens is a sweet and independent cat. She enjoys both playtime and relaxation.",
        medicalNotes: "Spayed. Good with other cats.",
        status: "adopted",
        imageUrl: "/calico-cat.png",
        shelterId: "2", // Assigned to Happy Paws
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "9",
        name: "Buddy",
        species: "Dog",
        breed: "Poodle",
        age: 3,
        gender: "Male",
        size: "Medium",
        description: "Buddy is a smart and playful poodle who loves learning new tricks and playing with toys.",
        medicalNotes: "Neutered. Hypoallergenic coat.",
        status: "available",
        imageUrl: "/white-poodle-dog.jpg",
        shelterId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "10",
        name: "Shadow",
        species: "Cat",
        breed: "Black Cat",
        age: 4,
        gender: "Male",
        size: "Medium",
        description: "Shadow is a mysterious and affectionate black cat who loves quiet companionship.",
        medicalNotes: "Neutered. Indoor only.",
        status: "available",
        imageUrl: "/black-cat-portrait.png",
        shelterId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "11",
        name: "Rosie",
        species: "Dog",
        breed: "Cocker Spaniel",
        age: 2,
        gender: "Female",
        size: "Medium",
        description: "Rosie is a gentle and loving spaniel with beautiful golden fur. Perfect family dog.",
        medicalNotes: "Spayed. All vaccinations current.",
        status: "available",
        imageUrl: "/cocker-spaniel-dog.jpg",
        shelterId: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "12",
        name: "Ginger",
        species: "Cat",
        breed: "Orange Tabby",
        age: 1,
        gender: "Female",
        size: "Small",
        description: "Ginger is a playful orange kitten with lots of energy and curiosity.",
        medicalNotes: "Spayed. Healthy and active.",
        status: "available",
        imageUrl: "/orange-tabby-kitten.jpg",
        shelterId: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "13",
        name: "Duke",
        species: "Dog",
        breed: "Boxer",
        age: 5,
        gender: "Male",
        size: "Large",
        description: "Duke is a strong and loyal boxer who loves to play and protect his family.",
        medicalNotes: "Neutered. Requires daily exercise.",
        status: "available",
        imageUrl: "/boxer-dog.png",
        shelterId: "3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "14",
        name: "Snowball",
        species: "Cat",
        breed: "White Persian",
        age: 3,
        gender: "Female",
        size: "Small",
        description: "Snowball is a fluffy white Persian cat who loves being pampered and groomed.",
        medicalNotes: "Spayed. Requires regular grooming.",
        status: "available",
        imageUrl: "/white-persian-cat.jpg",
        shelterId: "3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(sampleAnimals))
  } else {
    migrateAnimalsWithShelters()
  }
}

export const animalService = {
  // Get all animals
  getAll: (): Animal[] => {
    if (typeof window === "undefined") return []
    initializeAnimals()
    const animals = localStorage.getItem(ANIMALS_STORAGE_KEY)
    return animals ? JSON.parse(animals) : []
  },

  // Get animal by ID
  getById: (id: string): Animal | null => {
    const animals = animalService.getAll()
    return animals.find((a) => a.id === id) || null
  },

  // Get available animals
  getAvailable: (): Animal[] => {
    return animalService.getAll().filter((a) => a.status === "available")
  },

  // Create new animal
  create: (animal: Omit<Animal, "id" | "createdAt" | "updatedAt">): Animal => {
    const animals = animalService.getAll()
    const newAnimal: Animal = {
      ...animal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    animals.push(newAnimal)
    localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(animals))
    return newAnimal
  },

  // Update animal
  update: (id: string, updates: Partial<Omit<Animal, "id" | "createdAt">>): Animal | null => {
    const animals = animalService.getAll()
    const index = animals.findIndex((a) => a.id === id)

    if (index === -1) return null

    animals[index] = {
      ...animals[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(animals))
    return animals[index]
  },

  // Delete animal
  delete: (id: string): boolean => {
    const animals = animalService.getAll()
    const filtered = animals.filter((a) => a.id !== id)

    if (filtered.length === animals.length) return false

    localStorage.setItem(ANIMALS_STORAGE_KEY, JSON.stringify(filtered))
    return true
  },

  getByShelter: (shelterId: string): Animal[] => {
    return animalService.getAll().filter((a) => a.shelterId === shelterId)
  },

  getAnimalStatus: (animalId: string): "available" | "pending" | "fostered" | "adopted" => {
    const animal = animalService.getById(animalId)
    if (!animal) return "available"

    // If already adopted or fostered, return that status
    if (animal.status === "adopted" || animal.status === "fostered") {
      return animal.status
    }

    // Check if there are pending applications
    if (typeof window !== "undefined") {
      const applications = (window as any).applicationService?.getByAnimalId?.(animalId) || []
      const hasPendingApplications = applications.some((app: any) => app.status === "pending")

      if (hasPendingApplications) {
        return "pending"
      }
    }

    return "available"
  },
}
