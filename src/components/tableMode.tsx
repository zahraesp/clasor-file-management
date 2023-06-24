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
    <div className="mylib-flex mylib-flex-col mylib-flex-grow mylib-overflow-auto">
      <div
        className={`mylib-overflow-auto mylib-bg-white mylib-rounded-[4px] mylib-max-h-[320px] mylib-h-[170px] mylib-flex-grow mylib-block ${
          isFetching ? "mylib-grid" : "mylib-block"
        }`}
      >
        {!isFetching ? (
          searchlist?.length ? (
            <table className="file-list__table custom-table mylib-table-fixed mylib-w-full">
              <thead>
                <tr className="">
                  <th className="mylib-sticky mylib-top-0 mylib-bg-white mylib-z-10 ">
                    <div className="mylib-flex">
                      <span className="mylib-block">نام فایل</span>
                      <div className="mylib-flex mylib-flex-col mylib-mr-[11px]">
                        <button
                          className="mylib-btn btn-up !mylib-p-0 mylib-bg-transparent hover:mylib-bg-transparent"
                          onClick={() => {
                            return setSortByName(-1);
                          }}
                        >
                          <FillArrow className="mylib-w-[9px] mylib-h-[9px] mylib-fill-[#B9B9B9]" />
                        </button>
                        <button
                          className="btn-down !mylib-p-0 mylib-bg-transparent hover:mylib-bg-transparent"
                          onClick={() => {
                            return setSortByName(1);
                          }}
                        >
                          <FillArrow className="mylib-w-[9px] mylib-h-[9px] mylib-fill-[#B9B9B9] mylib-rotate-180" />
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="mylib-sticky mylib-top-0 mylib-bg-white mylib-z-10">
                    <div className="mylib-flex">
                      <span className="mylib-block">تاریخ آپلود</span>
                    </div>
                  </th>
                  <th className="mylib-sticky mylib-top-0 mylib-bg-white mylib-z-10">حجم</th>
                  <th className="mylib-sticky mylib-top-0 mylib-bg-white mylib-z-10">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {searchlist?.map((item: IFile) => {
                  const link = generateDownloadLink?.(item);
                  return (
                    <tr
                      tabIndex={0}
                      key={JSON.stringify(item)}
                      className="hover:mylib-bg-sky-100 hover:mylib-cursor-pointer"
                      onClick={() => {
                        setOpenPreviewFile(true);
                        return onSelect?.(item);
                      }}
                    >
                      <td>
                        <div className="mylib-flex mylib-items-center">
                          <div className="mylib-w-8 mylib-h-8 mylib-inline-block">
                            <FileIcon
                              extension={item.extension}
                              {...defaultStyles[
                                item.extension as unknown as DefaultExtensionType
                              ]}
                              glyphColor={getColor(item.extension || "")}
                              labelColor={getColor(item.extension || "")}
                            />
                          </div>
                          <span className="mylib-block mylib-text-xs mylib-font-yekan-regular mylib-font-normal mylib-text-[#919191] mylib-mr-[10px] mylib-truncate">
                            {`${item.name || ""}.${
                              item.extension ? item.extension : ""
                            }`}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="mylib-px-3 mylib-py-[5px] mylib-font-yekan-medium mylib-text-xs mylib-text-[#919191] ">
                          {FaDateFromTimestamp(item.updated)}
                        </span>
                      </td>
                      <td>
                        <span className="mylib-px-3 mylib-py-[5px]  mylib-font-yekan-medium mylib-text-xs mylib-text-[#919191] ">
                          {`${item.size} کیلوبایت`}
                        </span>
                      </td>
                      <td>
                        <div className="file-table__actions mylib-h-8 mylib-flex mylib-gap-x-[21px] mylib-justify-end">
                          <div className="download-file">
                            {/* <RenderIf isTrue={!!link}> */}
                              <div className="mylib-btn mylib-p-0 mylib-bg-transparent hover:mylib-bg-transparent">
                                <a
                                  href={link}
                                  download
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <DownloadIcon className="mylib-h-5 mylib-w-5 mylib-stroke-[#0D99FF]" />
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
            <div className="file-list custom-table empty-table mylib-flex mylib-justify-center mylib-mt-4 mylib-table-fixed mylib-w-full">
              فایلی برای نمایش وجود ندارد.
            </div>
          )
        ) : (
          <div
            className="spinner mylib-self-center mylib-justify-center"
            style={{
              justifySelf: "center",
            }}
          />
        )}
      </div>
      <div
        dir="ltr"
        className="file-list__table file-list__pagination mylib-w-full mylib-h-fit mylib-bg-cover mylib-mt-[30px] mylib-text-left mylib-flex mylib-justify-end"
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
