import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IFile } from "../interface";
import { XIcon } from "../assets/svg";

interface IProps {
  fileInfo: IFile;
  isLoading?: boolean;
  onRenameFile?: (file: IFile, newName: string) => void;
  handleClose: () => void;
}

interface IForm {
  newName: string;
}

const RenameFile = (props: IProps) => {
  const { fileInfo, isLoading, onRenameFile, handleClose } = props;
  // -------------------- HOOKS --------------------

  const form = useForm<IForm>();

  const { register, handleSubmit, formState, reset, clearErrors } = form;
  const { errors } = formState;

  const handleReset = () => {
    reset();
    clearErrors();
  };

  const onSubmit = async (data: IForm) => {
    if (!data.newName.includes(".")) {
      toast("لطفا پسوند فایل را وارد کنید");
    }
    onRenameFile?.(fileInfo, data.newName);
    if (isLoading === false) {
      handleClose();
      handleReset();
    }
  };

  useEffect(() => {
    if (!!isLoading) {
      handleReset();
    }
  }, [isLoading]);

  return (
    <div className="file-management__edit" key={fileInfo.hash}>
      <div
        role="button"
        tabIndex={0}
        className={` dialog-content__modal cls-modal !cls-w-full cls-cursor-default cls-modal-open`}
        onClick={handleClose}
      >
        <div
          onClick={(e) => {
            return e.stopPropagation();
          }}
          role="button"
          tabIndex={-1}
          className="file-management__edit-modal cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full cls-p-0 cls-overflow-hidden cls-text-right cls-cursor-default"
        >
          <div className="cls-overflow-auto cls-modal-box cls-max-w-[32rem] cls-bg-white !cls-w-full">
            <div className="cls-flex cls-flex-wrap cls-items-center">
              <h3 className="lib-modal-title">ویرایش نام فایل</h3>
              <button
                className="cls-w-fit cls-mr-auto"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="cls-fill-[#919191] cls-w-4 cls-h-4" />
              </button>
            </div>

            <form
              className="dialog-content__form cls-mt-[30px] cls-flex cls-flex-col"
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
                className="dialog-content__Input cls-input cls-input-bordered input input-bordered cls-w-full cls-mt-[10px]"
              />
              {errors?.newName && (
                <small className="dialog-content__errorText cls-text-[#F56C6C] cls-text-sm cls-w-full cls-h-5 cls-block cls-mt-3">
                  {errors?.newName?.message}
                </small>
              )}

              <div className="dialog-content__action-part lib-modal-action cls-modal-action cls-mt-[30px]">
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <button
                      className="dialog-content__submit cls-btn lib-btn lib-modal-btn-success"
                      type="submit"
                    >
                      تایید
                    </button>
                    <button
                      className="dialog-content__btns lib-btn cls-btn lib-modal-btn-cancel"
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
