import { useForm } from "react-hook-form";
import type { UserLoginRequestDto } from "../../infrastructure/dto/request/UserLoginRequestDto";
import { useAppDispatch } from "../store/hooks";
import { loginAccount } from "../store/auth/authThunk";
import { toUserLoginDomain } from "../../infrastructure/mappers/authMapper";
import { useNavigate } from "react-router-dom";
import Visibility24pxGray300Icon from "../assets/images/svg/visibility_24px_gray_300.svg";
import VisibilityOff24pxGray300Icon from "../assets/images/svg/visibility_off_24px_gray_300.svg";
import PasswordInput from "../components/PasswordInput";
import InputField from "../components/InputField";
import { resetUserProfileData } from "../store/user/userSlice";
import { showSnackbar } from "../store/snackbar/snackbarSlice";

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailRegister = register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: "Email is invalid",
    },
  });

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
      dispatch(resetUserProfileData());

      reset();
      navigate("/");
    } catch (error) {
      dispatch(showSnackbar({ message: error as string, type: "error" }));
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

        <InputField
          id="email"
          label="Email"
          type="email"
          required={true}
          placeholder="Email"
          register={emailRegister}
          error={errors.email}
        />

        <PasswordInput
          id="password"
          label="Password"
          required={true}
          placeholder="Password"
          register={passwordRegister}
          visibilityIcon={Visibility24pxGray300Icon}
          visibilityOffIcon={VisibilityOff24pxGray300Icon}
          error={errors.password}
        />

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

export default LoginPage;
