import { Icon } from "@/components/Icon";
import React from "react";

interface Props extends React.PropsWithChildren {
  onClose?: () => void;
}

export function Modal({ children, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 h-screen flex items-center justify-center p-2 animate-fade-in overflow-y-hidden">
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col items-center w-full max-w-md mx-auto rounded-lg bg-[#15151f] shadow-lg z-100 py-5 pb-5 animate-scale-up text-white overflow-y-auto max-h-[90vh]">
          {onClose && (
            <button
              onClick={onClose}
              className="z-50 absolute top-2.5 right-2.5 bg-transparent rounded-full p-2 hover:bg-white hover:bg-opacity-10 transition-opacity duration-200 ease-linear focus:outline-none"
            >
              <Icon.Close2 />
            </button>
          )}
          <div className="flex flex-col items-center justify-center w-full space-y-4 p-5 text-center overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
