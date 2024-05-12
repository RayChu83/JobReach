import { LuSearchX } from "react-icons/lu";

import React from "react";

export default function NoApplications() {
  return (
    <div className="flex flex-col justify-center items-center">
      <LuSearchX className="text-7xl font-bold text-red-500" />
      <h3 className="text-lg font-semibold text-gray-500">No Applications Found</h3>
      <p className="text-gray-500">Recent applications will be displayed here.</p>
    </div>
  );
}
