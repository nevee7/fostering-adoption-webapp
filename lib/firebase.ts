import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if all required Firebase config values are present
function isFirebaseConfigValid(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  )
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | null = null
let auth: Auth | null = null

if (typeof window !== "undefined") {
  if (isFirebaseConfigValid()) {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
      auth = getAuth(app)
    } catch (error) {
      console.error("[v0] Firebase initialization error:", error)
    }
  } else {
    console.warn(
      "[v0] Firebase configuration is incomplete. Please add all required environment variables:\n" +
        "- NEXT_PUBLIC_FIREBASE_API_KEY\n" +
        "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
        "- NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" +
        "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n" +
        "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n" +
        "- NEXT_PUBLIC_FIREBASE_APP_ID",
    )
  }
}

export { auth, isFirebaseConfigValid }
