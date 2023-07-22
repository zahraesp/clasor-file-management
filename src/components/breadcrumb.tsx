import { IBreadcrumb, IFile, IFolder } from "../interface";

interface IProps {
  breadcrumbList: IBreadcrumb[];
  onSelectFile?: (file: IFile | IFolder | IBreadcrumb) => void;
}

const Breadcrumb = ({ breadcrumbList, onSelectFile }: IProps) => {
  return (
    <nav className="cls-mb-4">
      <ul className="file-manager-breadcrumb cls-flex cls-gap-2 cls-items-center">
        {breadcrumbList.reverse().map((breadItem, index) => {
          return (
            <li>
              {index + 1 === breadcrumbList.length ? (
                <span>{breadItem.name}</span>
              ) : (
                <button
                  className="cls-cursor-pointer"
                  onClick={() => {
                    onSelectFile?.(breadItem);
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
