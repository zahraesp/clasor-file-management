import { Fragment, useEffect, useState } from "react";
import { ITableProps } from "./tableMode";
import { FaDateFromTimestamp, getColor, isFolder } from "../utils";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { IFile, IFolder } from "../interface";
import RenameFile from "./renameFile";
import DeleteFile from "./deleteFile";
import {
  DownloadIcon,
  FolderIcon,
  GlobeIcon,
  MoreDotIcon,
  PencilIcon,
  TrashIcon,
} from "../assets/svg";
import PreviewFileModal from "./previewModal";
import RenderIf from "../extra/renderIf";
import ProgressBar from "../extra/progressBar";
import { useInView } from "react-intersection-observer";
import EmptyList from "./emptyList";
import PublicFile from "./publicFile";

const CardMode = (props: ITableProps) => {
  const {
    dataReport,
    fetchingReport,
    files,
    isFetching,
    isLoading,
    onDeleteFile,
    onRenameFile,
    hasPreview,
    onSelectFile,
    onSelectFolder,
    onPublicFile,
    generateDownloadLink,
    onFetchNextPage,
  } = props;

  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile>();
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { ref, inView } = useInView();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPublicDialog, setOpenPublicDialog] = useState(false);
  const [fileMenu, setFileMenu] = useState<IFile | null>(null);

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
    if (selectedFile) {
      onSelectFile?.(selectedFile);
    }
  }, [selectedFile]);

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
      <div className="file-list__card cls-flex-grow cls-overflow-auto cls-bg-white cls-rounded-[4px]">
        <div
          className={`cls-grid cls-grid-cols-1 ${
            !isLoading
              ? "sm:cls-grid-cols-2 md:cls-grid-cols-3 lg:cls-grid-cols-4"
              : "sm:cls-grid-cols-2 md:cls-grid-cols-3 lg:cls-grid-cols-4"
          } cls-gap-4 cls-py-5 cls-p-5 cls-flex-wrap cls-bg-white `}
        >
          {files?.pages.map((page, index) => {
            return (
              <Fragment key={`fragment-${index}`}>
                {page.list.length ? (
                  page?.list?.map((item) => {
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
                      <article
                        onClick={() => {
                          if (hasPreview && !isFolder(item)) {
                            setOpenPreviewFile(true);
                          }
                          onSelect(item);
                        }}
                        role="button"
                        className={`cls-card cls-pb-5 cls-shadow-lg hover:cls-bg-[#F6F7F8] active:!cls-bg-[#F6F7F8] hover:cls-cursor-pointer
                       ${
                         selectedFile?.hash === item.hash
                           ? "!cls-bg-[#F6F7F8]"
                           : "cls-bg-transparent"
                       }`}
                        key={`card-${item.hash}`}
                      >
                        <figure className="card-image cls-h-[200px]">
                          {isFolder(item) ? (
                            <FolderIcon className="cls-fill-[#DC7611] cls-w-[100px] cls-h-auto" />
                          ) : isFolder(item) &&
                            item.thumbnail !== "WITHOUT_THUMBNAIL" ? (
                            <img
                              className="cls-w-full cls-h-[200px] cls-object-cover"
                              alt={item.name}
                              src={link}
                            />
                          ) : (
                            <div className="cls-w-[100px] cls-h-auto">
                              <FileIcon
                                extension={item.extension}
                                {...defaultStyles[
                                  item.extension as unknown as DefaultExtensionType
                                ]}
                                glyphColor={getColor(item.extension || "")}
                                labelColor={getColor(item.extension || "")}
                              />
                            </div>
                          )}
                        </figure>
                        <div className="card-content cls-px-6 cls-flex cls-flex-col cls-gap-y-2 cls-mt-2">
                          <h6 className="cls-text-lg cls-font-yekan-bold cls-text-right cls-truncate">
                            {item.name}
                          </h6>

                          {!isFolder(item) ? (
                            <>
                              <span
                                className="cls-text-sm cls-truncate cls-text-right"
                                title={FaDateFromTimestamp(item.updated)}
                              >
                                تاریخ آپلود :{FaDateFromTimestamp(item.updated)}
                              </span>
                              <span className="cls-text-xs cls-text-right">
                                حجم:{" "}
                                {fileSizeInKB && fileSizeInKB < 1000
                                  ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
                                  : `${fileSizeInMB?.toFixed(2)} مگابایت`}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div className="file-action card-action cls-pt-2 cls-px-6 cls-flex cls-gap-2 cls-justify-end">
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
                              className="cls-btn cls-btn-ghost cls-border-[1px] !cls-h-8 cls-min-h-8 cls-border-[#EEF0F2]  cls-rounded-lg cls-no-animation hover:cls-bg-transparent"
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
                      </article>
                    );
                  })
                ) : !isFetching ? (
                  <div className="file-list cls-justify-center cls-mt-4 cls-w-full !cls-p-0">
                    <EmptyList />
                  </div>
                ) : (
                  <div
                    className="spinner cls-self-center cls-justify-center"
                    style={{
                      justifySelf: "center",
                    }}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        <RenderIf isTrue={!!hasNextPage}>
          <div className="m-auto">
            <button
              ref={ref}
              className="self-center text-[10px] text-primary"
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
      </div>
      <div
        dir="ltr"
        className="file-list__card file-list__pagination cls-w-full cls-h-fit cls-bg-cover cls-mt-[30px] cls-text-left cls-flex cls-justify-end"
      >
        {files && dataReport ? (
          <>
            <div className="cls-flex cls-flex-1">
              <ProgressBar
                usage={dataReport?.podSpaceStatus.storageUsage}
                total={dataReport?.podSpaceStatus.storageLimit}
                isFetching={fetchingReport}
              />
            </div>
          </>
        ) : null}
      </div>
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
    </>
  );
};

export default CardMode;
