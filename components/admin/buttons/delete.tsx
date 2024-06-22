"use client"

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Delete({ id, active, itemName, action }: { id: number, active: boolean, itemName: string, action: Function }) {
  const onClick = () => {
    action.apply(null, [id])
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="rounded-md border p-2 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-inherit" disabled={!active} aria-disabled={!active}>
          <span className="sr-only">Delete</span>
          <Trash2Icon className="w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete this {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Once deleted, you won't be able to recover this {itemName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}