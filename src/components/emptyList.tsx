import { FolderEmptyIcon } from "../assets/svg";

const EmptyList = () => {
  return (
    <div className="cls-flex cls-flex-col cls-h-full cls-mx-auto cls-justify-center cls-items-center cls-gap-3">
      <FolderEmptyIcon className="cls-h-16 cls-w-16 cls-stroke-gray-300" />
      <div className="cls-flex cls-flex-col cls-gap-1">
        <p  className="!cls-text-[13px] !cls-leading-[19.5px] !-cls-tracking-[0.13px] !cls-font-medium !cls-font-yekan-regular cls-text-[#0C0E10]">
          فایلی برای نمایش وجود ندارد.
        </p>
      </div>
    </div>
  );
};

export default EmptyList;
