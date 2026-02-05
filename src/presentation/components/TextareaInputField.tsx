import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextareaInputFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

function TextareaInputField({
  id,
  label,
  placeholder,
  required = false,
  error,
  register,
}: TextareaInputFieldProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
      <label
        htmlFor={id}
        className="text-left text-[14px] font-semibold leading-5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="w-full flex flex-col gap-0.5">
        <textarea
          id={id}
          placeholder={placeholder}
          {...register}
          className={`w-full h-auto min-h-30 max-h-30 border-2 p-4 rounded-lg leading-4 text-[12px] text-left text-gray-600 resize-none
            ${
              error
                ? "border-red-400 focus:border-red-500 focus-within:border-red-500"
                : "border-gray-300 focus:border-blue-500 focus-within:border-blue-500"
            }`}
        ></textarea>

        {error && (
          <p className="text-left text-[12px] text-red-500 leading-4">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default TextareaInputField;
