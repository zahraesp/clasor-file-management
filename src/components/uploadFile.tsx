import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { UploadFileIcon } from "../assets/svg";
import { toast } from "react-toastify";
import { ILocalImage } from "../interface";

interface IProps {
  onUploadFile?: (file: any, showCropper: boolean) => void;
  showCropper: boolean;
  setShowCropper: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalImage: React.Dispatch<React.SetStateAction<ILocalImage | null>>;
  processCount?: number;
  isLoading?: boolean;
  isError?: boolean;
}
const UploadFile = ({
  onUploadFile,
  showCropper,
  setShowCropper,
  setLocalImage,
  processCount,
  isLoading,
  isError,
}: IProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadClick, setUploadClick] = useState(false);
  const [textStatus, setTextStatus] = useState("");

  const errorState = () => {
    setTextStatus("آپلود نا موفق");
    setTimeout(() => {
      setUploadClick(false);
    }, 2000);
  };

  const onUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 50_000_000) {
      toast.error("حجم فایل بیشتر از 50 MB است");
      setUploadClick(false);
      return;
    }
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      /\.(jpg|jpeg|png|gif)$/i.test(e.target.files[0].name)
    ) {
      const fileName = e.target.files[0].name;
      const fileType = e.target.files[0].type;
      const originalImage = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const image = reader.result;
        setLocalImage({
          imageAddress: image as string,
          imageName: fileName,
          imageType: fileType,
          originalImage,
        });
      });
      setShowCropper(true);
      reader.readAsDataURL(e.target.files[0]);
    } else {
  
      if (!e.target.value) {
        setUploadClick(false);
        return;
      }
      setTextStatus("درحال بارگذاری");

      setUploadClick(true);
      e.preventDefault();

      onUploadFile?.(file, showCropper);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        setTextStatus("");
        setUploadClick(false);
      } else {
        errorState();
      }
      formRef.current?.reset();
    }
  }, [isLoading]);

  return (
    <form
      method="POST"
      className="upload-file__form"
      encType="multipart/form-data"
      action="/"
      ref={formRef}
    >
      {uploadClick ? (
        <div className="upload-file__progressBar lib-progressBar !cls-bg-white">
          <p className=" cls-color-emerald-200 color-emerald-200 cls-w-full cls-ml-2 cls-text-xs cls-flex cls-pr-2 cls-items-center">
            <span className="spinner cls-ml-2 cls-mr-1" />
            <span>{textStatus}</span>
          </p>
          <div className="cls-flex cls-items-center">
            <progress
              className="cls-progress cls-progress-success cls-w-56"
              value={processCount}
              max="100"
            />
            <span className="cls-mr-2">{processCount}%</span>
          </div>
        </div>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            className="dialog-content__submit lib-btn cls-btn cls-bg-[#673AB7] hover:cls-bg-[#673AB7]"
          >
            <i className="fa fa-cloud-upload" />
            <UploadFileIcon className="cls-h-4 cls-w-4 cls-fill-[#0C0E10] cls-ml-2 " />
            <span className="cls-text-white cls-font-normal">
            بارگذاری فایل
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            name="image-uploader"
            // accept="image/*"
            onChange={onUploadClick}
          />
        </>
      )}
    </form>
  );
};

export default UploadFile;
