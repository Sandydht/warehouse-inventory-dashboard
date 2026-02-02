import { useForm } from "react-hook-form";
import type { UserLoginRequestDto } from "../../infrastructure/dto/request/UserLoginRequestDto";
import { useAppDispatch } from "../store/hooks";
import { loginAccount } from "../store/auth/authThunk";
import { toUserLoginDomain } from "../../infrastructure/mappers/authMapper";
import { useNavigate } from "react-router-dom";
import Visibility24pxGray300Icon from "../assets/images/svg/visibility_24px_gray_300.svg";
import VisibilityOff24pxGray300Icon from "../assets/images/svg/visibility_off_24px_gray_300.svg";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFocusInputPassword, setIsFocusInputPassword] =
    useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordRegister = register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: {
      hasLetterAndNumber: (value) =>
        (/[A-Za-z]/.test(value) && /\d/.test(value)) ||
        "Password must contain both letters and numbers",
      noSpaces: (value) =>
        !/\s/.test(value) || "Password must not contain space",
    },
  });

  const onSubmit = async (formData: LoginForm) => {
    try {
      const payload: UserLoginRequestDto = {
        email: formData.email,
        password: formData.password,
      };

      await dispatch(loginAccount(toUserLoginDomain(payload))).unwrap();

      reset();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-full h-full min-h-screen py-30 flex flex-col items-center justify-start bg-linear-to-t from-sky-500 to-indigo-500 p-6.25">
      <form
        className="w-full h-auto p-4 max-w-106.25 bg-white rounded-xl shadow-lg border border-gray-200 gap-4 flex flex-col items-start justify-start"
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
      >
        <div className="w-full h-auto">
          <p className="text-left text-[22px] text-black leading-7">
            Warehouse Inventory Dashboard
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="email"
            className="text-left text-[14px] font-semibold leading-5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <input
              id="email"
              className={`w-full h-auto px-4 py-2 rounded-lg cursor-text border-2 text-left text-[12px] outline-none leading-4 ${errors.email ? "border-red-400 focus:border-red-500 hover:border-red-500" : "border-gray-300 focus:border-blue-500 hover:border-blue-500"}`}
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email is invalid",
                },
              })}
            />
            {errors.email && (
              <p className="text-left text-[12px] text-red-500 leading-4">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="password"
            className="text-left text-[14px] font-semibold leading-5"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <div
              className={`w-full h-auto flex items-center justify-between rounded-lg border-2 overflow-hidden px-4 ${errors.password ? "border-red-400 focus:border-red-500 hover:border-red-500" : isFocusInputPassword ? "border-blue-500 focus:border-blue-500 hover:border-blue-500" : "border-gray-300 focus:border-blue-500 hover:border-blue-500"}`}
            >
              <input
                id="password"
                className="w-full h-auto py-2 cursor-text text-left text-[12px] outline-none leading-4"
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                {...passwordRegister}
                onFocus={() => {
                  setIsFocusInputPassword(true);
                }}
                onBlur={(e) => {
                  passwordRegister.onBlur(e);
                  setIsFocusInputPassword(false);
                }}
              />
              <button
                type="button"
                className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 flex items-center justify-center cursor-pointer outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                <img
                  className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6 object-contain object-center"
                  src={
                    isPasswordVisible
                      ? Visibility24pxGray300Icon
                      : VisibilityOff24pxGray300Icon
                  }
                  alt="Toggle Password Visibility"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-left text-[12px] text-red-500 leading-4">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <button
            className={`w-full h-auto text-white font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 focus:border-blue-500 ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
