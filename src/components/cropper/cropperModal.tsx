import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Compressor from "compressorjs";
import ImageCropper from "./imageCropper";
import ImageCompressor from "../editImage/imageCompressor";
import { ILocalImage } from "../../interface";
import RenderIf from "../../extra/renderIf";
import { XIcon } from "../../assets/svg";

interface IProps {
  onUploadFile?: (file: any, showCropper: boolean) => void;
  showCropper: boolean;
  setShowCropper: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalImage: React.Dispatch<React.SetStateAction<ILocalImage | null>>;
  localImage: ILocalImage | null;
  processCount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  cropMode?: boolean;
}

const CropperModal = (props: IProps) => {
  const {
    onUploadFile,
    showCropper,
    setShowCropper,
    setLocalImage,
    processCount,
    isLoading,
    isFetching,
    cropMode,
    localImage,
  } = props;
  const [showProgress, setShowProgress] = useState(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [compressValue, setCompressValue] = useState(0);

  const close = () => {
    setShowCropper(false);
    setLocalImage(null);
    setCroppedImage(null);
    setCompressValue(0);
  };

  const handleSubmit = async () => {
    if (!croppedImage && cropMode) {
      toast.error("عکس مورد نظر را برش دهید!");
      return;
    }
    setShowProgress(true);
    if (!localImage?.originalImage) return;
    if (localImage?.originalImage.size > 50_000_000) {
      toast.error("حجم فایل بیشتر از 50 MB است");
      return;
    }

    // eslint-disable-next-line no-new
    new Compressor(croppedImage || localImage?.originalImage, {
      quality: 1 - compressValue,
      success: (compressedResult) => {
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const compressdImageFile = new File(
            [compressedResult],
            localImage.imageName || "unknown"
          );

          const formData = new FormData();
          formData.append(
            "file",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            localImage.compressedImage && croppedImage
              ? compressdImageFile
              : localImage.compressedImage ||
                  croppedImage ||
                  localImage.originalImage
          );
          onUploadFile?.(formData, showCropper);
        });
        reader.readAsDataURL(compressedResult);
      },
    });
  };

  useEffect(() => {
    if (isFetching) {
      setShowProgress(false);
      close();
    }
  }, [isFetching]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="dialog-content__modal mylib-modal mylib-cursor-default mylib-modal-open mylib-h-full"
    >
      <div
        onClick={(e) => {
          return e.stopPropagation();
        }}
        role="button"
        tabIndex={-1}
        className="file-management__cropper-modal mylib-modal-box mylib-p-0 mylib-overflow-hidden mylib-text-right mylib-cursor-default mylib-h-auto"
      >
        <div className="mylib-overflow-auto mylib-modal-box mylib-h-full mylib-flex mylib-flex-col mylib-justify-between">
            <div className="mylib-flex mylib-flex-wrap mylib-items-center">
              <h3 className="mylib-modal-title">ویرایش عکس</h3>
              <button
                className="mylib-w-fit mylib-mr-auto"
                onClick={close}
                disabled={isLoading}
              >
                <XIcon className="mylib-fill-[#919191] mylib-w-4 mylib-h-4" />
              </button>
            </div>
            <div className="mylib-flex mylib-flex-col mylib-items-center mylib-mt-[30px]">
              <RenderIf isTrue={!!cropMode}>
                <ImageCropper
                  localImage={localImage}
                  setCroppedImage={setCroppedImage}
                />
              </RenderIf>
              <ImageCompressor
                cropMode={cropMode}
                localImage={localImage}
                setLocalImage={setLocalImage}
                compressValue={compressValue}
                setCompressValue={setCompressValue}
              />
              {showProgress && (
                <div className="progressBar mylib-mt-4">
                  <div className="mylib-flex mylib-items-center">
                    <progress
                      className="mylib-progress progress-[#4488C7] mylib-w-56"
                      value={processCount}
                      max="100"
                    />
                    <span className="mylib-mr-2">{processCount}</span>
                  </div>
                </div>
              )}
            </div>
          <div className="dialog-content__action-part mylib-modal-action mylib-mt-6">
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <button
                className="dialog-content__submit mylib-btn modal-btn-success"
                onClick={handleSubmit}
              >
                تایید
              </button>
            )}

            <button
              className="dialog-content__btns mylib-btn modal-btn-cancel"
              type="button"
              onClick={close}
              disabled={isLoading}
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
