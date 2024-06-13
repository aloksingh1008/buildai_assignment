import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  console.log(children);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center items-center">
      <div className="bg-white p-4 rounded justify-center text-center w-[300px] h-[150px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
