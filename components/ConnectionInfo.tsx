"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, Check } from "lucide-react"

export function ConnectionInfo() {
  const [show, setShow] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const connectionString = "mysql://user:password@localhost:3306/mydb"

  const handleCopy = () => {
    navigator.clipboard.writeText(connectionString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // reset หลัง 2 วินาที
  }

  return (
    <div className="relative w-full max-w-xl">
      {/* Input */}
      <Input
        type={show ? "text" : "password"}
        value={connectionString}
        readOnly
        className="pr-28 font-mono"
      />

      {/* Toggle show/hide */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-14 top-0 h-full px-3 hover:bg-transparent"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
      </Button>

      {/* Copy button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500" />
        )}
      </Button>
    </div>
  )
}
