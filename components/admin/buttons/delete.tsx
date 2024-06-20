import { Trash2Icon } from "lucide-react";

export default function Delete({ id, active, action }: { id: number, active: boolean, action: Function }) {
  const actionWithId = action.bind(null, id);

  return (
    <form action={actionWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-inherit" disabled={!active} aria-disabled={!active}>
        <span className="sr-only">Delete</span>
        <Trash2Icon className="w-5" />
      </button>
    </form>
  );
}