import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "./Button";
import { HRule } from "./Rule";
import { violet, blackA, red, mauve } from "@radix-ui/colors";
import { styled, keyframes } from "../theme";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 100,
});

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 101,
  "&:focus": { outline: "none" },
});

const AlertDialogTitle = styled(AlertDialog.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
});

const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const Flex = styled("div", { display: "flex" });

const AlertDialogComposed = ({
  trigger = null,
  title,
  description,
  cancel,
  confirmations = null,
  open: isOpen = false,
}) => {
  const [open, setOpen] = React.useState(isOpen);
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <HRule css={{ my: "$2" }}></HRule>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <HRule css={{ my: "$2" }}></HRule>
          <Flex css={{ justifyContent: "flex-end", columnGap: "$1" }}>
            <AlertDialog.Cancel asChild>{cancel}</AlertDialog.Cancel>
            {confirmations &&
              confirmations.length &&
              confirmations.map((conf, index) => {
                return (
                  <AlertDialog.Action key={index} asChild>
                    {conf}
                  </AlertDialog.Action>
                );
              })}
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

const ControlledDialog = ({
  title,
  description,
  cancel,
  open = false,
  setOpen,
}) => {
  return (
    <AlertDialog.Root open={open} setOpen={setOpen}>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <HRule css={{ my: "$2" }}></HRule>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <HRule css={{ my: "$2" }}></HRule>
          <Flex css={{ justifyContent: "flex-end", columnGap: "$1" }}>
            <AlertDialog.Cancel asChild>
              <Button onClick={setOpen}>{cancel}</Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

AlertDialogComposed.Controlled = ControlledDialog;

export default AlertDialogComposed;
