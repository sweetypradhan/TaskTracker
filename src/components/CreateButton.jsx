import { useState } from "react";
import Modal from "./Modal";
import "./styles.css";

function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <button
        onClick={openModal}
        className="flex items-center justify-center p-2 px-4 rounded-3xl bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <div className="text-xl font-bold">+</div>
        <div className="ml-2">Create Task</div>
      </button> */}

      <button
        onClick={openModal}
        className="flex items-center justify-center py-2 px-6 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 transition-all"
      >
        <div className="text-xl font-bold">+</div>
        <div className="ml-2">Create Task</div>
      </button>

      {isModalOpen && <Modal closeModal={closeModal} />} 
    </>
  );
}

export default CreateButton;
