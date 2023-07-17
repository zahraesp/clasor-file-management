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
      className="dialog-content__modal cls-modal cls-cursor-default !cls-w-full cls-modal-open cls-h-full"
    >
      <div
        onClick={(e) => {
          return e.stopPropagation();
        }}
        role="button"
        tabIndex={-1}
        className="file-management__cropper-modal cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full cls-p-0 cls-overflow-hidden cls-text-right cls-cursor-default cls-h-auto"
      >
        <div className="cls-overflow-auto cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full cls-h-full cls-flex cls-flex-col cls-justify-between">
          <div className="cls-flex cls-flex-wrap cls-items-center">
            <h3 className="cls-modal-title">ویرایش عکس</h3>
            <button
              className="cls-w-fit cls-mr-auto"
              onClick={close}
              disabled={isLoading}
            >
              <XIcon className="cls-fill-[#919191] cls-w-4 cls-h-4" />
            </button>
          </div>
          <div className="cls-flex cls-flex-col cls-items-center cls-mt-[30px]">
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
              <div className="upload-file__progressBar lib-progressBar !cls-bg-white">
                <div className="cls-flex cls-items-center">
                  <progress
                     className="cls-progress cls-progress-success cls-w-56"
                    value={processCount}
                    max="100"
                  />
                  <span className="cls-mr-2">{processCount}</span>
                </div>
              </div>
            )}
          </div>
          <div className="dialog-content__action-part lib-modal-action cls-modal-action cls-mt-[30px]">
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <button
                className="dialog-content__submit cls-btn lib-btn lib-modal-btn-success"
                onClick={handleSubmit}
              >
                تایید
              </button>
            )}
            <button
              className="dialog-content__btns lib-btn cls-btn lib-modal-btn-cancel"
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
