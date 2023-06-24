import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IFile } from "../interface";
import { PencilIcon, XIcon } from "../assets/svg";

interface IProps {
  fileInfo: IFile;
  isLoading?: boolean;
  onRenameFile?: (file: IFile, newName: string) => void;
}

interface IForm {
  newName: string;
}

const RenameFile = (props: IProps) => {
  const { fileInfo, isLoading, onRenameFile } = props;
  const [open, setOpen] = useState(false);
  // -------------------- HOOKS --------------------

  const form = useForm<IForm>();

  const { register, handleSubmit, formState, reset, clearErrors } = form;
  const { errors } = formState;

  const handleClose = () => {
    setOpen(!open);
    reset();
  };

  const handleReset = () => {
    reset();
    clearErrors();
  };

  const onSubmit = async (data: IForm) => {
    if (!data.newName.includes(".")) {
      toast("لطفا پسوند فایل را وارد کنید");
    }
    onRenameFile?.(fileInfo, data.newName);
  };

  useEffect(() => {
    if (!isLoading) {
      setOpen(false);
      handleReset();
    }
  }, [isLoading]);

  return (
    <div className="file-management__edit">
      <button
        className=" dialog-content__button mylib-btn mylib-p-0 mylib-bg-transparent mylib-hover:bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <PencilIcon className="dialog-content__button-icon mylib-h-5 mylib-w-5 mylib-fill-[#0D99FF]" />
      </button>
      <div
        role="button"
        tabIndex={0}
        className={` dialog-content__modal mylib-modal mylib-cursor-default  ${
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
          className="file-management__edit-modal mylib-modal-box mylib-p-0 mylib-overflow-hidden mylib-text-right mylib-cursor-default"
        >
          <div className="mylib-overflow-auto mylib-modal-box">
            <div className="mylib-flex mylib-flex-wrap mylib-items-center">
              <h3 className="mylib-modal-title">ویرایش نام فایل</h3>
              <button
                className="mylib-w-fit mylib-mr-auto"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="mylib-fill-[#919191] mylib-w-4 mylib-h-4" />
              </button>
            </div>

            <form
              className="dialog-content__form mylib-mt-[30px] mylib-flex mylib-flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="file-rename-id">نام جدید</label>
              <input
                id="file-rename-id"
                {...register("newName", {
                  value: `${fileInfo.name || ""}.${fileInfo.extension || ""}`,
                })}
                type="text"
                placeholder="نام جدید فایل را وارد کنید"
                className="dialog-content__Input mylib-input mylib-input-bordered input input-bordered mylib-w-full mylib-mt-[10px]"
              />
              {errors?.newName && (
                <small className="dialog-content__errorText mylib-text-[#F56C6C] mylib-text-sm mylib-w-full mylib-h-5 mylib-block mylib-mt-3">
                  {errors?.newName?.message}
                </small>
              )}

              <div className="dialog-content__action-part mylib-modal-action mylib-mt-[30px]">
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <button
                      className="dialog-content__submit mylib-btn modal-btn-success"
                      type="submit"
                    >
                      ارسال
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameFile;
