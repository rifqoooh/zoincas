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

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  action: string;
  onChange: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  description,
  action,
  onChange,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="gap-2" onClick={onConfirm}>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
