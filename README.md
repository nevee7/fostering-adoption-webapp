# Fostering & Adoption Portal

A complete cat shelter admin portal built with Next.js 14, Firebase Authentication, and Tailwind CSS.

## Features

- **Firebase Authentication**: Secure email/password authentication
- **Protected Routes**: Admin dashboard with route protection
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **CRUD Operations**: Complete animal management (Create, Read, Update, Delete)
- **Sidebar Navigation**: Responsive sidebar for admin navigation
- **Form Validation**: Client-side validation for all forms
- **Real-time Auth State**: Auth context provider for app-wide authentication state

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Authentication** > **Email/Password** sign-in method
4. Go to **Project Settings** > **General** > **Your apps**
5. Click **Web app** (</>) and register your app
6. Copy the Firebase configuration values

### Installation

1. Clone or download this project

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating an Admin Account

1. Navigate to `/signup` or click "Sign up" on the login page
2. Enter your email and password (minimum 6 characters)
3. Click "Sign Up" to create your account
4. You'll be automatically redirected to the admin dashboard

### Admin Dashboard

The admin dashboard (`/admin`) includes:

- **Dashboard Overview**: Statistics for available, fostered, adopted, and pending animals
- **Animal Management**: View, add, edit, and delete animals
- **Sidebar Navigation**: Easy access to different sections
- **Responsive Design**: Works on mobile, tablet, and desktop

### Protected Routes

All routes under `/admin` are protected and require authentication. Unauthenticated users are automatically redirected to the login page.

## Project Structure

\`\`\`
├── app/
│   ├── admin/           # Protected admin routes
│   │   ├── layout.tsx   # Admin layout with sidebar
│   │   └── page.tsx     # Admin dashboard
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   └── layout.tsx       # Root layout with AuthProvider
├── components/
│   ├── admin-sidebar.tsx        # Responsive sidebar navigation
│   ├── protected-route.tsx      # Route protection component
│   ├── nav-bar.tsx              # Public navigation bar
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── firebase.ts              # Firebase configuration
│   ├── auth-context.tsx         # Auth context provider
│   └── animals.ts               # Animal data management
└── .env.local                   # Environment variables (not in git)
\`\`\`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **Firebase Auth**: Authentication service
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Lucide React**: Icon library

## Security Features

- Firebase Authentication for secure user management
- Protected routes with automatic redirects
- Client-side form validation
- Environment variables for sensitive configuration
- Auth state persistence across page reloads

## Development

### Adding New Routes

To add a new protected route:

1. Create your page under `app/admin/your-route/page.tsx`
2. The route is automatically protected by the admin layout
3. Add navigation link to `components/admin-sidebar.tsx`

### Customizing Authentication

The auth logic is centralized in `lib/auth-context.tsx`. You can extend it to add:
- Password reset functionality
- Email verification
- OAuth providers (Google, GitHub, etc.)
- Custom user profiles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your Firebase environment variables in Vercel project settings
4. Deploy!

### Environment Variables on Vercel

Make sure to add all `NEXT_PUBLIC_FIREBASE_*` variables in your Vercel project settings under **Settings** > **Environment Variables**.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on the repository.
\`\`\`

```tsx file="" isHidden
