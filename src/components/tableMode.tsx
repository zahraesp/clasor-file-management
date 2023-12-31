import { useEffect, useState } from "react";
import { IBreadcrumb, IFile, IFolder, IReport } from "../interface";
import { DownloadIcon, FillArrow, FolderIcon } from "../assets/svg";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";
import { FaDateFromTimestamp, getColor, isFolder } from "../utils";
import DeleteFile from "./deleteFile";
import RenameFile from "./renameFile";
import PreviewFileModal from "./previewModal";
import RenderIf from "../extra/renderIf";
import ProgressBar from "../extra/progressBar";
import { useInView } from "react-intersection-observer";

export interface ITableProps {
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
  isFetching?: boolean;
  isLoading?: boolean;
  hasPreview?: boolean;
  resetPagination?: boolean;
  onSelectFile?: (file: IFile) => void;
  onSelectFolder?: (folder: IFolder) => void;
  onRenameFile?: (file: IFile, newName: string) => void;
  onDeleteFile?: (file: IFile) => void;
  generateDownloadLink?: (file: IFile) => string;
  onFetchNextPage?: (hasNextPage?: boolean) => void;
}

const TableMode = (props: ITableProps) => {
  const {
    dataReport,
    fetchingReport,
    files,
    isLoading,
    isFetching,
    hasPreview,
    onSelectFile,
    onSelectFolder,
    onRenameFile,
    onDeleteFile,
    generateDownloadLink,
    onFetchNextPage,
  } = props;

  const [selectedFile, setSelectedFile] = useState<IFile>();
  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { ref, inView } = useInView();

  const onSelect = (item: IFile | IFolder) => {
    if (!isFolder(item)) {
      setSelectedFile(item);
      onSelectFile?.(item);
    } else {
      onSelectFolder?.(item);
    }
  };

  const fetchNextPage = () => {
    onFetchNextPage?.(hasNextPage);
    setIsFetchingNextPage(true);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    } else {
      setIsFetchingNextPage(false);
    }
  }, [inView]);

  useEffect(() => {
    let itemNum = 0;
    files?.pages.map((page) => {
      itemNum += page.list.length;
      if (page.count > itemNum) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    });
  }, [files]);

  return (
    <div className="cls-flex cls-flex-col cls-flex-grow cls-overflow-auto">
      <div
        className={`cls-overflow-auto cls-bg-white cls-rounded-[4px] cls-flex-grow cls-block ${
          isLoading ? "cls-min-h-16" : "cls-block"
        }`}
      >
        <table className="file-list__table custom-table cls-table-fixed cls-w-full">
          <thead className="">
            <tr className="">
              <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10 cls-font-normal ">
                <div className="cls-flex">
                  <span className="cls-block cls-font-bold">نام فایل</span>
                  <div className="cls-flex cls-flex-col cls-items-center cls-mr-[11px]">
                    <button
                      className="btn-up !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                      onClick={() => {
                        // return setSortByName(-1);
                      }}
                    >
                      <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9]" />
                    </button>
                    <button
                      className="btn-down !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                      onClick={() => {
                        // return setSortByName(1);
                      }}
                    >
                      <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9] cls-rotate-180" />
                    </button>
                  </div>
                </div>
              </th>
              <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10">
                <div className="cls-flex">
                  <span className="cls-block">تاریخ آپلود</span>
                </div>
              </th>
              <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10">
                حجم
              </th>
              <th className="file-action cls-sticky cls-top-0 cls-bg-white cls-z-10">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {(!!isLoading) ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex items-center justify-center">
                    <div className="spinner" />
                  </div>
                </td>
              </tr>
            ) : (
              files?.pages.map((page) => {
                return page.list.length
                  ? page.list.map((item) => {
                      const link = !isFolder(item)
                        ? generateDownloadLink?.(item)
                        : undefined;
                      const fileSizeInKB = !isFolder(item)
                        ? item.size / 1000
                        : undefined;
                      const fileSizeInMB =
                        !isFolder(item) && fileSizeInKB
                          ? fileSizeInKB / 1000
                          : undefined;
                      return (
                        <tr
                          tabIndex={0}
                          key={JSON.stringify(item)}
                          className="hover:cls-bg-sky-100 hover:cls-cursor-pointer !cls-max-h-16"
                          onClick={() => {
                            if (hasPreview && !isFolder(item)) {
                              setOpenPreviewFile(true);
                            }
                            return onSelect?.(item);
                          }}
                        >
                          <td>
                            <div className="cls-flex cls-items-center">
                              <div className="cls-w-8 cls-h-8 cls-inline-block">
                                {!isFolder(item) ? (
                                  <FileIcon
                                    extension={item.extension}
                                    {...defaultStyles[
                                      item.extension as unknown as DefaultExtensionType
                                    ]}
                                    glyphColor={getColor(item.extension || "")}
                                    labelColor={getColor(item.extension || "")}
                                  />
                                ) : (
                                  <FolderIcon className="cls-fill-[#DC7611] cls-w-8 cls-h-8" />
                                )}
                              </div>
                              <span className="cls-block cls-text-xs cls-font-yekan-regular cls-font-normal cls-text-[#919191] cls-mr-[10px] cls-truncate">
                                {`${item.name || ""}${
                                  item.extension && !isFolder(item)
                                    ? `.${item.extension}`
                                    : ""
                                }`}
                              </span>
                            </div>
                          </td>
                          <td>
                            {!isFolder(item) ? (
                              <span className="cls-px-3 cls-py-[5px] cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                                {FaDateFromTimestamp(item.updated)}
                              </span>
                            ) : null}
                          </td>
                          <td>
                            <span className="cls-px-3 cls-py-[5px]  cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                              {!isFolder(item) && fileSizeInKB ? (
                                <span className="cls-text-xs cls-text-right">
                                  {fileSizeInKB < 1000
                                    ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
                                    : `${fileSizeInMB?.toFixed(2)} مگابایت`}
                                </span>
                              ) : null}
                            </span>
                          </td>
                          <td>
                            {!isFolder(item) ? (
                              <div className=" file-table__actions cls-h-8 cls-flex !cls-gap-x-[21px] cls-justify-end">
                                <div className="download-file">
                                  <RenderIf isTrue={!!link}>
                                    <div className="lib-btn !cls-p-0 cls-bg-transparent hover:cls-bg-transparent">
                                      <a
                                        href={link}
                                        download
                                        onClick={(e) => {
                                          e.stopPropagation();
                                        }}
                                      >
                                        <DownloadIcon className="cls-h-5 cls-w-5 cls-stroke-[#0D99FF]" />
                                      </a>
                                    </div>
                                  </RenderIf>
                                </div>

                                <RenderIf isTrue={!!onRenameFile}>
                                  <RenameFile
                                    fileInfo={item}
                                    onRenameFile={onRenameFile}
                                    isLoading={isLoading}
                                  />
                                </RenderIf>

                                <RenderIf isTrue={!!onDeleteFile}>
                                  <DeleteFile
                                    fileInfo={item}
                                    onDeleteFile={onDeleteFile}
                                    isLoading={isLoading}
                                  />
                                </RenderIf>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })
                  : !page.list.length && !isFetching && (
                      <tr>
                        <td colSpan={4} className="!cls-text-right !text-right">
                          فایلی برای نمایش وجود ندارد.
                        </td>
                      </tr>
                    );
              })
            )}
            <RenderIf isTrue={!!hasNextPage}>
              <tr>
                <td colSpan={4} className="!text-center">
                  <button
                    ref={ref}
                    className="cls-self-center cls-text-[10px] cls-text-[#673AB7]"
                    disabled={isFetchingNextPage}
                    onClick={fetchNextPage}
                  >
                    {isFetchingNextPage ? (
                      <div className="spinner" />
                    ) : (
                      "نمایش موارد بیشتر"
                    )}
                  </button>
                </td>
              </tr>
            </RenderIf>
          </tbody>
        </table>
      </div>
      <div
        dir="ltr"
        className="file-list__table file-list__pagination cls-w-full cls-h-fit cls-bg-cover cls-mt-[30px] cls-text-left cls-flex cls-justify-end"
      >
        <div className="cls-flex cls-flex-1 cls-overflow-hidden">
          <ProgressBar
            usage={dataReport?.podSpaceStatus.storageUsage}
            total={dataReport?.podSpaceStatus.storageLimit}
            isFetching={fetchingReport}
          />
        </div>
      </div>
      {selectedFile && openPreviewFile && !!hasPreview && (
        <PreviewFileModal
          setOpen={setOpenPreviewFile}
          selectedFile={selectedFile}
          generateDownloadLink={generateDownloadLink}
        />
      )}
    </div>
  );
};

export default TableMode;
