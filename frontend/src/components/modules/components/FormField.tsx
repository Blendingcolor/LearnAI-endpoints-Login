import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

export const DefaultField = ({
  text,
  type,
  value,
  name,
  onChange,
}: {
  text: string;
  type: "text" | "email";
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="form__field">
      <label className="interactive--xl">{text}</label>
      <input
        className="input input--form interactive--lg"
        type={type}
        placeholder={"Ingresa tu " + text.toLowerCase()}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export const PasswordField = ({
  url,
  type,
  value,
  name,
  onChange,
}: {
  url?: string;
  type: "default" | "repeated" | "linked";
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const labelTexts = {
    default: {
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
    },
    repeated: {
      label: "Repite tu contraseña",
      placeholder: "Repite tu contraseña",
    },
    linked: {
      label: "Contraseña",
      placeholder: "Ingresa tu contraseña",
    },
  };

  return (
    <div className="form__field">
      <div className="label__container interactive--xl">
        <label>{labelTexts[type].label}</label>
        {type === "linked" && url && (
          <Link className="link" to={url}>
            ¿Has olvidado tu contraseña?
          </Link>
        )}
      </div>
      <input
        className="input input--form interactive--lg"
        type="password"
        placeholder={labelTexts[type].placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
