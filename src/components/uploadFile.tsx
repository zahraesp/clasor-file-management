import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { UploadFileIcon } from "../assets/svg";
import { ILocalImage } from "../interface";
import { toast } from "react-toastify";
import { extractFileFromUnknown, validateBeforeUpload } from "../utils/uploadGuards";

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
    const item = e.target.files?.[0];
    if (!item) {
      return;
    }
    // if (file.size > 50_000_000) {
    //   toast.error("حجم فایل بیشتر از 50 MB است");
    //   setUploadClick(false);
    //   return;
    // }

    try {
      let fileToUpload = item;
      const file = await extractFileFromUnknown(item);
      if (file) {
        const { valid, message, sanitizedFile } = await validateBeforeUpload(
          file
        );
        if (!valid) {
          toast.error(message || "آپلود این فایل مجاز نیست");
          return;
        }
        if (sanitizedFile) {
          fileToUpload = sanitizedFile;
        }
      }

      if (
        e.target.files &&
        e.target.files.length > 0 &&
        /\.(jpg|jpeg|png|gif)$/i.test(e.target.files[0].name)
      ) {
        const fileName = e.target.files[0].name;
        const fileType = e.target.files[0].type;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const image = reader.result;
          setLocalImage({
            imageAddress: image as string,
            imageName: fileName,
            imageType: fileType,
            originalImage: fileToUpload,
          });
        });
        setShowCropper(true);
        reader.readAsDataURL(fileToUpload);
      } else {
        if (!e.target.value) {
          setUploadClick(false);
          return;
        }
        setTextStatus("درحال بارگذاری");

        setUploadClick(true);
        e.preventDefault();

        onUploadFile?.(fileToUpload, showCropper);
      }
    } catch (error) {
      console.error("UploadFile error in clasor-file-management:", error);
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
      <>
        <label
          htmlFor="file-upload"
          className="dialog-content__submit lib-btn cls-btn cls-bg-transparent !cls-border-solid cls-border-[1px] cls-border-[#EEF0F2] hover:cls-bg-transparent"
        >
          <i className="fa fa-cloud-upload" />
          <UploadFileIcon className="cls-h-4 cls-w-4 cls-stroke-[#0C0E10] cls-ml-2 " />
          {uploadClick ? (
            <div className="cls-flex cls-items-center">
              <span>{textStatus}</span>
              <span className="cls-mr-2">{processCount}%</span>
            </div>
          ) : (
            <span className="upload-file cls-text-[#0C0E10] cls-font-normal">
              بارگذاری فایل
            </span>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          name="image-uploader"
          // accept="image/*"
          onChange={onUploadClick}
        />
      </>
    </form>
  );
};

export default UploadFile;
