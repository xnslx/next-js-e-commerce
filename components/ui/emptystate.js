import React from "react";
import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="mt-12">
      <h1 className=" w-3/5 text-base ml-auto mr-auto text-center font-bold leading-7 mb-2 font-mono">
        Browsing something else. There are so much fun.
      </h1>
      <div className="lg:w-2/5 lg:ml-auto lg:mr-auto ">
        <Image
          src="/image/emptystate.png"
          width={480}
          height={480}
          className=""
        />
      </div>
    </div>
  );
};

export default EmptyState;
