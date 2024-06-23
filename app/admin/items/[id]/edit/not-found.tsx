import Missing from "@/components/error/missing";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Not found',
  };

export default function NotFound() {
    return (
        <Missing
            missingThing="item"
            backLink="/admin/items"
        />
    )
}