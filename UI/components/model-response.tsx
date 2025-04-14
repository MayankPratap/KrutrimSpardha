interface ModelResponseProps {
  model: string
  response: string
  responseTime: number
  error?: string
  order: number
  isLoading?: boolean
  colorIndex: number
  isEmpty?: boolean
}

export function ModelResponse({
  model,
  response,
  responseTime,
  error,
  order,
  isLoading,
  colorIndex,
  isEmpty,
}: ModelResponseProps) {
  // Determine border color based on colorIndex
  const getBorderColor = () => {
    switch (colorIndex) {
      case 1:
        return "border-green-500"
      case 2:
        return "border-purple-500"
      case 3:
        return "border-orange-500"
      default:
        return "border-gray-500"
    }
  }

  // Determine text color based on colorIndex
  const getTextColor = () => {
    switch (colorIndex) {
      case 1:
        return "text-green-500"
      case 2:
        return "text-purple-500"
      case 3:
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className={`bg-white/5 rounded-lg p-6 border-2 ${getBorderColor()} min-h-[200px] flex flex-col`}>
      <h3 className={`text-xl font-bold mb-4 ${getTextColor()}`}>
        {model}
        {order > 0 && <span>{order}</span>}
      </h3>

      <div className="mb-2 text-white text-sm">
        {responseTime > 0 ? `Response Time: ${responseTime}ms` : "Response Time: N/A"}
      </div>

      <div className="text-white flex-grow">
        <p className="font-semibold mb-2">Response:</p>
        {isLoading ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        ) : error ? (
          <div className="bg-blue-900/30 text-blue-400 p-2 rounded">{error}</div>
        ) : response ? (
          <div className="whitespace-pre-wrap">{response}</div>
        ) : isEmpty ? (
          <div className="flex items-center justify-center h-24 text-gray-500 italic">
            Enter a prompt and click "Compare All Models" to see results
          </div>
        ) : (
          <div className="text-gray-400 italic">No response received</div>
        )}
      </div>
    </div>
  )
}
