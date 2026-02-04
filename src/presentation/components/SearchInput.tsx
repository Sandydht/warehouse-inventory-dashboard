import type { ChangeEvent } from "react";
import Search24pxGray300Icon from "../assets/images/svg/search_24px_gray_300.svg";

interface SearchInputProps {
  id?: string;
  value?: string | number;
  placeholder?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({
  id,
  value,
  placeholder = "search...",
  onChange,
}: SearchInputProps) {
  return (
    <div className="w-full h-auto flex items-center justify-start rounded-lg border-2 border-gray-300 focus:border-blue-500 focus-within:border-blue-500 px-4 overflow-hidden gap-2 min-h-9 max-h-9">
      <img
        src={Search24pxGray300Icon}
        alt="Search icon"
        className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
      />

      <input
        id={id}
        type="search"
        className="w-full h-auto py-2 text-[12px] outline-none leading-4 text-gray-600"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchInput;
