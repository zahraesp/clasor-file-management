import { Button } from "@material-tailwind/react";
import { XIcon } from "../../assets/svg";

interface IProps {
  onClose: () => void;
  disabled?: boolean;
}

const CloseButton = ({ onClose, disabled }: IProps) => {
  return (
    <Button
      placeholder="close button"
      className="close-button !cls-bg-transparent !cls-shadow-none hover:!cls-shadow-none !cls-outline-none !cls-p-0"
      onClick={onClose}
      disabled={disabled}
    >
      <XIcon className="cls-w-6 cls-h-6 !cls-fill-[#5c5c5c]" />
    </Button>
  );
};

export default CloseButton;
