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
      className="dialog-content__modal mylib-modal mylib-cursor-default mylib-modal-open mylib-h-full"
      onClick={close}
    >
      <div
        onClick={(e) => {
          return e.stopPropagation();
        }}
        role="button"
        tabIndex={-1}
        className="file-management__delete-modal mylib-modal-box mylib-p-0 mylib-overflow-hidden mylib-text-right mylib-cursor-default mylib-mt-10"
      >
        <div className=" mylib-overflow-auto mylib-modal-box mylib-h-96">
          <div className="mylib-flex mylib-flex-wrap mylib-items-center">
            <h3 className="modal-title">پیش نمایش فایل</h3>
            <button className="mylib-w-fit mylib-mr-auto" onClick={close}>
              <XIcon className="mylib-fill-[#919191] mylib-w-4 mylib-h-4" />
            </button>
          </div>

          <div className="mylib-mt-[30px] mylib-flex mylib-justify-center">
            <RenderIf isTrue={format === "image"}>
              <img className="mylib-w-full" src={source} alt={selectedFile?.name} />
            </RenderIf>
            <RenderIf isTrue={format === "video"}>
              <video className="mylib-w-full" controls>
                <source src={source} type="video/mp4" />
                مرورگر شما از ویدئو پشتیبانی نمیکند
              </video>
            </RenderIf>
            <RenderIf isTrue={format === "sound"}>
              <audio className="mylib-w-full" controls>
                <source src={source} type="audio/mpeg" />
                مرورگر شما از صدا پشتیبانی نمیکند
              </audio>
            </RenderIf>
            <RenderIf isTrue={format === "notSupported"}>
              <p className="mylib-mb-4">فرمت مورد نظر فاقد پیش نمایش میباشد</p>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFileModal;
