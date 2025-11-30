import { IFile } from "../interface";
import { XIcon } from "../assets/svg";

interface IProps {
  fileInfo: IFile;
  isLoading?: boolean;
  onPublicFile?: (file: IFile) => void;
  handleClose: () => void;
}

const PublicFile = (props: IProps) => {
  const { fileInfo, isLoading, onPublicFile, handleClose } = props;

  const handlePublic = async () => {
    onPublicFile?.(fileInfo);
    if (isLoading === false) {
      handleClose();
    }
  };

  return (
    <div className="file-management__public">
      <div
        role="button"
        tabIndex={0}
        className={`dialog-content__modal !cls-w-full cls-modal cls-cursor-default cls-modal-open`}
        onClick={handleClose}
      >
        <div
          onClick={(e) => {
            return e.stopPropagation();
          }}
          role="button"
          tabIndex={-1}
          className="file-management__public-modal !cls-w-full cls-max-w-[32rem] cls-bg-white cls-modal-box cls-p-0 cls-overflow-hidden cls-text-right cls-cursor-default"
        >
          <div className="cls-overflow-auto !cls-w-full cls-max-w-[32rem] cls-bg-white cls-modal-box">
            <div className="cls-flex cls-flex-wrap cls-items-center">
              <h3 className="lib-modal-title"> عمومی کردن فایل</h3>
              <button
                className="cls-w-fit cls-mr-auto"
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="cls-fill-[#919191] cls-w-4 cls-h-4" />
              </button>
            </div>
            <div className="cls-flex cls-items-center cls-mt-[30px]">
              <p className="cls-text-[#919191]">
                {`
            آیا از عمومی کردن فایل ${fileInfo.name} مطمئن هستید؟
            `}
              </p>
            </div>

            <div className="dialog-content__action-part lib-modal-action cls-modal-action cls-mt-[30px]">
              {isLoading ? (
                <div className="spinner" />
              ) : (
                <>
                  <button
                    className="dialog-content__submit cls-btn lib-btn lib-modal-btn-success"
                    onClick={handlePublic}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFile;
