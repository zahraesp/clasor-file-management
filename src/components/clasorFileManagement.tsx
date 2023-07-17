import { useState } from "react";
import { IFile } from "../interface";
import { GridIcon, TableIcon } from "../assets/svg";
import UploadFile from "./uploadFile";
import RenderIf from "../extra/renderIf";
import TableMode from "./tableMode";
import CardMode from "./cardMode";
import CropperModal from "./cropper/cropperModal";
import PropTypes from "prop-types";

export interface IProps {
  files?: {
    list: IFile[];
    count: number;
  };
  cardMode?: boolean;
  cropMode?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  hasPreview?: boolean;
  processCount?: number;
  onSelectFile?: (file: IFile) => void;
  onChangePage?: (page: number) => void;
  onRenameFile?: (file: IFile, newName: string) => void;
  onDeleteFile?: (file: IFile) => void;
  onUploadFile?: (file: any, showCropper: boolean) => void;
  generateDownloadLink?: (file: IFile) => string;
}

type IUiMode = "card" | "table";

export const ClasorFileManagement = (props: IProps) => {
  const {
    files,
    cardMode,
    cropMode,
    isLoading,
    isFetching,
    isError,
    hasPreview,
    processCount,
    onSelectFile,
    onChangePage,
    onRenameFile,
    onDeleteFile,
    onUploadFile,
    generateDownloadLink,
  } = props;

  const [uiMode, setUiMode] = useState<IUiMode>("table");
  const [showCropper, setShowCropper] = useState(false);
  const [localImage, setLocalImage] = useState<{
    imageAddress?: string;
    imageName?: string;
    imageType?: string;
    originalImage?: File;
    compressedImage?: File;
    compressedPreview?: string;
  } | null>(null);

  return (
    <div className="file-management-wrapper cls-h-full cls-w-full cls-flex cls-flex-col">
      {!!cardMode && (
        <div className="cls-flex cls-h-fit cls-flex-wrap cls-items-center">
          <div className="cls-flex cls-w-full cls-items-center cls-justify-end cls-gap-2">
            <button
              className="lib-btn cls-bg-[#7446B2] hover:cls-bg-[#7446B2] cls-text-white"
              onClick={() => {
                setUiMode("card");
              }}
            >
              <GridIcon className="cls-w-4 cls-h-4" />
            </button>
            <button
              className="cls-btn lib-btn cls-bg-[#7446B2] hover:cls-bg-[#7446B2] cls-text-white"
              onClick={() => {
                setUiMode("table");
              }}
            >
              <TableIcon className="cls-w-4 cls-h-4" />
            </button>
            <div className="file-management__upload-file cls-self-end">
              <UploadFile
                onUploadFile={onUploadFile}
                showCropper={showCropper}
                setShowCropper={setShowCropper}
                setLocalImage={setLocalImage}
                processCount={processCount}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>
        </div>
      )}
      <div className="file-management__file-list cls-flex cls-flex-col cls-flex-grow cls-max-h-full cls-h-[calc(100%-50px)] cls-pt-5">
        <RenderIf isTrue={uiMode === "table"}>
          <TableMode
            files={files}
            hasPreview={hasPreview}
            isFetching={isFetching}
            isLoading={isLoading}
            onSelectFile={onSelectFile}
            onChangePage={onChangePage}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
            generateDownloadLink={generateDownloadLink}
          />
        </RenderIf>
        <RenderIf isTrue={uiMode === "card"}>
          <CardMode
            files={files}
            isFetching={isFetching}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
            generateDownloadLink={generateDownloadLink}
          />
        </RenderIf>
      </div>
      {!cardMode && (
        <div className="file-management__upload-file dialog-content__action-part cls-modal-action cls-mt-2 cls-self-end">
          <UploadFile
            onUploadFile={onUploadFile}
            showCropper={showCropper}
            setShowCropper={setShowCropper}
            setLocalImage={setLocalImage}
            processCount={processCount}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      )}
      <RenderIf isTrue={showCropper}>
        <CropperModal
          cropMode={cropMode}
          onUploadFile={onUploadFile}
          showCropper={showCropper}
          setShowCropper={setShowCropper}
          localImage={localImage}
          setLocalImage={setLocalImage}
          processCount={processCount}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </RenderIf>
    </div>
  );
};

ClasorFileManagement.propTypes = {
  files: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  cardMode: PropTypes.bool,
  cropMode: PropTypes.bool,
  isFetching: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasPreview: PropTypes.bool,
  processCount: PropTypes.number,
  onselect: PropTypes.func,
  onChangePage: PropTypes.func,
  onRenameFile: PropTypes.func,
  onDeleteFile: PropTypes.func,
  onUploadFile: PropTypes.func,
  generateDownloadLink: PropTypes.func,
};
