// src/components/ui/Modal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (typeof Dialog === "undefined") {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ margin: "auto" }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      size="sm"
      open={isOpen}
      handler={onClose}
      className="p-4 z-[100]"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      style={{ margin: "auto" }}
    >
      <DialogHeader className="relative">
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="space-y-4 pb-6">{children}</DialogBody>
    </Dialog>
  );
};

export default Modal;
