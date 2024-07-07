import { useState } from "react";

export const AllMembers = () => {
  const [members, setMembers] = useState([]);
  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Members</h1>
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-11/12 flex justify-around gap-10"
        >
            <img src="" alt="" />
          <h1>Name: member.name</h1>
        </div>
      ))}
    </div>
  );
};
