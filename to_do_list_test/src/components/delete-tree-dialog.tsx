import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

interface ConfirmDeleteDialogProps {
  name: string | undefined
  onConfirm: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export const DeleteTreeDialog: React.FC<ConfirmDeleteDialogProps> = ({
  name,
  onConfirm,
  triggerRef,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Hidden button that can be programmatically clicked */}
        <Button ref={triggerRef} className="hidden">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-slate-300 text-3xl">
            Delete "{name}"?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>This will permanently delete this tree.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button variant="destructive" type='submit' onClick={onConfirm}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
