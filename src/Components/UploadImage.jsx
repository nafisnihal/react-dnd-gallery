import React from "react";

const UploadImage = () => {
  return (
    <div className="border border-dashed rounded-lg py-6 md:py-10 h-full flex flex-col align-middle justify-center gap-5 cursor-none">
      <img src="/images/imageIcon.png" alt="" className="w-5 mx-auto" />
      <p className="text-center font-semibold">Add Images</p>
    </div>
  );
};

export default UploadImage;
