import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type PasswordInputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegisterReturn;
  visibilityIcon: string;
  visibilityOffIcon: string;
};

function PasswordInput({
  id = "password",
  label = "Password",
  placeholder = "Password",
  required = false,
  error,
  register,
  visibilityIcon,
  visibilityOffIcon,
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
      <label
        htmlFor={id}
        className="text-left text-[14px] font-semibold leading-5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="w-full h-auto flex flex-col gap-0.5">
        <div
          className={`w-full flex items-center justify-between rounded-lg border-2 px-4 overflow-hidden
            ${
              error
                ? "border-red-400 focus:border-red-500 hover:border-red-500"
                : isFocused
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-blue-500"
            }`}
        >
          <input
            id={id}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            className="w-full py-2 text-[12px] outline-none leading-4"
            {...register}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              register.onBlur(e);
              setIsFocused(false);
            }}
          />

          <button
            type="button"
            className="min-w-6 min-h-6 flex items-center justify-center outline-none focus:border-2 focus:border-blue-500 rounded"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            <img
              src={isVisible ? visibilityIcon : visibilityOffIcon}
              alt="Toggle password visibility"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>

        {error && (
          <p className="text-left text-[12px] text-red-500 leading-4">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
