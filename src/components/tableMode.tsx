import { Fragment, useEffect, useState } from "react";
import { IBreadcrumb, IFile, IFolder, IReport } from "../interface";
import {
  DownloadIcon,
  FillArrow,
  FolderIcon,
  GlobeIcon,
  MoreDotIcon,
  PencilIcon,
  TrashIcon,
} from "../assets/svg";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";
import { FaDateFromTimestamp, getColor, isFolder } from "../utils";
import DeleteFile from "./deleteFile";
import RenameFile from "./renameFile";
import PreviewFileModal from "./previewModal";
import RenderIf from "../extra/renderIf";
import ProgressBar from "../extra/progressBar";
import { useInView } from "react-intersection-observer";
import EmptyList from "./emptyList";
import PublicFile from "./publicFile";

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
  onPublicFile?: (file: IFile) => void;
  generateDownloadLink?: (file: IFile) => string;
  onFetchNextPage?: (hasNextPage?: boolean) => void;
  getDataType?: (params: {
    order: "NAME" | "CREATED" | "UPDATED" | "SIZE" | "TYPE" | null;
    isDesc: boolean;
  }) => void;
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
    onPublicFile,
    generateDownloadLink,
    onFetchNextPage,
    getDataType,
  } = props;

  const [selectedFile, setSelectedFile] = useState<IFile>();
  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { ref, inView } = useInView();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPublicDialog, setOpenPublicDialog] = useState(false);
  const [fileMenu, setFileMenu] = useState<IFile | null>(null);

  const fileConut = files?.pages[0].count;

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
    <div className="cls-px-5 cls-rounded-lg cls-flex cls-flex-col cls-flex-grow cls-overflow-auto">
      <div
        className={`cls-border-[1px] cls-border-[#EEF0F2] cls-overflow-auto cls-bg-white cls-rounded-[4px] cls-flex-grow cls-block ${
          isLoading ? "cls-min-h-16" : "cls-block"
        }`}
      >
        {isLoading ? (
          <div className="cls-flex cls-items-center cls-justify-center">
            <div className="spinner" />
          </div>
        ) : fileConut ? (
          <table className="file-list__table custom-table cls-table-fixed cls-w-full">
            <thead className="">
              <tr className="">
                <th className="!cls-bg-[#F2F2F7] cls-px-5 cls-py-1 cls h-10 cls-sticky cls-top-0  cls-z-10 cls-font-normal ">
                  <div className="cls-flex">
                    <span className="cls-block cls-font-bold">نام فایل</span>
                    <div className="cls-flex cls-flex-col cls-items-center cls-mr-[11px]">
                      <button
                        className="btn-up !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({
                            order: "NAME",
                            isDesc: false,
                          });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9]" />
                      </button>
                      <button
                        className="btn-down !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({ order: "NAME", isDesc: true });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9] cls-rotate-180" />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="!cls-bg-[#F2F2F7] cls-px-5 cls-py-1 cls h-10 cls-sticky cls-top-0 cls-z-10 !cls-max-w-[150px] !cls-w-[150px]">
                  <div className="cls-flex">
                    <span className="cls-block">تاریخ بارگذاری</span>
                    <div className="cls-flex cls-flex-col cls-items-center cls-mr-[11px]">
                      <button
                        className="btn-up !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({
                            order: "CREATED",
                            isDesc: false,
                          });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9]" />
                      </button>
                      <button
                        className="btn-down !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({
                            order: "CREATED",
                            isDesc: true,
                          });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9] cls-rotate-180" />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="!cls-bg-[#F2F2F7] cls-px-5 cls-py-1 cls h-10 cls-sticky cls-top-0 cls-z-10 !cls-max-w-[130px] !cls-w-[130px]">
                  <div className="cls-flex cls-justify-center">
                    <span className="cls-block">حجم</span>
                    <div className="cls-flex cls-flex-col cls-items-center cls-mr-[11px]">
                      <button
                        className="btn-up !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({ order: "SIZE", isDesc: false });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9]" />
                      </button>
                      <button
                        className="btn-down !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                        onClick={() => {
                          return getDataType?.({ order: "SIZE", isDesc: true });
                        }}
                      >
                        <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9] cls-rotate-180" />
                      </button>
                    </div>
                  </div>
                </th>
                <th className="!cls-bg-[#F2F2F7] cls-px-5 cls-py-1 cls h-10 file-action cls-sticky cls-top-0 cls-z-10 !cls-max-w-[80px] !cls-w-[80px]">
                  <span className="cls-block">عملیات</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {files?.pages.map((page, index) => {
                return (
                  <Fragment key={`fragment-${index}`}>
                    {page.list.length &&
                      page.list.map((item) => {
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
                            key={`table-mode-${item.hash}`}
                            className={`hover:cls-bg-[#F1EDF7] active:!cls-bg-[#F1EDF7] hover:cls-cursor-pointer !cls-max-h-16 
                          ${
                            selectedFile?.hash === item.hash
                              ? "!cls-bg-[#F1EDF7]"
                              : "!cls-bg-transparent"
                          }`}
                            onClick={() => {
                              if (hasPreview && !isFolder(item)) {
                                setOpenPreviewFile(true);
                              }
                              onSelect?.(item);
                            }}
                          >
                            <td>
                              <div className="cls-flex cls-items-center">
                                <div
                                  className="cls-w-8 cls-h-8 cls-min-w-8 cls-max-w-8 cls-flex"
                                  title={item.name}
                                >
                                  {!isFolder(item) ? (
                                    <FileIcon
                                      extension={item.extension}
                                      {...defaultStyles[
                                        item.extension as unknown as DefaultExtensionType
                                      ]}
                                      glyphColor={getColor(
                                        item.extension || ""
                                      )}
                                      labelColor={getColor(
                                        item.extension || ""
                                      )}
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
                            <td className="!cls-p-0">
                              {!isFolder(item) ? (
                                <span className="cls-px-3 cls-py-[5px] cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                                  {FaDateFromTimestamp(item.updated)}
                                </span>
                              ) : null}
                            </td>
                            <td className="!cls-px-0">
                              <span className="cls-flex cls-justify-end cls-px-3 cls-py-[5px] cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
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
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    className="cls-dropdown cls-dropdown-right"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <button
                                      tabIndex={0}
                                      className="cls-btn cls-btn-ghost cls-border-[1px] cls-p-0 cls-h-8 cls-w-8 cls-min-h-8 cls-border-[#EEF0F2] cls-rounded-lg cls-no-animation hover:cls-bg-transparent"
                                    >
                                      <MoreDotIcon className="cls-absolute cls-left-2 cls-w-4 cls-h-4" />
                                    </button>
                                    <ul
                                      tabIndex={0}
                                      className="cls-menu !cls-p-1 cls-dropdown-content cls-rounded-[4px] cls-shadow-[0px_10px_20px_rgba(0,0,0,0.15)] cls-bg-white cls-w-[140px] cls-mt-4 cls-overflow-hidden"
                                    >
                                      <RenderIf isTrue={!!link}>
                                        <li className="active:!cls-bg-transparent px-1">
                                          <a
                                            className="!cls-text-[#667585] !cls-text-[12px] active:!cls-bg-transparent cls-px-[1px]"
                                            href={link}
                                            download
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                          >
                                            <div className="cls-flex cls-items-center cls-gap-2 cls-px-[1px]">
                                              <DownloadIcon className="cls-h-5 cls-w-5 cls-stroke-[#667585]" />
                                              <p className="!cls-text-[#667585] cls-font-yekan-medium !cls-text-[12px]">
                                                دانلود فایل
                                              </p>
                                            </div>
                                          </a>
                                        </li>
                                      </RenderIf>
                                      {onPublicFile ? (
                                        <li className="!cls-text-[#667585] active:!cls-bg-transparent ">
                                          <div
                                            className="cls-flex cls-items-center cls-gap-2 cls-px-[1px] active:!cls-bg-transparent"
                                            role="button"
                                            tabIndex={0}
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              setOpenPublicDialog(true);
                                              setFileMenu(item);
                                            }}
                                          >
                                            <GlobeIcon className="dialog-content__button-icon cls-h-5 cls-w-5 cls-fill-[#667585]" />
                                            <p className="!cls-text-[#667585] cls-font-yekan-medium cls-text-[12px] cls-truncate">
                                              عمومی کردن فایل
                                            </p>
                                          </div>
                                        </li>
                                      ) : null}
                                      <li className="!cls-text-[#667585] active:!cls-bg-transparent ">
                                        <div
                                          className="cls-flex cls-items-center cls-gap-2 cls-px-[1px] active:!cls-bg-transparent"
                                          role="button"
                                          tabIndex={0}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenEditDialog(true);
                                            setFileMenu(item);
                                          }}
                                        >
                                          <PencilIcon className="dialog-content__button-icon cls-h-5 cls-w-5 cls-fill-[#667585]" />
                                          <p className="!cls-text-[#667585] cls-font-yekan-medium  cls-text-[12px]">
                                            ویرایش فایل
                                          </p>
                                        </div>
                                      </li>
                                      <li className="!cls-text-[#667585] active:!cls-bg-transparent ">
                                        <div
                                          className="cls-flex cls-items-center cls-gap-2 cls-px-[1px] active:!cls-bg-transparent"
                                          role="button"
                                          tabIndex={0}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenDeleteDialog(true);
                                            setFileMenu(item);
                                          }}
                                        >
                                          <TrashIcon className="dialog-content__button-icon cls-h-5 cls-w-5 cls-fill-[#667585]" />
                                          <p className="!cls-text-[#667585] cls-font-yekan-medium  cls-text-[12px]">
                                            حذف فایل
                                          </p>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                  </Fragment>
                );
              })}
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
        ) : !isFetching ? (
          <EmptyList />
        ) : null}
      </div>
      {dataReport ? (
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
      ) : null}
      {selectedFile && openPreviewFile && !!hasPreview && (
        <PreviewFileModal
          key={selectedFile.hash}
          setOpen={setOpenPreviewFile}
          selectedFile={selectedFile}
          generateDownloadLink={generateDownloadLink}
        />
      )}
      {openEditDialog && fileMenu && (
        <RenameFile
          key={fileMenu.hash}
          fileInfo={fileMenu}
          onRenameFile={onRenameFile}
          isLoading={isLoading}
          handleClose={() => {
            setOpenEditDialog(false);
          }}
        />
      )}

      {openDeleteDialog && fileMenu && (
        <DeleteFile
          key={fileMenu.hash}
          fileInfo={fileMenu}
          onDeleteFile={onDeleteFile}
          isLoading={isLoading}
          handleClose={() => {
            setOpenDeleteDialog(false);
          }}
        />
      )}
      {openPublicDialog && fileMenu && (
        <PublicFile
          key={fileMenu.hash}
          fileInfo={fileMenu}
          onPublicFile={onPublicFile}
          isLoading={isLoading}
          handleClose={() => {
            setOpenPublicDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default TableMode;
