import React from "react";
import { XIcon } from "../assets/svg";
import RenderIf from "../extra/renderIf";
import { IFile } from "../interface";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: IFile;
  generateDownloadLink?: (file: IFile) => string;
}

const PreviewFileModal = ({
  setOpen,
  selectedFile,
  generateDownloadLink,
}: IProps) => {
  const close = () => {
    setOpen(false);
  };

  const checkFormat = () => {
    const extension = selectedFile?.extension.toLowerCase();
    if (
      extension?.includes("png") ||
      extension?.includes("jpeg") ||
      extension?.includes("jpg") ||
      extension?.includes("image") ||
      extension?.includes("webp")
    ) {
      return "image";
    }
    if (
      extension?.includes("m4v") ||
      extension?.includes("avi") ||
      extension?.includes("mpg") ||
      extension?.includes("mp4") ||
      extension?.includes("ogg") ||
      extension?.includes("mov")
    ) {
      return "video";
    }
    if (
      extension?.includes("m4a") ||
      extension?.includes("flac") ||
      extension?.includes("mp3") ||
      extension?.includes("wav") ||
      extension?.includes("wma") ||
      extension?.includes("aac")
    ) {
      return "sound";
    } else {
      return "notSupported";
    }
  };

  const source = generateDownloadLink?.(selectedFile);
  const format = checkFormat();

  return (
    <div
      role="button"
      tabIndex={0}
      className="dialog-content__modal cls-modal cls-cursor-default !cls-w-full cls-modal-open cls-h-full"
      onClick={close}
    >
      <div
        onClick={(e) => {
          return e.stopPropagation();
        }}
        role="button"
        tabIndex={-1}
        className="file-management__delete-modal cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full cls-p-0 cls-overflow-hidden cls-text-right cls-cursor-default cls-mt-10"
      >
        <div className=" cls-overflow-auto cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full cls-h-96">
          <div className="cls-flex cls-flex-wrap cls-items-center">
            <h3 className="modal-title">پیش نمایش فایل</h3>
            <button className="cls-w-fit cls-mr-auto" onClick={close}>
              <XIcon className="cls-fill-[#919191] cls-w-4 cls-h-4" />
            </button>
          </div>

          <div className="cls-mt-[30px] cls-flex cls-justify-center">
            <RenderIf isTrue={format === "image"}>
              <img className="cls-w-full" src={source} alt={selectedFile?.name} />
            </RenderIf>
            <RenderIf isTrue={format === "video"}>
              <video className="cls-w-full" controls>
                <source src={source} type="video/mp4" />
                مرورگر شما از ویدئو پشتیبانی نمیکند
              </video>
            </RenderIf>
            <RenderIf isTrue={format === "sound"}>
              <audio className="cls-w-full" controls>
                <source src={source} type="audio/mpeg" />
                مرورگر شما از صدا پشتیبانی نمیکند
              </audio>
            </RenderIf>
            <RenderIf isTrue={format === "notSupported"}>
              <p className="cls-mb-4">فرمت مورد نظر فاقد پیش نمایش میباشد</p>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFileModal;
