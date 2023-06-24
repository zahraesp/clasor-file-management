import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/svg";

interface IProps {
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  changePage?: number;
}

export const Pagination = (props: IProps) => {
  const { total, pageSize, onChange, changePage } = props;

  const [currectPage, setCurrectPage] = useState(1);

  useEffect(() => {
    if (typeof changePage !== "undefined") {
      setCurrectPage(changePage);
    }
  }, []);

  const calculateCount = () => {
    let count = 1;
    if (total > pageSize && !!(total % pageSize)) {
      count = Math.floor(total / pageSize) + 1;
    } else if (total > pageSize && !(total % pageSize)) {
      count = Math.floor(total / pageSize);
    }
    return count;
  };
  const pageCount = calculateCount();

  const handleNext = () => {
    onChange(currectPage + 1);
    setCurrectPage(currectPage + 1);
  };

  const handlePrev = () => {
    onChange(currectPage - 1);
    setCurrectPage(currectPage - 1);
  };

  const keys = Array.from(Array(pageCount).keys());
  const pageList = [...keys];

  const getBefore = (pageListArr: Array<number>, cPage: number) => {
    const list = [];
    if (cPage - 3 === 0) {
      list.push(pageListArr[0]);
    }

    if (pageListArr[cPage - 2] >= 0) {
      list.push(pageListArr[cPage - 2]);
    }
    if (pageListArr[cPage - 1] >= 0) {
      list.push(pageListArr[cPage - 1]);
    }
    return list;
  };

  const getNext = (pageListArr: Array<number>, cPage: number) => {
    const list = [];
    if (pageListArr[cPage + 1]) {
      list.push(pageListArr[cPage + 1]);
    }
    if (pageListArr[cPage + 2] && !(pageListArr.length === cPage + 3)) {
      list.push(pageListArr[cPage + 2]);
    }
    if (pageListArr.length === cPage + 3) {
      list.push(pageListArr[pageListArr.length - 1]);
    }
    return list;
  };

  const handlePage = (page: number) => {
    onChange(page);
    setCurrectPage(page);
  };

  return (
    <div className="mylib-flex pagination">
      <div className="mylib-flex mylib-text-xs mylib-w-[60px] mylib-justify-around mylib-bg-[#fff] mylib-mr-5 mylib-items-center mylib-drop-shadow-[0px_2px_3px_rgba(0,0,0,0.07)] mylib-rounded-[4px] mylib-overflow-hidden">
        <span>{pageList.length}</span>
        <span>از</span>
        <span>{currectPage + 1}</span>
      </div>
      <div className="pagination mylib-flex mylib-items-center mylib-w-fit mylib-bg-white mylib-drop-shadow-[0px_2px_3px_rgba(0,0,0,0.07)] mylib-rounded-[4px] mylib-overflow-hidden">
        <button
          disabled={!pageList[currectPage]}
          onClick={handlePrev}
          className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-p-[10px] mylib-text-xs disabled:mylib-bg-transparent"
        >
          <ChevronLeftIcon
            className={`mylib-w-3 mylib-h-3 mylib-stroke-[#919191] ${
              !pageList[currectPage] ? "mylib-stroke-gray-300" : ""
            }`}
          />
        </button>
        {currectPage - 3 > 0 && (
          <>
            <button
              className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-py-[10px] mylib-px-3 mylib-text-[#131313]"
              onClick={() => {
                handlePage(0);
              }}
            >
              1
            </button>
            {currectPage - 3 && <span>...</span>}
          </>
        )}

        {getBefore(pageList, currectPage).map((item) => {
          return (
            <button
              className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-py-[10px] mylib-px-3 mylib-text-[#131313]"
              onClick={() => {
                handlePage(item);
              }}
              key={item}
            >
              {item + 1}
            </button>
          );
        })}
        <button className="mylib-btn mylib-bg-[#7446B2] hover:mylib-bg-transparent mylib-py-[10px] mylib-px-3 mylib-text-[#fff] hover:mylib-text-[#7446B2]">
          {currectPage + 1}
        </button>
        {getNext(pageList, currectPage).map((item) => {
          return (
            <button
              className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-py-[10px] mylib-px-3 mylib-text-[#131313]"
              onClick={() => {
                handlePage(item);
              }}
              key={item}
            >
              {item + 1}
            </button>
          );
        })}

        {pageList.length > currectPage + 3 && (
          <>
            {pageList.length !== currectPage + 4 && <span>...</span>}
            <button
              className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-py-[10px] mylib-px-3 mylib-text-[#131313]"
              onClick={() => {
                handlePage(pageList.length - 1);
              }}
            >
              {pageList.length}
            </button>
          </>
        )}
        <button
          disabled={!pageList[currectPage + 1]}
          onClick={handleNext}
          className="mylib-btn mylib-bg-transparent hover:mylib-bg-transparent mylib-p-[10px] mylib-text-xs disabled:mylib-bg-transparent"
        >
          <ChevronRightIcon
            className={`mylib-w-3 mylib-h-3 mylib-stroke-[#919191] ${
              !pageList[currectPage + 1] ? "mylib-stroke-gray-300" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
