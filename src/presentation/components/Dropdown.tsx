import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import ExpandMore24pxGray300Icon from "../assets/images/svg/expand_more_24px_gray_300.svg";

interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownProps {
  id?: string;
  items: DropdownItem[];
  value?: DropdownItem["value"];
  onChange?: (item: DropdownItem) => void;
  placeholder?: string;
}

function Dropdown({
  id,
  items,
  value,
  onChange,
  placeholder = "Select",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const selectedItem = items.find((i) => i.value === value);

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div id={id} ref={ref} className="w-full h-auto relative">
      <button
        type="button"
        className="w-full h-auto px-4 py-2 border-2 border-gray-300 focus:border-blue-500 focus-within:border-blue-500 min-h-9 max-h-9 flex items-center justify-center gap-2 rounded-lg cursor-pointer text-center text-[14px] leading-5 text-gray-600"
        onClick={() => setOpen(!open)}
      >
        {selectedItem?.label ?? placeholder}

        <img
          src={ExpandMore24pxGray300Icon}
          alt="Expand more icon"
          className={`w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 transition-all ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="w-full h-auto absolute top-10 right-0 overflow-y-auto z-40 bg-white border border-gray-200 shadow-md rounded-lg flex flex-col items-start justify-start">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange?.(item);
                setOpen(false);
              }}
              className="w-full h-auto px-4 py-2 border-b border-gray-100 cursor-pointer text-center text-[14px] leading-5 text-gray-600"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
