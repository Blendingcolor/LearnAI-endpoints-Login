import { GoogleIcon } from "./icons";

export const SubmitButton = ({
  text,
  type,
}: {
  text: string;
  type: "default" | "google";
}) => {
  const types = {
    default: {
      className: "button--submit--default",
      icon: "",
    },
    google: {
      className: "button--submit--google",
      icon: <GoogleIcon />,
    },
  };

  const extraClassName = types[type].className;
  const icon = types[type].icon;

  return (
    <button
      className={
        "interactive--xl d-flex justify-center align-center gap-1 button button--submit " +
        extraClassName
      }
      type="submit"
    >
      {type !== "default" && icon} 
      <span>{text}</span>
    </button>
  );
};
