'use client'

import SomethingWrong from '@/components/error/something-wrong';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html className="h-full">
            <body className='h-full'>
                <SomethingWrong onClick={reset} />
            </body>
        </html>
    )
}
