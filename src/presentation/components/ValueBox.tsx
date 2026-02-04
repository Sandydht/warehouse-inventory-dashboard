import clsx from "clsx";
import type { DiffType } from "./DiffPreview";

interface ValueBoxProps {
  value?: string | number | null;
  type: DiffType;
  variant: "before" | "after";
}

function ValueBox({ value, type, variant }: ValueBoxProps) {
  return (
    <div
      className={clsx(
        "rounded-md px-3 py-2 text-sm",
        type === "unchanged" && "text-gray-500",
        type === "added" &&
          variant === "after" &&
          "bg-green-100 text-green-700",
        type === "removed" &&
          variant === "before" &&
          "bg-red-100 text-red-700 line-through",
        type === "modified" && "bg-yellow-100 text-yellow-800",
      )}
    >
      {value ?? "-"}
    </div>
  );
}

export default ValueBox;
