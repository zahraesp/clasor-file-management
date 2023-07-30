import styles from "../../animateStyle.module.css"

const ProgressBar = ({ usage, total, isFetching }: {usage?: number, total?: number ,isFetching?: boolean}) => {
  const fraction = usage !== undefined && total !== undefined
    ? Math.floor((usage / total) * 100)
    : 0;

  const volumeUnit = (space: number | undefined) => {
    if (space !== undefined) {
      let remainingSpace = space;
      let count = 0;

      while (remainingSpace >= 1024) {
        remainingSpace = Math.floor(remainingSpace / 1024);
        count += 1;
      }

      switch (count) {
        case 3:
          return `${remainingSpace} گیگابایت`;
        case 2:
          return `${remainingSpace} مگابایت`;
        case 1:
          return `${remainingSpace} کیلوبایت`;
        default:
          return `${remainingSpace} بایت`;
      }
    }
    return "-";
  };

  if (isFetching) {
    return (
      <div className={styles.square}/>
    );
  }

  return (
    <div
      style={{
        direction: "rtl",
      }}
    >
      <div
        className="cls-flex cls-items-center"
      >
        <div className="cls-w-full cls-bg-gray-200 cls-rounded-full cls-h-5.5">
          <div
            style={{
              width: `${fraction}%`,
            }}
            className="cls-bg-[#673AB7] cls-h-5.5 cls-rounded-full cls-text-white"
          >
            <p className="cls-text-white cls-text-xs cls-text-center">
              {`${fraction}%`}
            </p>
          </div>
        </div>
      </div>
      <div className="cls-flex cls-justify-between cls-items-center cls-flex-col"  style={{marginTop: "0.45rem"}}>
        <span className="cls-text-xs cls-text-primary cls-font-bold">
          {volumeUnit(usage)}
          {" "}
          از
          {" "}
          {volumeUnit(total)}
          {" "}
          استفاده شده است.
        </span>
      </div>
    </div>
  );
};
export default ProgressBar;
