export default function FormError({ message }: { message?: string }) {
    return (
        <div aria-live="polite" aria-atomic="true">
            {message ? <p className="mt-2 text-sm text-red-500">{message}</p> : null}
        </div>
    )
}