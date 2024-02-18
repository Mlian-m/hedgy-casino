import toast, { Toaster } from "react-hot-toast";

import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useToastStore } from "../../hooks/useToast";

const customToastStyle = {
  borderRadius: "10px",
  background: "#ffffff",
  color: "#333333",
};

export default function Toasts() {
  const toasts = useToastStore((state) => state.toasts);
  const showAll = useMediaQuery("sm");

  React.useEffect(() => {
    toasts.forEach((t) => {
      toast(t.description, {
        duration: 10000,
        style: customToastStyle,
        id: t.id,
      });
    });
  }, [toasts, showAll]);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{ top: 60 }}
      />
    </div>
  );
}
