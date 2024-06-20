import Missing from "@/components/error/missing";

export default function NotFound() {
    return (
        <Missing
            missingThing="item"
            backLink="/admin/items"
        />
    )
}