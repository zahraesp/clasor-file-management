import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { ILocalImage } from "../../interface";

type NewBlob<T> = Partial<T> & { name: string };

interface IProps {
  localImage: ILocalImage | null;
  setCroppedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageCropper = ({ localImage, setCroppedImage }: IProps) => {
  const [cropConfig, setCropConfig] = useState<Crop>({
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    unit: "px",
  });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImage = (
    sourceImage: HTMLImageElement,
    config: Crop,
    fileName: string
  ): any => {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = config.width || 128;
    canvas.height = config.height || 128;
    const ctx = canvas.getContext("2d");
    ctx!.drawImage(
      sourceImage,
      (config.x as number) * scaleX,
      (config.y as number) * scaleY,
      (config.width as number) * scaleX,
      (config.height as number) * scaleY,
      0,
      0,
      config.width as number,
      config.height as number
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        const resBlob = blob as NewBlob<Blob>;
        if (!resBlob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        resBlob.name = fileName;
        // creating a Object URL representing the Blob object given
        const myFile = new File(
          [resBlob as Blob],
          localImage?.imageName ? localImage.imageName : "unknown",
          {
            type: localImage?.imageType || "image/jpeg",
          }
        );

        resolve(myFile);
      }, "image/jpeg");
    });
  };

  const cropImage = async (crop: Crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageResult = await getCroppedImage(
        imageRef.current as unknown as HTMLImageElement,
        crop,
        "croppedImage.jpeg"
      );
      setCroppedImage(croppedImageResult);
    }
  };

  return (
    <div className="mylib-max-h-72 mylib-overflow-y-auto">
      <ReactCrop
        keepSelection
        crop={cropConfig}
        maxWidth={200}
        maxHeight={200}
        aspect={1 / 1}
        onComplete={(cropResult) => {
          return cropImage(cropResult);
        }}
        onChange={(cropResult) => {
          return setCropConfig(cropResult);
        }}
      >
        <img
          ref={imageRef}
          src={
            localImage?.compressedImage
              ? localImage?.compressedPreview
              : localImage?.imageAddress
          }
          alt={localImage?.imageName}
        />
      </ReactCrop>
    </div>
  );
};

export default ImageCropper;
