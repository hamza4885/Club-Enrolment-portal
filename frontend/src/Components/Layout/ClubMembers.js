import React from "react";
import { useParams } from "react-router-dom";
import { useGetClubMembersQuery, useRemoveClubMemberMutation } from "../../Redux/services/api/clubapi";


const ClubMembers = () => {
    
  const { clubId } = useParams();

  const { data, isLoading, isError } = useGetClubMembersQuery(clubId);

  const [removeMember] = useRemoveClubMemberMutation();

  const handleRemove = async (memberId) => {
    try {

      await removeMember({ clubId, memberId }).unwrap();
    } catch (err) {
      alert(`Error removing member: ${err.message}`);
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-400">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-500">Error fetching members</p>;

  const members = data?.members || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Club Members</h2>

        {members.length === 0 ? (
          <p className="text-gray-400">No members in this club.</p>
        ) : (
          <ul className="space-y-4">
            {members.map((member) => (
              <li key={member._id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                <div>
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
                <button
                  onClick={() => handleRemove(member?._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClubMembers;
