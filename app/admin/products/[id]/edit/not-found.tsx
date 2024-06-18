import Missing from "@/components/error/missing";

export default function NotFound() {
    return (
        <Missing
            missingThing="box"
            backLink="/admin/products"
        />
    )
}