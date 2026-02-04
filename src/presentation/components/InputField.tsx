import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  error,
  register,
}: InputFieldProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
      <label
        htmlFor={id}
        className="text-left text-[14px] font-semibold leading-5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="w-full flex flex-col gap-0.5">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-2 rounded-lg border-2 text-[12px] outline-none leading-4 min-h-9 max-h-9 text-gray-600
            ${
              error
                ? "border-red-400 focus:border-red-500 focus-within:border-red-500"
                : "border-gray-300 focus:border-blue-500 focus-within:border-blue-500"
            }`}
          {...register}
        />

        {error && (
          <p className="text-left text-[12px] text-red-500 leading-4">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputField;
