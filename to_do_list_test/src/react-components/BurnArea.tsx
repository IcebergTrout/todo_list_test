import { useState, useRef } from "react";
import { DeleteTreeDialog } from "@/components/delete-tree-dialog";
import Tree from "@/backend/Tree";
import { clearHighlights } from "@/handlers/DashboardHandlers";

interface BurnAreaProps {
  trees: Tree[];
  setTrees: React.Dispatch<React.SetStateAction<Tree[]>>;
}

const BurnArea: React.FC<BurnAreaProps> = ({ trees, setTrees }) => {
  const [active, setActive] = useState(false);
  const [cardId, setCardId] = useState<string | undefined>();
  const [cardTitle, setCardTitle] = useState<string>("");
  const triggerRef = useRef<HTMLButtonElement | null>(null); // Ref for dialog trigger

  const openDialog = () => {
    // Trigger the hidden button inside the ConfirmDeleteDialog to open the dialog
    triggerRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const tempId = e.dataTransfer.getData("cardId");
    const tempTitle = trees.find((tree) => tree.id === tempId)?.name;
    if (tempTitle) {
      setCardTitle(tempTitle);
      setCardId(tempId);
      openDialog(); // Open the dialog programmatically
    }
    setActive(false);
    clearHighlights();
  };

  const handleConfirmDelete = () => {
    if (cardId) {
      const updatedTrees = trees.filter((tree) => tree.id !== cardId);
      setTrees(updatedTrees);
      setCardId(undefined);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
          active
            ? "border-red-800 bg-red-800/20 text-red-500"
            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
      >
        Trash
      </div>

      <DeleteTreeDialog
        name={cardTitle}
        onConfirm={handleConfirmDelete}
        triggerRef={triggerRef} // Pass the ref down to ConfirmDeleteDialog
      />
    </div>
  );
};

export default BurnArea;
