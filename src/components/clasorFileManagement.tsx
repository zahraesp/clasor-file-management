import { useEffect, useState } from "react";
import { IBreadcrumb, IFile, IFolder, IPodspaceResult, IReport } from "../interface";
import { BroomIcon, GridIcon, SearchIcon, TableIcon } from "../assets/svg";
import UploadFile from "./uploadFile";
import RenderIf from "../extra/renderIf";
import TableMode from "./tableMode";
import CardMode from "./cardMode";
import CropperModal from "./cropper/cropperModal";
import PropTypes from "prop-types";
import Breadcrumb from "./breadcrumb";

export interface IProps {
  dataReport?: IReport;
  fetchingReport?: boolean;
  files?: {
    list: IFile[];
    count: number;
    breadcrumb?: IBreadcrumb[];
  };
  pageSize?: number;
  cropMode?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  hasPreview?: boolean;
  processCount?: number;
  onSelectFile?: (file: IFile | IFolder | IBreadcrumb) => void;
  onChangePage?: (page: number) => void;
  onRenameFile?: (file: IFile, newName: string) => void;
  onDeleteFile?: (file: IFile) => void;
  onUploadFile?: (file: any, showCropper: boolean) => void;
  onSearchFile?: (name?: string) => Promise<IPodspaceResult<{ list: IFile[]; count: number; }>>;
  generateDownloadLink?: (file: IFile) => string;
}

type IUiMode = "card" | "table";

export const ClasorFileManagement = (props: IProps) => {
  const {
    dataReport,
    fetchingReport,
    files,
    pageSize,
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
    onSearchFile,
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
  const [name, setName] = useState("");
  const [filteredFiles, setFilteredFiles] = useState<{ list: IFile[]; count: number }>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [cleanLoading, setCleanLoading] = useState(false);

  useEffect(() => {
    if (files) {
      setFilteredFiles({ list: files.list, count: files.count });
    }
  }, [files]);
  

  const handleSearchInput = (query: string) => {
    setName(query);
  };
  
  const handleSearchRequest = async () => {
    setSearchLoading(true);
    if(onSearchFile){
      const data = await onSearchFile(name);
      setFilteredFiles(data.result);
      setSearchLoading(false);
    }
  };

  const handleCleanSearch = async () => {
    setCleanLoading(true);
    if(onSearchFile){
      const data = await onSearchFile();
      setFilteredFiles(data.result);
      setCleanLoading(false);
    }
    let inputValue = (document.getElementById("searchInput") as HTMLInputElement);
    inputValue.value = '';
  };

  return (
    <div className="file-management-wrapper cls-h-full cls-w-full cls-flex cls-flex-col">
        <div className="cls-flex cls-h-fit cls-flex-wrap cls-items-center">
          <div className="cls-flex cls-w-full cls-items-center cls-justify-end cls-gap-2">
          <div className="cls-flex cls-flex-1">
              <input 
                  type="text"
                  id="searchInput"
                  className="cls-shadow cls-appearance-none cls-border cls-text-sm cls-rounded cls-py-2 cls-px-4 cls-text-gray-700 cls-leading-tight focus:cls-outline-none focus:cls-shadow-outline"
                  placeholder='جستجوی فایل...'
                  onChange={e => handleSearchInput(e.currentTarget.value)}
                  aria-describedby="button-addon2"/>
              <button 
                  className="cls-bg-[#673AB7] lib-btn cls-text-white cls-text-xs cls-py-2 cls-px-4 cls-rounded focus:cls-outline-none focus:cls-shadow-outline"
                  onClick={handleSearchRequest}
                  >
                    {searchLoading 
                    ? <div className="cls-w-full cls-flex-col cls-flex cls-justify-center cls-items-center">
                        <div className="spinner cls-w-4 cls-h-4" />
                      </div>
                    : <SearchIcon className="cls-w-4 cls-h-4 cls-fill-white" />}
              </button>
              <button 
                  className="cls-bg-[#673AB7] lib-btn cls-text-white cls-text-xs cls-py-2 cls-px-4 cls-rounded focus:cls-outline-none focus:cls-shadow-outline cls-mx-2"
                  onClick={handleCleanSearch}
                  >
                    {cleanLoading 
                    ? <div className="cls-w-full cls-flex-col cls-flex cls-justify-center cls-items-center">
                        <div className="spinner cls-w-4 cls-h-4" />
                       </div>
                    : <BroomIcon className="cls-w-4 cls-h-4 cls-fill-white" />}
              </button>
            </div>
            <button
              className="lib-btn cls-bg-[#673AB7] hover:cls-bg-[#673AB7] cls-text-white"
              onClick={() => {
                setUiMode("card");
              }}
            >
              <GridIcon className="cls-w-4 cls-h-4" />
            </button>
            <button
              className="cls-btn lib-btn cls-bg-[#673AB7] hover:cls-bg-[#673AB7] cls-text-white"
              onClick={() => {
                setUiMode("table");
              }}
            >
              <TableIcon className="cls-w-4 cls-h-4" />
            </button>

            <RenderIf isTrue={!!onUploadFile}>
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
            </RenderIf>
          </div>
        </div>
      <div className="file-management__file-list cls-flex cls-flex-col cls-flex-grow cls-max-h-full cls-h-[calc(100%-50px)] cls-pt-5">
        <RenderIf isTrue={!!files?.breadcrumb?.length && files.breadcrumb.length > 1}>
          <Breadcrumb
            breadcrumbList={files?.breadcrumb!}
            onSelectFile={onSelectFile}
          />
        </RenderIf>
        <RenderIf isTrue={uiMode === "table"}>
          <TableMode
            dataReport={dataReport}
            fetchingReport={fetchingReport}
            files={filteredFiles}
            pageSize={pageSize}
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
            dataReport={dataReport}
            fetchingReport={fetchingReport}
            files={filteredFiles}
            pageSize={pageSize}
            isFetching={isFetching}
            isLoading={isLoading}
            onSelectFile={onSelectFile}
            onChangePage={onChangePage}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
            generateDownloadLink={generateDownloadLink}
          />
        </RenderIf>
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
    </div>
  );
};

ClasorFileManagement.propTypes = {
  files: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
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
  generateDownloadLink: PropTypes.func,
};
