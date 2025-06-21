import { redirect } from "next/navigation"

export default function HomePage() {
  // For demo purposes, redirect to login
  // In production, check server session here
  redirect("/login")
}
