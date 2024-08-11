import { IBreadcrumb } from "../interface";

interface IProps {
  breadcrumbList: IBreadcrumb[];
  onSelectBreadItem?: (breadItem: IBreadcrumb) => void;
}

const Breadcrumb = ({ breadcrumbList, onSelectBreadItem }: IProps) => {

  return (
    <nav className="cls-mb-4">
      <ul className="file-manager-breadcrumb cls-flex cls-gap-2 cls-items-center">
        {[...breadcrumbList].reverse().map((breadItem, index) => {
          return (
            <li key={breadItem.hash}>
              {index + 1 === breadcrumbList.length ? (
                <span>{breadItem.name}</span>
              ) : (
                <button
                  className="cls-cursor-pointer"
                  onClick={() => {
                    onSelectBreadItem?.(breadItem);
                  }}
                >
                  {breadItem.name}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
