"use client";
import MergerForm from "@/components/mergers-acquistions/MergerForm";

const MergerAndAcquistion = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between py-5 px-20">
      <h1 className="w-full text-xl font-semibold border-b-2 pb-1">
        Merger and Acquisition agent
      </h1>
      <div className="h-full flex items-center justify-center">
        <MergerForm />
      </div>
    </div>
  );
};

export default MergerAndAcquistion;
