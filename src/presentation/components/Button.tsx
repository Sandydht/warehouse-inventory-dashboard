interface ButtonProps {
  type: "primary" | "secondary" | "danger";
  id: string;
  buttonType: "button" | "submit";
  label: string;
  disabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  type = "primary",
  id,
  buttonType = "button",
  label,
  disabled = false,
  onClick,
}: ButtonProps) {
  if (type === "secondary") {
    return (
      <button
        id={id}
        type={buttonType}
        className={`w-full h-auto text-white font-bold text-center py-2 px-4 rounded-lg text-[14px] leading-5 focus:border-blue-500 min-h-9 max-h-9 ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else if (type === "danger") {
    return (
      <button
        id={id}
        type={buttonType}
        className={`w-full h-auto px-4 py-2 rounded-lg text-center text-[14px] leading-5 font-bold text-white focus:border-blue-500 min-h-9 max-h-9 ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 cursor-pointer"}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        id={id}
        type={buttonType}
        className={`w-full h-auto px-4 py-2 text-center text-[14px] leading-5 font-bold rounded-lg focus:border-blue-500 text-white min-h-9 max-h-9 ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 cursor-pointer"}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

export default Button;
