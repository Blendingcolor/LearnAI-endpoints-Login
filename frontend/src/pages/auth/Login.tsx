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

const Login: React.FC = () => {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setIsError(true);
      return;
    }

    try {
      const response = await Api.authenticate({ username, password });
      const { id, name } = response.data;
      const authdata = window.btoa(`${username}:${password}`);
      const authenticatedUser: AuthUser = { id, name, authdata };

      Auth.userLogin(authenticatedUser);

      setFormData({ username: "", password: "" });

      setIsError(false);
    } catch (error) {
      handleLogError(error as AxiosError);
      setIsError(true);
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
              <h1 className="title--lg">Iniciar Sesión</h1>
              <p className="interactive--xl">
                ¿No tienes una cuenta aún?{" "}
                <Link className="link" to="/register">
                  Regístrate
                </Link>
              </p>
            </div>
            <form className="form form--auth" onSubmit={handleSubmit}>
              <DefaultField
                text="Usuario"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <PasswordField
                url="/forgot-your-password"
                type="linked"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="form__field form__field--rememberme">
                <input className="" type="checkbox" />
                <label className="interactive--lg">Recuérdame</label>
              </div>
              <SubmitButton type="default" text="Ingresar" />
            </form>

            <div>
              <hr />
            </div>
            <form
              className="form form--auth"
              action="http://localhost:8080/oauth2/authorization/google"
              method="get"
            >
              <SubmitButton type="google" text="Ingresar con Google" />
            </form>
            {isError && <p>The username or password provided are incorrect!</p>}
          </div>
          <div className="subcontainer__img--auth">
            <img
              height="400"
              src="https://st2.depositphotos.com/2419757/43548/v/450/depositphotos_435482738-stock-illustration-business-person-sitting-at-table.jpg"
              alt="Login image"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
