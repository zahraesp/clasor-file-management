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
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }
      if (file.size > 50_000_000) {
        toast.error("حجم فایل بیشتر از 50 MB است");
      }

      const formData = new FormData();
      formData.append("file", file);

      onUploadFile?.(formData, showCropper);
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
        <div className="upload-file__progressBar progressBar">
          <p className="mylib-w-full mylib-ml-2 mylib-bg-emerald-200 mylib-text-xs mylib-flex mylib-pr-2 mylib-items-center">
            <span className="spinner mylib-ml-2 mylib-mr-1" />
            <span>{textStatus}</span>
          </p>
          <div className="mylib-flex mylib-items-center">
            <progress
              className="mylib-progress mylib-bg-[#71A13D] mylib-w-56"
              value={processCount}
              max="100"
            />
            <span className="mylib-mr-2">{processCount}%</span>
          </div>
        </div>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            className="dialog-content__submit mylib-btn mylib-bg-[#7446B2] mylib-flex mylib-items-center modal-btn-success "
          >
            <i className="fa fa-cloud-upload" />
            <UploadFileIcon className="mylib-h-4 mylib-w-4 mylib-fill-white mylib-ml-2" />
            <span className="mylib-text-white">
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
