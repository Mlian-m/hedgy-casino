// src/utils/toastResults.tsx

interface ToastOptions {
  icon: string;
  duration: number;
  style: {
    borderRadius: string;
    color: string;
  };
}

export const toastWin = (toast: any) => {
  toast.success(`🎉 Congratulations! You won 🎉`, {
    icon: "🥳",
    duration: 5000,
    style: {
      borderRadius: "10px",
      color: "#fff",
    },
  });
};

export const toastLose = (toast: any) => {
  toast.error(`Better luck next time! 🍀`, {
    icon: "😞",
    duration: 5000,
    style: {
      borderRadius: "10px",
      color: "#fff",
    },
  } as ToastOptions);
};
