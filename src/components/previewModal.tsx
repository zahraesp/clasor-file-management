import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import RenderIf from "../extra/renderIf";
import { IFile } from "../interface";
import CloseButton from "./buttons/closeButton";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
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
    <Dialog
      placeholder=""
      size="lg"
      open={true}
      handler={close}
      className="file-management__preview"
    >
      <DialogHeader
        placeholder=""
        className="flex items-center justify-between"
      >
        <Typography className="text-lg font-semibold">
          پیش نمایش فایل
        </Typography>
        <CloseButton onClose={close} />
      </DialogHeader>

      <DialogBody placeholder="" className="p-0">
        <div className="flex justify-center items-center min-h-[400px] bg-gray-50">
          <RenderIf isTrue={format === "image"}>
            <img 
              className="max-w-full max-h-[400px] object-contain" 
              src={source} 
              alt={selectedFile?.name} 
            />
          </RenderIf>
          <RenderIf isTrue={format === "video"}>
            <video className="max-w-full max-h-[400px]" controls>
              <source src={source} type="video/mp4" />
              مرورگر شما از ویدئو پشتیبانی نمیکند
            </video>
          </RenderIf>
          <RenderIf isTrue={format === "sound"}>
            <audio className="w-full" controls>
              <source src={source} type="audio/mpeg" />
              مرورگر شما از صدا پشتیبانی نمیکند
            </audio>
          </RenderIf>
          <RenderIf isTrue={format === "notSupported"}>
            <div className="text-center p-8">
              <Typography className="text-gray-500 mb-4">
                فرمت مورد نظر فاقد پیش نمایش میباشد
              </Typography>
              <Typography className="text-sm text-gray-400">
                نام فایل: {selectedFile?.name}
              </Typography>
            </div>
          </RenderIf>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PreviewFileModal;
