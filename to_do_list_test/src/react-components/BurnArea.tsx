import Tree from "@/backend/Tree";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { clearHighlights } from "@/handlers/DashboardHandlers";

interface BurnAreaProps {
  trees: Tree[],
  setTrees: React.Dispatch<React.SetStateAction<Tree[]>>
}

const BurnArea: React.FC<BurnAreaProps> = ({ trees, setTrees }) => {
  const [active, setActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [card, setCard] = useState<{ id: string, title: string }>();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  }

  const handleDragLeave = () => {
    setActive(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId")
    const cardTitle = trees.find((tree) => tree.id === cardId)?.name;
    if (cardTitle) {
      setCard({ id: cardId, title: cardTitle! });
      setDialogOpen(true);
    }
    setActive(false);
    clearHighlights();
  }

  const handleConfirmDelete = () => {
    if (card) {
      const updatedTrees = trees.filter(tree => tree.id !== card!.id);
      setTrees(updatedTrees);
      setCard(undefined);
      setDialogOpen(false);
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(e) => handleDrop(e)}
        className={`grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl
          ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-neutral-500/20 text-neutral-500"}`}
      >
        Trash
      </div>
      {dialogOpen ? <ConfirmDeleteDialog
        card={card}
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        onConfirm={handleConfirmDelete}
      /> : <></>}

    </div>
  );
}

export default BurnArea;
