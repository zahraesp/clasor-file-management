import { useEffect, useState } from "react";
import { IFile } from "../interface";
import { DownloadIcon, FillArrow } from "../assets/svg";
import Pagination from "../extra/pagination";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";
import { FaDateFromTimestamp, getColor } from "../utils";
import DeleteFile from "./deleteFile";
import RenameFile from "./renameFile";
import PreviewFileModal from "./previewModal";

export interface ITableProps {
  files?: {
    list: IFile[];
    count: number;
  };
  isFetching?: boolean;
  isLoading?: boolean;
  hasPreview?: boolean;
  onSelectFile?: (file: IFile) => void;
  onChangePage?: (page: number) => void;
  onRenameFile?: (file: IFile, newName: string) => void;
  onDeleteFile?: (file: IFile) => void;
  generateDownloadLink?: (file: IFile) => string;
}
const fileTablePageSize = 20;

const TableMode = (props: ITableProps) => {
  const {
    files,
    isLoading,
    isFetching,
    hasPreview,
    onChangePage,
    onSelectFile,
    onRenameFile,
    onDeleteFile,
    generateDownloadLink,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [sortByName, setSortByName] = useState(-1);
  const [selectedFile, setSelectedFile] = useState<IFile>();
  const [openPreviewFile, setOpenPreviewFile] = useState(false);

  const searchlist = files?.list?.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return sortByName;
    }
    if (a.name > b.name) {
      return -1 * sortByName;
    }
    return 0;
  });

  const onSelect = (file: IFile) => {
    setSelectedFile(file);
    onSelectFile?.(file);
  };

  useEffect(() => {
    onChangePage?.(page);
  }, [page]);

  return (
    <div className="cls-flex cls-flex-col cls-flex-grow cls-overflow-auto">
      <div
        className={`cls-overflow-auto cls-bg-white cls-rounded-[4px] cls-flex-grow cls-block ${
          isFetching ? "cls-grid" : "cls-block"
        }`}
      >
        {!isFetching ? (
          searchlist?.length ? (
            <table className="file-list__table custom-table cls-table-fixed cls-w-full">
              <thead>
                <tr className="">
                  <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10 cls-font-normal ">
                    <div className="cls-flex">
                      <span className="cls-block cls-font-bold">نام فایل</span>
                      <div className="cls-flex cls-flex-col cls-items-center cls-mr-[11px]">
                        <button
                          className="btn-up !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                          onClick={() => {
                            return setSortByName(-1);
                          }}
                        >
                          <FillArrow className="cls-w-[9px] cls-h-[9px] cls-fill-[#B9B9B9]" />
                        </button>
                        <button
                          className="btn-down !cls-p-0 cls-bg-transparent hover:cls-bg-transparent"
                          onClick={() => {
                            return setSortByName(1);
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
                  <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10">حجم</th>
                  <th className="cls-sticky cls-top-0 cls-bg-white cls-z-10">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {searchlist?.map((item: IFile) => {
                  const link = generateDownloadLink?.(item);
                  const fileSizeInKB = item.size / 1000;
                  const fileSizeInMB = fileSizeInKB / 1000;
                  return (
                    <tr
                      tabIndex={0}
                      key={JSON.stringify(item)}
                      className="hover:cls-bg-sky-100 hover:cls-cursor-pointer"
                      onClick={() => {
                        setOpenPreviewFile(true);
                        return onSelect?.(item);
                      }}
                    >
                      <td>
                        <div className="cls-flex cls-items-center">
                          <div className="cls-w-8 cls-h-8 cls-inline-block">
                            <FileIcon
                              extension={item.extension}
                              {...defaultStyles[
                                item.extension as unknown as DefaultExtensionType
                              ]}
                              glyphColor={getColor(item.extension || "")}
                              labelColor={getColor(item.extension || "")}
                            />
                          </div>
                          <span className="cls-block cls-text-xs cls-font-yekan-regular cls-font-normal cls-text-[#919191] cls-mr-[10px] cls-truncate">
                            {`${item.name || ""}.${
                              item.extension ? item.extension : ""
                            }`}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="cls-px-3 cls-py-[5px] cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                          {FaDateFromTimestamp(item.updated)}
                        </span>
                      </td>
                      <td>
                        <span className="cls-px-3 cls-py-[5px]  cls-font-yekan-medium cls-text-xs cls-text-[#919191] ">
                          <span className="cls-text-xs cls-text-right">
                            {fileSizeInKB < 1000
                              ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
                              : `${fileSizeInMB.toFixed(2)} مگابایت`}
                          </span>{" "}
                        </span>
                      </td>
                      <td>
                        <div className="file-table__actions cls-h-8 cls-flex !cls-gap-x-[21px] cls-justify-end">
                          <div className="download-file">
                            {/* <RenderIf isTrue={!!link}> */}
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
                            {/* </RenderIf> */}
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="file-list custom-table empty-table cls-flex cls-justify-center cls-mt-4 cls-table-fixed cls-w-full">
              فایلی برای نمایش وجود ندارد.
            </div>
          )
        ) : (
          <div
            className="spinner cls-self-center cls-justify-center"
            style={{
              justifySelf: "center",
            }}
          />
        )}
      </div>
      <div
        dir="ltr"
        className="file-list__table file-list__pagination cls-w-full cls-h-fit cls-bg-cover cls-mt-[30px] cls-text-left cls-flex cls-justify-end"
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
    </div>
  );
};

export default TableMode;
