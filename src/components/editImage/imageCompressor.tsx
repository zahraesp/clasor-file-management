import React, { ChangeEvent, useState } from "react";
import Compressor from "compressorjs";
import RenderIf from "../../extra/renderIf";
import { ILocalImage } from "../../interface";

interface IProps {
  cropMode?: boolean;
  setLocalImage: React.Dispatch<React.SetStateAction<ILocalImage | null>>;
  localImage: ILocalImage | null;
  setCompressValue: React.Dispatch<React.SetStateAction<number>>;
  compressValue: number;
}

const ImageCompressor = (props: IProps) => {
  const {
    setLocalImage,
    cropMode,
    localImage,
    setCompressValue,
    compressValue,
  } = props;
  const [hasCompressor, setHasCompressor] = useState(false);

  const handleChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    if (!localImage?.imageName || !localImage.originalImage) return;

    setCompressValue(Number(e.target.value));

    if (/\.(jpg|jpeg|png|gif)$/i.test(localImage.imageName)) {
      // eslint-disable-next-line no-new
      new Compressor(localImage.originalImage, {
        quality: 1 - Number(e.target.value),
        success: (compressedResult) => {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            const image = reader.result;
            const compressdImageFile = new File(
              [compressedResult],
              localImage.imageName || "unknown"
            );
            setLocalImage((oldState) => {
              return {
                ...oldState,
                compressedImage: compressdImageFile,
                compressedPreview: image as string,
              };
            });
          });
          reader.readAsDataURL(compressedResult);
        },
      });
    }
  };

  return (
    <div className="file-management__compress-image cls-w-full">
      <RenderIf isTrue={!cropMode}>
        <div className="cls-w-full cls-max-h-48 cls-h-[12rem] cls-flex cls-justify-center cls-items-center">
          <div className="cls-w-full cls-max-h-full cls-overflow-y-auto">
            <img
              src={
                localImage?.compressedImage
                  ? localImage?.compressedPreview
                  : localImage?.imageAddress
              }
              alt="پیش نمایش عکس"
              className="cls-h-full cls-w-full"
            />
          </div>
        </div>
      </RenderIf>

      <div className="form-control cls-my-5 cls-w-full">
        <label className="label cls-cursor-pointer cls-justify-start cls-p-0">
          <input
            type="checkbox"
            checked={hasCompressor}
            className="cls-absolute cls-accent-gray-800 cls-cursor-pointer cls-ml-[10px] cls-checkbox-xs"
            onChange={() => {
              setHasCompressor((oldState) => {
                return !oldState;
              });
              setLocalImage((oldState) => {
                return {
                  ...oldState,
                  compressedImage: undefined,
                  compressedPreview: undefined,
                };
              });
              setCompressValue(0);
            }}
          />
          <span className="cls-checkbox-text checkbox-text cls-mr-5">فشرده سازی عکس</span>
        </label>
      </div>
      <RenderIf isTrue={hasCompressor}>
        <>
          <input
            type="range"
            min="0"
            max="1"
            value={compressValue}
            className="cls-range cls-appearance-none cls-bg-transparent cls-w-full cls-overflow-hidden"
            step="0.1"
            dir="ltr"
            onChange={handleChangeSlider}
          />
          <div className="cls-w-full cls-flex cls-justify-between cls-text-xs cls-px-2">
            <span>100</span>
            <span>90</span>
            <span>80</span>
            <span>70</span>
            <span>60</span>
            <span>50</span>
            <span>40</span>
            <span>30</span>
            <span>20</span>
            <span>10</span>
            <span>0</span>
          </div>
        </>
      </RenderIf>
    </div>
  );
};

export default ImageCompressor;
