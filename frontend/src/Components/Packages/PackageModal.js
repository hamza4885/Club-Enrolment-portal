import { useState } from "react";

const PackageModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [amount, setAmount] = useState(initialData?.amount || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, amount });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Package" : "Create Package"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!!initialData} // Disable name input in edit mode
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Amount</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageModal;
