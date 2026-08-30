"use client"

import { useState, useEffect } from "react"
import { testApi } from "@/lib/api/movieApi"
import Header from "@/components/Header"
import { useAuth } from "@/lib/auth/AuthContext"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ApiTestPage() {
  const [testResult, setTestResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      const runTest = async () => {
        try {
          setLoading(true)
          const result = await testApi()
          setTestResult(JSON.stringify(result, null, 2))
        } catch (error: any) {
          setTestResult(`Error: ${error?.message || String(error)}`)
        } finally {
          setLoading(false)
        }
      }

      runTest()
    }
  }, [user])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">API Test</h1>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
            </div>
          ) : (
            <pre className="bg-gray-900 p-4 rounded-md text-gray-300 overflow-x-auto">{testResult}</pre>
          )}
        </div>
      </div>
    </div>
  )
}
