'use client'

import SomethingWrong from "@/components/error/something-wrong"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <SomethingWrong onClick={reset} />
  )
}