import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPremiumMembersQuery, useRemoveMemberMutation } from "../../Redux/services/api/clubapi";
import { AiOutlineUserDelete } from "react-icons/ai";

const PremiumMembers = () => {
  const navigate = useNavigate();
  const { data: membersData, isLoading, isError } = useGetPremiumMembersQuery();

  const [removeMember] = useRemoveMemberMutation();
  const [removing, setRemoving] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (isError || !membersData?.premiumMembers?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        No Premium Members Found.
      </div>
    );
  }

  const handleRemove = async (memberId) => {
    if (removing) return;
    setRemoving(true);

    try {
      await removeMember(memberId);
    } catch (error) {
      console.error("Error removing member:", error);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Premium Members</h1>

        <ul className="space-y-4">
          {membersData.premiumMembers.map((member) => (
            <li
              key={member._id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar?.url || "/default-avatar.png"}
                  alt={member.name}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <h2 className="text-lg font-semibold">{member.name}</h2>
                  <p className="text-gray-400">{member.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(member._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                disabled={removing}
              >
                <AiOutlineUserDelete size={20} />
                <span>{removing ? "Removing..." : "Remove"}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumMembers;
