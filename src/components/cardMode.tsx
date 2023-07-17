import { useEffect, useState } from "react";
import { ITableProps } from "./tableMode";
import { FaDateFromTimestamp, getColor } from "../utils";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import Pagination from "../extra/pagination";
import { IFile } from "../interface";
import RenameFile from "./renameFile";
import DeleteFile from "./deleteFile";
import { DownloadIcon } from "../assets/svg";
import PreviewFileModal from "./previewModal";
import RenderIf from "../extra/renderIf";

const fileTablePageSize = 20;

const CardMode = (props: ITableProps) => {
  const {
    files,
    isFetching,
    isLoading,
    onDeleteFile,
    onRenameFile,
    onChangePage,
    hasPreview,
    onSelectFile,
    generateDownloadLink,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [openPreviewFile, setOpenPreviewFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile>();

  const onSelect = (file: IFile) => {
    setSelectedFile(file);
    onSelectFile?.(file);
  };

  useEffect(() => {
    onChangePage?.(page);
  }, [page]);

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
            !isFetching && "sm:cls-grid-cols-2 md:cls-grid-cols-3 lg:cls-grid-cols-4"
          } cls-gap-4 cls-py-10 cls-p-5 cls-flex-wrap cls-bg-white `}
        >
          {!isFetching ? (
            files?.list?.map((item: IFile) => {
              const link = generateDownloadLink?.(item);
              const fileSizeInKB = item.size / 1000;
              const fileSizeInMB = fileSizeInKB / 1000;
              return (
                <article
                  onClick={() => {
                    setOpenPreviewFile(true);
                    onSelect(item);
                  }}
                  className="cls-card cls-pb-5 cls-shadow-lg cls-cursor-pointer"
                  key={`card-${item.hash}`}
                >
                  <figure className="card-image cls-h-[200px]">
                    {item.thumbnail !== "WITHOUT_THUMBNAIL" ? (
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
                    <span
                      className="cls-text-sm cls-truncate cls-text-right"
                      title={FaDateFromTimestamp(item.updated)}
                    >
                      تاریخ آپلود :{FaDateFromTimestamp(item.updated)}
                    </span>
                    <span className="cls-text-xs cls-text-right">
                      حجم: {fileSizeInKB < 1000 ? 
                      `${(fileSizeInKB).toFixed(2)} کیلوبایت` :
                      `${(fileSizeInMB).toFixed(2)} مگابایت`  }
                    </span>
                  </div>
                  <div className="card-action cls-pt-2 cls-px-6 cls-flex cls-gap-2 cls-justify-end">
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
                    <RenameFile
                      fileInfo={item}
                      onRenameFile={onRenameFile}
                      isLoading={isLoading}
                    />
                    <DeleteFile
                      fileInfo={item}
                      onDeleteFile={onDeleteFile}
                      isLoading={isLoading}
                    />
                  </div>
                </article>
              );
            })
          ) : (
            <div
              className="spinner cls-self-center"
              style={{
                justifySelf: "center",
              }}
            />
          )}
        </div>
      </div>
      <div
        dir="ltr"
        className="file-list__card file-list__pagination cls-w-full cls-h-fit cls-bg-cover cls-mt-[30px] cls-text-left cls-flex cls-justify-end"
      >
        {files ? (
          <Pagination
            changePage={page}
            total={files.count}
            pageSize={fileTablePageSize}
            onChange={setPage}
          />
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
