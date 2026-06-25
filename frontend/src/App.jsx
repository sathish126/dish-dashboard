import React from 'react'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Dish Management Dashboard
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage dish publication status
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Dashboard />
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dish Dashboard. Assignment Submission.
        </div>
      </footer>
    </div>
  )
}

export default App
