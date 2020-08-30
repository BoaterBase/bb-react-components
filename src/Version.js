import React from "react";
import { useBoaterBase } from "./BoaterBase";

/**
 * Display the BoaterBase version number when correctly wrapped in the BoaterBase provider.
 */
const Version = () => {
  const { version } = useBoaterBase();
  return (
    <span className="bb-inline-flex bb-items-end">
      <span className="bb-text-blue-500 bb-font-semibold">Boater</span>
      <span className="bb-text-orange-500 bb-font-semibold">Base</span>
      <small className="bb-ml-1 bb-text-gray-400 bb-opacity-75 bb-text-xs">
        𝗏{version || "No Provider"}
      </small>
    </span>
  );
};

export default Version;
