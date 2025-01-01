import { FaEdit, FaTrash, FaIdBadge, FaStar, FaCrown } from "react-icons/fa";

const PackageCard = ({ pkg, onEdit, onDelete }) => {
  const getIcon = (name) => {
    if (name.toLowerCase() === "basic") return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />;
    if (name.toLowerCase() === "premium") return <FaStar className="w-12 h-12 mx-auto mb-4" />;
    if (name.toLowerCase() === "elite") return <FaCrown className="w-12 h-12 mx-auto mb-4" />;
    return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />; // Default icon
  };

  return (
    <div className="bg-gray-700 text-yellow-300 p-6 rounded-md shadow-md text-center relative">
      {getIcon(pkg.name)}
      <h4 className="font-semibold text-xl">{pkg.name}</h4>
      <div className="flex justify-center gap-10 mt-2">
        <p>${pkg.amount}/month</p>
        <button onClick={() => onEdit(pkg)} className="text-blue-400 hover:text-blue-300">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(pkg._id)} className="text-red-400 hover:text-red-300">
          <FaTrash />
        </button>
      </div>
      <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
        Join Now
      </button>
    </div>
  );
};

export default PackageCard;
