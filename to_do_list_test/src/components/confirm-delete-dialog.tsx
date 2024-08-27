import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from './ui/button';

interface ConfirmDeleteDialogProps {
  open: boolean;
  card: {id:string, title:string} | undefined;
  setDialogOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, setDialogOpen, card, onConfirm }) => {
  return (
  <Dialog open={open} onOpenChange={setDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="dark:text-slate-300 text-3xl">Delete "{card ? card.title : ""}"?</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        This will permanently delete this tree.
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button variant="destructive" type="submit" onClick={() => onConfirm()}>Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
};
