"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ModelResponse } from "@/components/model-response"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface ModelResult {
  model: string
  response: string
  responseTime: number
  error?: string
  order: number
}

// Define models at the component level so they can be used throughout
const MODELS = [
  { id: "openai", name: "OpenAI (GPT-4o)", color: "green" },
  { id: "anthropic", name: "Anthropic (Claude)", color: "purple" },
  { id: "ollama", name: "Ollama (llama3.2)", color: "orange" },
]

export function LLMComparisonApp() {
  const [prompt, setPrompt] = useState("")
  const API_URL = " https://05f2-2409-40f2-118a-158e-48ad-1c44-1a7b-534d.ngrok-free.app/api/v1/compare" // Change this value to update the API endpoint
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ModelResult[]>([])
  const { toast } = useToast()

  async function handleCompare() {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResults([])

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      

      // Sort results by response time
      const sortedResults = data.results.sort((a: ModelResult, b: ModelResult) => a.responseTime - b.responseTime)

      // Add order property
      const resultsWithOrder = sortedResults.map((result: ModelResult, index: number) => ({
        ...result,
        order: index + 1,
      }))

      setResults(resultsWithOrder)
    } catch (error) {
      console.error("Error fetching results:", error)

      // Create mock error results for demonstration
      const mockErrorResults = MODELS.map((model, index) => ({
        model: model.name,
        response: "",
        responseTime: 0,
        error: "Error: Failed to fetch",
        order: index + 1,
      }))

      setResults(mockErrorResults)

      toast({
        title: "Error",
        description: "Failed to connect to API server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Exploring Different LLM Models</h1>
      </header>

      {/* Input Section */}
      <div className="bg-white/5 rounded-lg p-6 mb-8">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="min-h-[100px] w-full bg-white text-black rounded-lg p-4 resize-none"
          />
          <div className="absolute right-4 top-4">
            {prompt && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPrompt("")}
                className="text-gray-500 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleCompare}
            disabled={isLoading || !prompt.trim()}
            className="bg-[#E50914] hover:bg-[#B81D24] text-white font-medium px-6"
          >
            {isLoading ? "Comparing..." : "Compare All Models"}
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        {results.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-2">Response Order:</h2>
            <ol className="list-decimal list-inside space-y-1 text-white pl-4">
              {results
                .sort((a, b) => a.order - b.order)
                .map((result) => {
                  const isFastest = result.order === 1
                  return (
                    <li key={result.model} className={isFastest ? "text-green-400" : "text-white"}>
                      {result.model} {isFastest ? "(fastest)" : ""}
                    </li>
                  )
                })}
            </ol>
          </div>
        )}

        {/* Model Responses - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MODELS.map((model, index) => {
            // Find result for this model if it exists
            const result = results.find((r) => r.model === model.name)

            return (
              <ModelResponse
                key={model.id}
                model={model.name}
                response={result?.response || ""}
                responseTime={result?.responseTime || 0}
                error={result?.error}
                order={result?.order || 0}
                isLoading={isLoading}
                colorIndex={index + 1}
                isEmpty={!result && !isLoading}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
