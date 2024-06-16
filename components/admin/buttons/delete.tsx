import { Trash2Icon } from "lucide-react";

export default function Delete({ type, id, action }: { type: string, id: number, action: Function }) {
  const actionWithId = action.bind(null, id);

  return (
    <form action={actionWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2Icon className="w-5" />
      </button>
    </form>
  );
}