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
    pageSize,
    resetPagination,
    isFetching,
    isLoading,
    onDeleteFile,
    onRenameFile,
    onChangePage,
    hasPreview,
    onSelectFile,
    onSelectFolder,
    generateDownloadLink,
  } = props;

  const page = useRef(0);
  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile>();
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const { ref, inView } = useInView();
  const size = pageSize || 5;
  const enableNextFetch = files && files.count >= page.current * size;

  const onSelect = (item: IFile | IFolder) => {
    if (!isFolder(item)) {
      setSelectedFile(item);
      onSelectFile?.(item);
    }else {
      onSelectFolder?.(item)
    }
  };

  const fetchNextPage = () => {        
    page.current = page.current + 1;
    setIsFetchingNextPage(true);
  };

  useEffect(() => {
    if(inView && enableNextFetch){
      fetchNextPage();
    } else {
      setIsFetchingNextPage(false);
    }
  }, [inView]);

  useEffect(() => {
    if(enableNextFetch){
      onChangePage?.(page.current);
    }
  }, [page.current]);

  useEffect(() => {
    if(resetPagination){
      page.current = 0;
    }
  }, [resetPagination]);

  useEffect(() => {
    if (selectedFile) {
      onSelectFile?.(selectedFile);
    }
  }, [selectedFile]);

  return (
    <>
      <div className="file-list__card cls-overflow-auto cls-bg-white cls-rounded-[4px]">
        <div
          className={`cls-grid cls-grid-cols-1 ${
            !isLoading && files?.list.length ?
            "sm:cls-grid-cols-2 md:cls-grid-cols-3 lg:cls-grid-cols-4" : ""
          } cls-gap-4 cls-py-10 cls-p-5 cls-flex-wrap cls-bg-white `}
        >
          {files?.list.length ? (
            files?.list?.map((item) => {
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
                  <div className="card-action cls-pt-2 cls-px-6 cls-flex cls-gap-2 cls-justify-end">
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
          ) : (
          !isFetching ?
          <div className="file-list cls-justify-center cls-mt-4 cls-w-full">
            فایلی برای نمایش وجود ندارد.
          </div>
          :
          <div
            className="spinner cls-self-center cls-justify-center"
            style={{
              justifySelf: "center",
            }}
          />
        )}
        </div>
        <RenderIf isTrue={enableNextFetch!}>
            <div className="m-auto">
              <button
                ref={ref}
                className="cls-self-center cls-text-[10px] cls-text-primary"
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
            <ProgressBar usage={dataReport?.podSpaceStatus.storageUsage} total={dataReport?.podSpaceStatus.storageLimit} isFetching={fetchingReport}/>
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
