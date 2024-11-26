import { Link, Navigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  DefaultField,
  PasswordField,
} from "../../components/modules/components/FormField";
import { Navbar } from "../../components/modules/layout/navbar";
import { SubmitButton } from "../../components/modules/elements/buttons";
import { useAuth } from "../../components/context/auth/UseAuth";
import { Api } from "../../components/misc/Api";
import { handleLogError } from "../../components/misc/Helpers";
import { AxiosError } from "axios";

interface AuthUser {
  id: string;
  name: string;
  authdata: string;
}

const Register: React.FC = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setIsError(true);
      setErrorMessage("Please, inform all fields!");
      return;
    }

    try {
      const response = await Api.register({ username, email, password });
      const { id, name } = response.data;
      const authdata = window.btoa(`${username}:${password}`);
      const authenticatedUser: AuthUser = { id, name, authdata };

      Auth.userLogin(authenticatedUser);

      setFormData({ username: "", email: "", password: "" });
      setIsError(false);
    } catch (error) {
      handleLogError(error as AxiosError);
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data;
        let errorMessage = "Invalid fields";
        if (
          errorData &&
          typeof errorData === "object" &&
          "status" in errorData &&
          errorData.status === 409
        ) {
          errorMessage = (errorData as unknown as { message: string }).message;
        } else if (
          errorData &&
          typeof errorData === "object" &&
          "status" in errorData &&
          errorData.status === 400
        ) {
          if ("errors" in errorData && Array.isArray(errorData.errors)) {
            errorMessage = errorData.errors[0].defaultMessage;
          } else {
            errorMessage = "Invalid fields";
          }
        }
        setIsError(true);
        setErrorMessage(errorMessage);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flexbox flexbox--center main">
        <section className="container container--auth">
          <div className="subcontainer--auth">
            <div className="d-flex f-col gap-1">
              <h1 className="title--lg">Regístrate</h1>
              <p className="interactive--xl">
                ¿Ya tienes una cuenta?{" "}
                <Link className="link" to="/login">
                  Inicia Sesión
                </Link>
              </p>
            </div>
            <form className="form form--auth" onSubmit={handleSubmit}>
              <div className="flexbox gap-2 f-wrap">
                <DefaultField
                  text="Usuario"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <DefaultField
                  text="Correo"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flexbox gap-2 f-wrap">
                <PasswordField
                  type="default"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <SubmitButton type="default" text="Regístrate" />
            </form>

            <div>
              <hr />
            </div>
            <form
              className="form form--auth"
              action="/oauth2/authorization/google"
              method="get"
            >
              <SubmitButton type="google" text="Regístrate con Google" />
            </form>
          </div>
          {isError && <p>{errorMessage}</p>}
        </section>
      </main>
    </>
  );
};

export default Register;
