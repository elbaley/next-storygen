"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertStore } from "@/store/storeAlert";

export const Alert = () => {
  const { open, setOpen, data } = useAlertStore((state) => state);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.title}</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-break-spaces">
            {data.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {data.action && (
            <AlertDialogAction
              onClick={async () => {
                await data.action?.onClick();
              }}
            >
              {data.action.label}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
