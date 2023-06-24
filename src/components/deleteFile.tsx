import { useEffect, useState } from "react";
import { IFile } from "../interface";
import { TrashIcon, XIcon } from "../assets/svg";

interface IProps {
  fileInfo: IFile;
  isLoading?: boolean;
  onDeleteFile?: (file: IFile) => void;
}
const DeleteFile = (props: IProps) => {
  const { fileInfo, isLoading, onDeleteFile } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    onDeleteFile?.(fileInfo);
  };

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
    }
  }, [isLoading]);

  return (
    <div className="file-management__delete">
      <button
        className="dialog-content__button mylib-btn mylib-p-0 mylib-bg-transparent hover:mylib-bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          return setOpen(true);
        }}
      >
        <TrashIcon className="dialog-content__button-icon mylib-h-5 mylib-w-5 mylib-fill-[#F56C6C]" />
      </button>
      <div
        role="button"
        tabIndex={0}
        className={`dialog-content__modal mylib-modal mylib-cursor-default  ${
          open ? "mylib-modal-open" : ""
        }`}
        onClick={() => {
          return setOpen(false);
        }}
      >
        <div
          onClick={(e) => {
            return e.stopPropagation();
          }}
          role="button"
          tabIndex={-1}
          className="file-management__delete-modal  mylib-modal-box mylib-p-0 mylib-overflow-hidden mylib-text-right mylib-cursor-default"
        >
          <div className="mylib-overflow-auto mylib-modal-box">
            <div className="mylib-flex mylib-flex-wrap mylib-items-center">
              <h3 className="mylib-modal-title">حذف فایل</h3>
              <button
                className="mylib-w-fit mylib-mr-auto"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="mylib-fill-[#919191] mylib-w-4 mylib-h-4" />
              </button>
            </div>
            <div className="mylib-flex mylib-items-center mylib-mt-[30px]">
              <p className="mylib-text-[#919191]">
                {`
            آیا از حذف فایل ${fileInfo.name} مطمئن هستید؟
            `}
              </p>
            </div>

            <div className="dialog-content__action-part mylib-modal-action mylib-mt-[30px]">
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>
                  <button
                    className="dialog-content__submit mylib-btn modal-btn-success"
                    onClick={handleDelete}
                  >
                    تایید
                  </button>
                  <button
                    className="dialog-content__btns mylib-btn modal-btn-cancel"
                    type="button"
                    onClick={handleClose}
                  >
                    انصراف
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFile;
