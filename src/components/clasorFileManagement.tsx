import { ChangeEvent, useEffect, useState } from "react";
import { IBreadcrumb, IFile, IFolder, IReport } from "../interface";
import { GridIcon, SearchIcon, TableIcon } from "../assets/svg";
import UploadFile from "./uploadFile";
import RenderIf from "../extra/renderIf";
import TableMode from "./tableMode";
import CardMode from "./cardMode";
import CropperModal from "./cropper/cropperModal";
import PropTypes from "prop-types";
import Breadcrumb from "./breadcrumb";
import FileTour from "./tour";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import FileMobileMode from "./fileMobileMode";

export interface IProps {
  dataReport?: IReport;
  fetchingReport?: boolean;
  files?: {
    pages: {
      list: IFile[];
      count: number;
      breadcrumb?: IBreadcrumb[];
    }[];
    pageParams?: any;
  };
  cropMode?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  hasPreview?: boolean;
  hasNextPage?: boolean;
  processCount?: number;
  getDataType?: (dType: string) => void;
  onSelectFile?: (file: IFile) => void;
  onSelectFolder?: (folder: IFolder) => void;
  onSelectBreadItem?: (breadItem: IBreadcrumb) => void;
  onChangePage?: (page: number) => void;
  onRenameFile?: (file: IFile, newName: string) => void;
  onDeleteFile?: (file: IFile) => void;
  onUploadFile?: (file: any, showCropper: boolean) => void;
  onSearchFile?: (name?: string) => void;
  onFetchNextPage?: (hasNextPage?: boolean) => void;
  generateDownloadLink?: (file: IFile) => string;
  fileActiveTour?: boolean;
  onActiveTour?: (activeTour: boolean) => void;
  cardMode?: boolean;
}

type IUiMode = "card" | "table";

export const ClasorFileManagement = (props: IProps) => {
  const {
    dataReport,
    fetchingReport,
    files,
    cropMode,
    isLoading,
    isFetching,
    isError,
    hasPreview,
    processCount,
    getDataType,
    onSelectFile,
    onSelectFolder,
    onSelectBreadItem,
    onRenameFile,
    onDeleteFile,
    onUploadFile,
    onSearchFile,
    generateDownloadLink,
    onFetchNextPage,
    fileActiveTour,
    onActiveTour,
    cardMode,
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
  const [resetPagination, setResetPagination] = useState(false);

  const [name, setName] = useState("");

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value.replace(/^[ \t]+|[ \t]+$/gm, "");
    setName(name);
  };

  const handleSearchRequest = async () => {
    setResetPagination(true);
    console.log(name);
    if (onSearchFile) {
      onSearchFile(name);
    }
    setTimeout(() => {
      setResetPagination(false);
    });
  };

  useEffect(() => {
    getDataType?.(uiMode);
  }, [uiMode]);

  const handleCleanSearch = async () => {
    setResetPagination(true);
    if (onSearchFile) {
      onSearchFile();
    }
    setTimeout(() => {
      setResetPagination(false);
    });
  };

  return (
    <div className="file-management-wrapper cls-bg-transparent !cls-font-yekan-regular  md:cls-bg-white cls-rounded-lg cls-h-full cls-w-full cls-flex cls-flex-col">
      {fileActiveTour && <FileTour onActiveTour={onActiveTour} />}
      <div className="cls-hidden md:cls-flex cls-h-fit cls-flex-wrap cls-items-center">
        <div className="cls-flex cls-w-full cls-items-center cls-justify-between cls-gap-2 cls-p-5">
          <div
            className="cls-flex cls-flex-grow cls-gap-2 cls-w-[100px] cls-max-w-[300px] cls-ml-2 cls-items-center cls-h-9 cls-px-3 cls-border-[1px] cls-border-[#EEF0F2] cls-bg-white cls-rounded-lg "
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                event.preventDefault();
                if (name) {
                  handleSearchRequest();
                } else {
                  handleCleanSearch();
                }
              }
            }}
          >
            <SearchIcon className="cls-h-5 cls-w-5 cls-fill-gray-400" />
            <input
              placeholder="جستجو ..."
              className={`cls-flex cls-items-center !cls-min-w-0 
              !cls-font-yekan-medium  focus:cls-font-yekan-medium  placeholder:cls-font-yekan-medium 
              cls-font-normal cls-text-[13px] cls-leading-[18.2px] -cls-tracking-[0.13px]
              placeholder:cls-text-gray-300 cls-text-right text-sm cls-pr-0 cls-outline-none cls-overflow-hidden
               cls-border-none focus:cls-border-none !cls-w-auto`}
              onChange={(e) => handleSearchInput(e)}
              value={name}
            />
          </div>
          <div className="cls-flex cls-items-center cls-gap-1">
            {cardMode ? (
              <div className="cls-flex cls-gap-1">
                <button
                  className="file-card-mode lib-btn !cls-border-[1px] !cls-border-solid !cls-border-[#EEF0F2] cls-bg-transparent hover:cls-bg-transparent cls-text-[#0C0E10]"
                  onClick={() => {
                    setUiMode("card");
                  }}
                >
                  <GridIcon className="cls-w-4 cls-h-4" />
                </button>
                <button
                  className="file-table-mode cls-btn lib-btn !cls-border-solid cls-border-[1px] cls-border-[#EEF0F2] cls-bg-transparent hover:cls-bg-transparent cls-text-[#0C0E10]"
                  onClick={() => {
                    setUiMode("table");
                  }}
                >
                  <TableIcon className="cls-w-4 cls-h-4" />
                </button>
              </div>
            ) : null}

            <RenderIf isTrue={!!onUploadFile}>
              <div className="file-upload file-management__upload-file cls-self-end">
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
            </RenderIf>
          </div>
        </div>
      </div>
      <div className="cls-hidden md:cls-flex file-management__file-list cls-flex-col cls-flex-grow cls-max-h-full cls-h-[calc(100%-80px)] cls-pb-5">
        {files?.pages.map((page, index) => (
          <div key={`breadcrumb-${index}`}>
            <RenderIf
              isTrue={!!page?.breadcrumb?.length && page.breadcrumb.length > 1}
            >
              <Breadcrumb
                breadcrumbList={page?.breadcrumb!}
                onSelectBreadItem={onSelectBreadItem}
              />
            </RenderIf>
          </div>
        ))}
        <RenderIf isTrue={uiMode === "table"}>
          <TableMode
            dataReport={dataReport}
            fetchingReport={fetchingReport}
            files={files}
            hasPreview={hasPreview}
            isFetching={isFetching}
            isLoading={isLoading}
            resetPagination={resetPagination}
            onSelectFile={onSelectFile}
            onSelectFolder={onSelectFolder}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
            generateDownloadLink={generateDownloadLink}
            onFetchNextPage={onFetchNextPage}
          />
        </RenderIf>
        <RenderIf isTrue={uiMode === "card"}>
          <CardMode
            dataReport={dataReport}
            fetchingReport={fetchingReport}
            files={files}
            isFetching={isFetching}
            isLoading={isLoading}
            resetPagination={resetPagination}
            onSelectFile={onSelectFile}
            onSelectFolder={onSelectFolder}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
            generateDownloadLink={generateDownloadLink}
            onFetchNextPage={onFetchNextPage}
          />
        </RenderIf>
      </div>

      <div className="md:cls-hidden cls-pt-4 cls-grid cls-h-full cls-grid-cols-1 sm:cls-grid-cols-2 md:cls-grid-cols-2 cls-gap-4 cls-flex-wrap cls-grid-rows-[min-content]">
        <FileMobileMode
          files={files}
          isFetching={isFetching}
          isLoading={isLoading}
          resetPagination={resetPagination}
          onRenameFile={onRenameFile}
          onDeleteFile={onDeleteFile}
          generateDownloadLink={generateDownloadLink}
          onFetchNextPage={onFetchNextPage}
        />
      </div>

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
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

ClasorFileManagement.propTypes = {
  files: PropTypes.shape({
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.object),
        count: PropTypes.number,
      })
    ),
    pageParams: PropTypes.any,
  }),
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
  onFetchNextPage: PropTypes.func,
  generateDownloadLink: PropTypes.func,
  fileActiveTour: PropTypes.bool,
  onActiveTour: PropTypes.func,
  cardMode: PropTypes.bool,
};
