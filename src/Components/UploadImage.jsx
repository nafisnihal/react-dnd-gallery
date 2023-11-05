import React from "react";

const UploadImage = () => {
  return (
    <div className="border-2 border-dashed rounded-lg py-9 h-full flex flex-col align-middle justify-center gap-5 cursor-not-allowed">
      <img src="/images/imageIcon.png" alt="" className="w-5 mx-auto" />
      <p className="text-center font-semibold">Add Images</p>
    </div>
  );
};

export default UploadImage;
