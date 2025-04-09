import { Container, Theme } from "@incmix/ui2"
import { Link } from "@tanstack/react-router"
import React from "react"
function App() {
  return (
    <Theme accentColor="blue">
      <Container className="flex h-screen items-center justify-center">
        <div className="text-center text-gray-600">
          <h1 className="font-semibold text-2xl">Welcome to Fihi App</h1>
          <div className="mt-4">
            <Link
              to="/login"
              className="mr-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </Theme>
  )
}
export default App
