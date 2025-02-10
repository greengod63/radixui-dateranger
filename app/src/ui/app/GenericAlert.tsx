import React from "react";
import AlertDialog from "../components/AlertDialog";
import { GlobalDispatcher } from "../utils/EventDispatcher";
import Events from "../../events";

const GenericAlert = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [button, setButton] = React.useState("");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    GlobalDispatcher.addEventListener(Events.SHOW_ALERT, (data) => {
      const { title, description, button } = data;
      setTitle(title);
      setDescription(description);
      setButton(button);
      setOpen(true);
    });
  }, []);

  return (
    <AlertDialog.Controlled
      title={title}
      description={description}
      cancel={button}
      open={open}
      setOpen={() => {
        setOpen(false);
      }}
    />
  );
};

export default GenericAlert;
