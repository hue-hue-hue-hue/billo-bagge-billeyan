import React from "react";
import { motion } from "framer-motion";

const AnimatedIcon = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Render the main icon */}
      <svg viewBox="0 0 100 100">
        <path d="..." />
      </svg>
    </motion.div>
  );
};

const AnimatedPath = () => {
  return (
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      d="..."
    />
  );
};

const UserInterfaceButton = ({ label }: { label: string }) => {
  return (
    <button className="bg-gray-900 text-white px-4 py-2 rounded-md">
      {label}
    </button>
  );
};

const FlowDiagram = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <AnimatedIcon />
        <AnimatedPath />
      </div>
      <div className="ml-8 space-y-4">
        <UserInterfaceButton label="Triage bugs" />
        <UserInterfaceButton label="De-duplicate tasks" />
        <UserInterfaceButton label="Auto-team" />
        <UserInterfaceButton label="Auto-fill attributes" />
      </div>
    </div>
  );
};

export default FlowDiagram;
