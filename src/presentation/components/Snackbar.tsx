import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { removeSnackbar } from "../store/snackbar/snackbarSlice";

const typeColors: Record<string, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

function Snackbar() {
  const dispatch = useDispatch<AppDispatch>();
  const snackbars = useSelector((state: RootState) => state.snackbar.list);
  const [visibleSnackbars, setVisibleSnackbars] = useState<number[]>([]);

  useEffect(() => {
    snackbars.forEach((s) => {
      if (!visibleSnackbars.includes(s.id)) {
        setVisibleSnackbars((prev) => [...prev, s.id]);

        setTimeout(() => {
          setVisibleSnackbars((prev) => prev.filter((id) => id !== s.id));
          setTimeout(() => dispatch(removeSnackbar(s.id)), 300);
        }, s.duration);
      }
    });
  }, [snackbars, visibleSnackbars, dispatch]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50">
      {snackbars.map((s) => {
        const isVisible = visibleSnackbars.includes(s.id);

        return (
          <div
            key={s.id}
            className={`
                min-w-62.5 max-w-sm text-white px-4 py-2 text-left text-[12px] leading-4 font-semibold rounded shadow-lg transform transition-all duration-300 ease-in-out text
                ${typeColors[s.type]}
                ${isVisible ? "opacity-100 translate-y-0" : "-translate-y-6 opacity-0"}
              `}
          >
            {s.message}
          </div>
        );
      })}
    </div>
  );
}

export default Snackbar;
