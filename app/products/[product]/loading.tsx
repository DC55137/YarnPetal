import Logo from "@/components/Logo";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex justify-center w-full h-screen bg-white">
      <div className="z-20 my-auto">
        <Logo className="w-40 animate-pulse" />
      </div>
    </div>
  );
};

export default loading;
