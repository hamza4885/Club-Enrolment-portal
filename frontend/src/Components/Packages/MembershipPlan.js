import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaIdBadge, FaStar, FaCrown } from "react-icons/fa";
import {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} from "../../Redux/services/api/packagesapi";


const MembershipPlans = ({clubId}) => {
  const { data: packages, isLoading, isError } = useGetAllPackagesQuery(clubId);
  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ clubId: clubId || "", name: "", amount: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  
  const openModal = (packageData = null) => {
    if (packageData) {
      setModalData(packageData);
      setIsEditMode(true);
    } else {
      setModalData({ clubId,name: "", amount: "" });
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  
  const handleSave = async () => {
    if (isEditMode) {
      await updatePackage(modalData);
    } else {
        await createPackage({ ...modalData, clubId });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deletePackage(id);
    }
  };
  const getPackageIcon = (name) => {
    switch (name) {
      case "Basic":
        return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />;
      case "Premium":
        return <FaStar className="w-12 h-12 mx-auto mb-4" />;
      case "Elite":
        return <FaCrown className="w-12 h-12 mx-auto mb-4" />;
      default:
        return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />;
    }
}

  return (
    <section id="membership" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
      <div className="flex flex-col items-center mb-8">
           <h3 className="text-3xl font-bold text-yellow-300 text-center">Membership Plans</h3>
           <button
             onClick={() => openModal()}
             className="mt-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition flex items-center gap-2"
           >
             <FaPlus className="mr-2" /> Add Package
           </button>
       </div>


        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching packages.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages?.map((pkg) => (
            <div key={pkg._id} className="bg-gray-700 text-yellow-300 p-6 rounded-md shadow-md text-center">
                {getPackageIcon(pkg.name)}
              <h4 className="font-semibold text-xl">{pkg.name}</h4>
              <div className="flex gap-5 ml-28 mt-2">
                <p>${pkg.amount}/month</p>
                <div className="flex gap-2">
                  <button onClick={() => openModal(pkg)} className="text-blue-400 hover:text-blue-300">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(pkg._id)} className="text-red-400 hover:text-red-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-md w-96">
            <h2 className="text-xl font-bold text-yellow-300 mb-4">{isEditMode ? "Edit Package" : "Create Package"}</h2>
            <input
              type="text"
              className="w-full p-2 rounded mb-2 text-black"
              placeholder="Package Name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 rounded mb-2 text-black"
              placeholder="Amount"
              value={modalData.amount}
              onChange={(e) => setModalData({ ...modalData, amount: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                {isEditMode ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MembershipPlans;
