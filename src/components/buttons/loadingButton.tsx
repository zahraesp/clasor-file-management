import { Button } from "@material-tailwind/react";
import { Spinner } from "../../extra/spinner";
import { ReactNode } from "react";

interface IProps {
  loading?: boolean;
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const LoadingButton = ({
  loading,
  children,
  className,
  onClick,
  disabled,
}: IProps) => {
  return (
    <Button
      placeholder=""
      variant="text"
      className={`${
        className || ""
      } cls-flex cls-justify-center cls-items-center cls-gap-2 cls-w-[50%] xs:cls-w-[100px] xs:!cls-max-w-[100px] cls-h-12 xs:cls-h-8 cls-px-3 xs:cls-px-1 cls-rounded-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {children}
         {loading ? (
          <Spinner
            className={`cls-w-5 cls-h-5 cls-text-white`}
          />
        ) : null}
      </>
    </Button>
  );
};

export default LoadingButton;
