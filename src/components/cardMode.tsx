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
      <div className="file-list__card mylib-overflow-auto mylib-bg-white mylib-rounded-[4px] mylib-max-h-[320px] mylib-h-[170px]">
        <div
          className={`mylib-grid mylib-grid-cols-1 ${
            !isFetching && "sm:mylib-grid-cols-2 md:mylib-grid-cols-4 lg:mylib-grid-cols-5"
          } mylib-gap-4 mylib-py-10 mylib-p-5 mylib-flex-wrap mylib-bg-white mylib-min-h-[320px]`}
        >
          {!isFetching ? (
            files?.list?.map((item: IFile) => {
              const link = generateDownloadLink?.(item);
              return (
                <article
                  onClick={() => {
                    setOpenPreviewFile(true);
                    onSelect(item);
                  }}
                  className="mylib-card mylib-pb-5 mylib-shadow-lg mylib-cursor-pointer"
                  key={`card-${item.hash}`}
                >
                  <figure className="card-image mylib-h-[200px]">
                    {item.thumbnail !== "WITHOUT_THUMBNAIL" ? (
                      <img
                        className="mylib-w-full mylib-h-[200px] mylib-object-cover"
                        alt={item.name}
                        src={link}
                      />
                    ) : (
                      <div className="mylib-w-[100px] mylib-h-auto">
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
                  <div className="card-content mylib-px-6 mylib-flex mylib-flex-col mylib-gap-y-2 mylib-mt-2">
                    <h6 className="mylib-text-lg mylib-font-yekan-bold mylib-text-right mylib-truncate">
                      {item.name}
                    </h6>
                    <span
                      className="mylib-text-sm mylib-truncate mylib-text-right"
                      title={FaDateFromTimestamp(item.updated)}
                    >
                      تاریخ آپلود :{FaDateFromTimestamp(item.updated)}
                    </span>
                    <span className="mylib-text-xs mylib-text-right">
                      حجم :{`${item.size} کیلوبایت`}
                    </span>
                  </div>
                  <div className="card-action mylib-pt-2 mylib-px-6 mylib-flex mylib-gap-2 mylib-justify-end">
                    <div className="download-file">
                      <RenderIf isTrue={!!link}>
                        <a
                          href={link}
                          download
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <DownloadIcon className="mylib-h-5 mylib-w-5 mylib-stroke-[#0D99FF]" />
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
              className="spinner mylib-self-center"
              style={{
                justifySelf: "center",
              }}
            />
          )}
        </div>
      </div>
      <div
        dir="ltr"
        className="file-list__card file-list__pagination mylib-w-full mylib-h-fit mylib-bg-cover mylib-mt-[30px] mylib-text-left mylib-flex mylib-justify-end"
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
