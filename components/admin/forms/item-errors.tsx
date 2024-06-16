export default function ItemErrors({ id, errors }: { id: string, errors?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {
                errors && errors.map((error) => (
                    <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                ))
            }
        </div>
    )
}