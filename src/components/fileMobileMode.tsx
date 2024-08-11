import { Fragment, useEffect, useState } from "react";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";
import { ITableProps } from "./tableMode";
import {
  DownloadIcon,
  FolderIcon,
  MoreDotIcon,
  PencilIcon,
  TrashIcon,
} from "../assets/svg";
import { FaDateFromTimestamp, getColor, isFolder } from "../utils";
import RenameFile from "./renameFile";
import DeleteFile from "./deleteFile";
import { useInView } from "react-intersection-observer";
import EmptyList from "./emptyList";
import RenderIf from "../extra/renderIf";
import { IFile, IFolder } from "../interface";
import PreviewFileModal from "./previewModal";

const FileMobileMode = (props: ITableProps) => {
  const {
    files,
    isLoading,
    isFetching,
    onRenameFile,
    onDeleteFile,
    generateDownloadLink,
    onFetchNextPage,
    hasPreview,
    onSelectFile,
    onSelectFolder,
  } = props;

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [fileMenu, setFileMenu] = useState<IFile | null>(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile>();
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
    <>
      {isLoading ? (
        <div
          className="spinner cls-self-center cls-justify-center"
          style={{
            justifySelf: "center",
          }}
        />
      ) : (
        files?.pages.map((page, index) => {
          return (
            <Fragment key={`fragment-${index}`}>
              {page.list.length ? (
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
                    <div
                      key={`mobile-mode-${item.hash}`}
                      className={`cls-flex cls-flex-col cls-h-auto hover:cls-bg-[#F6F7F8] active:!cls-bg-[#F6F7F8] hover:cls-cursor-pointer 
                    cls-rounded-lg cls-bg-white cls-border-[1px] cls-border-[#EEF0F2] cls-shadow-sm
                     ${
                       selectedFile?.hash === item.hash
                         ? "!cls-bg-[#F6F7F8]"
                         : "cls-bg-transparent"
                     }`}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (hasPreview && !isFolder(item)) {
                          setOpenPreviewFile(true);
                        }
                         onSelect?.(item);
                      }}
                    >
                      <div className="cls-flex cls-p-4 cls-justify-between cls-items-center">
                        <div className="cls-flex cls-items-center cls-gap-3 ">
                          <div className="cls-h-12 cls-w-12">
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
                          <p
                            title={item.name}
                            className="cls-text-[14px] cls-w-[70px] sm:cls-w-[40px] md:cls-w-[40px] lg:cls-w-full cls-truncate cls-font-yekan-medium cls-font-[450] cls-leading-[21px] -cls-tracking-[0.14px]"
                          >
                            {item.name}
                          </p>
                        </div>
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
                            className="cls-btn cls-btn-ghost cls-border-[1px] cls-border-[#EEF0F2] cls-p-0  !cls-min-h-8 cls-h-8 cls-w-8 cls-rounded-lg cls-no-animation hover:cls-bg-transparent"
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
                                  className="!cls-text-[#667585] !cls-text-[12px] active:!cls-bg-transparent cls-pl-0"
                                  href={link}
                                  download
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="cls-flex cls-items-center cls-gap-2">
                                    <DownloadIcon className="cls-h-5 cls-w-5 cls-stroke-[#667585]" />
                                    <p className="!cls-text-[#667585] cls-font-yekan-medium !cls-text-[12px]">
                                      دانلود فایل
                                    </p>
                                  </div>
                                </a>
                              </li>
                            </RenderIf>
                            <li className="!cls-text-[#667585] active:!cls-bg-transparent ">
                              <div
                                className="cls-flex cls-items-center cls-gap-2 cls-pl-0"
                                role="button"
                                tabIndex={0}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setOpenEditDialog(true);
                                  setFileMenu(item);
                                }}
                              >
                                <PencilIcon className="dialog-content__button-icon cls-h-5 cls-w-5 cls-fill-[#667585]" />
                                <p className="!cls-text-[rgb(102,117,133)] cls-font-yekan-medium  cls-text-[12px]">
                                  ویرایش فایل
                                </p>
                              </div>
                            </li>
                            <li className="!cls-text-[#667585] active:!cls-bg-transparent ">
                              <div
                                className="cls-flex cls-items-center cls-gap-2 cls-pl-0"
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
                      <div className="cls-flex cls-flex-col cls-gap-3 cls-pb-4">
                        <div className="cls-flex cls-items-center cls-h-6 cls-gap-2 cls-px-4">
                          <p className="cls-text-[12px] cls-font-yekan-medium  cls-text-[#919191] cls-font-normal cls-leading-[16.8px] -cls-tracking-[0.12px]">
                            تاریخ بارگذاری
                          </p>
                          <div className="cls-flex-grow cls-flex-shrink-0 cls-pt-1">
                            <div className="cls-border-b-[2px] cls-border-dashed cls-border-[#EEF0F2]" />
                          </div>
                          <p className="cls-text-[12px] cls-text-[#0C0E10] cls-font-normal cls-leading-[16.8px] -cls-tracking-[0.12px]">
                            {!isFolder(item) ? (
                              <span className=" cls-py-[5px] cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                                {FaDateFromTimestamp(item.updated)}
                              </span>
                            ) : null}
                          </p>
                        </div>
                        <div className="cls-flex cls-items-center cls-h-6 cls-gap-2 cls-px-4">
                          <p className="cls-text-[12px] cls-font-yekan-medium  cls-text-[#919191] cls-font-normal cls-leading-[16.8px] -cls-tracking-[0.12px]">
                            حجم
                          </p>
                          <div className="cls-flex-grow cls-flex-shrink-0 cls-pt-1">
                            <div className="cls-border-b-[2px] cls-border-dashed cls-border-[#EEF0F2]" />
                          </div>
                          <p className="cls-text-[12px] cls-font-yekan-medium  cls-text-[#919191] cls-font-normal cls-leading-[16.8px] -cls-tracking-[0.12px]">
                            {!isFolder(item) && fileSizeInKB ? (
                              <span className="cls-text-xs cls-font-yekan-medium cls-text-[#919191]  cls-text-right">
                                {fileSizeInKB < 1000
                                  ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
                                  : `${fileSizeInMB?.toFixed(2)} مگابایت`}
                              </span>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : !isFetching ? (
                <EmptyList />
              ) : null}
            </Fragment>
          );
        })
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="cls-m-auto">
          <button
            ref={ref}
            className="cls-self-center cls-text-[10px] cls-text-[#0C0E10]"
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <div className="spinner" />
            ) : (
              "نمایش موارد بیشتر"
            )}
          </button>
        </div>
      </RenderIf>
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
    </>
  );
};

export default FileMobileMode;
