import { ActionIcon } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
  onAccept?: () => void;
  onCancel?: () => void;
}
export const YesNoButton: FC<Props> = ({ onAccept, onCancel }) => {
  const handleAccept = () => {
    onAccept?.();
  };
  const handleClose = () => {
    onCancel?.();
  };

  return (
    <>
      <ActionIcon onClick={handleClose}>
        <IconX size={20} />
      </ActionIcon>
      <ActionIcon onClick={handleAccept}>
        <IconSearch size={20} />
      </ActionIcon>
    </>
  );
};
