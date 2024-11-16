import Logo from "@/components/LogoHeader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex justify-center w-full h-screen bg-white">
      <div className="z-20 my-auto">
        <Logo className="" />
      </div>
    </div>
  );
};

export default loading;
