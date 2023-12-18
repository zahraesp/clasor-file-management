import { useEffect, useRef, useState } from "react";
import { ITableProps } from "./tableMode";
import { FaDateFromTimestamp, getColor, isFolder } from "../utils";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { IFile, IFolder } from "../interface";
import RenameFile from "./renameFile";
import DeleteFile from "./deleteFile";
import { DownloadIcon, FolderIcon } from "../assets/svg";
import PreviewFileModal from "./previewModal";
import RenderIf from "../extra/renderIf";
import ProgressBar from "../extra/progressBar";
import { useInView } from "react-intersection-observer";

const CardMode = (props: ITableProps) => {
  const {
    dataReport,
    fetchingReport,
    files,
    resetPagination,
    isFetching,
    isLoading,
    onDeleteFile,
    onRenameFile,
    hasPreview,
    onSelectFile,
    onSelectFolder,
    generateDownloadLink,
    onFetchNextPage,
  } = props;

  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile>();
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
          {files?.pages.map((page) => {
            return page.list.length ? (
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
                    className="cls-card cls-pb-5 cls-shadow-lg cls-cursor-pointer"
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
                      {!isFolder(item) ? (
                        <>
                          <div className="download-file">
                            <RenderIf isTrue={!!link}>
                              <a
                                href={link}
                                download
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <DownloadIcon className="cls-h-5 cls-w-5 cls-stroke-[#0D99FF]" />
                              </a>
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
                        </>
                      ) : null}
                    </div>
                  </article>
                );
              })
            ) : !isFetching ? (
              <div className="file-list cls-justify-center cls-mt-4 cls-w-full !cls-p-0">
                <span className="cls-text-[#919191] text-sm">
                فایلی برای نمایش وجود ندارد.
                </span>
              </div>
            ) : (
              <div
                className="spinner cls-self-center cls-justify-center"
                style={{
                  justifySelf: "center",
                }}
              />
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
        {files ? (
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
          setOpen={setOpenPreviewFile}
          selectedFile={selectedFile}
          generateDownloadLink={generateDownloadLink}
        />
      )}
    </>
  );
};

export default CardMode;
