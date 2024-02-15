import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from '../styles/login.module.scss';

const Login = (props: PaperProps) => {

  const { data: session } = useSession();
  console.log(session);

  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      name: (val: string) => (null),
      password: (val: string) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  const handleLogin = async (name: string, password: string) => {
    await signIn('credentials', {
      redirect: false,
      name,
      password,
    });
    console.log('Logged with ' + name + password);
  };

  return (
      <div className={styles.container}>
        {session?.user ? (
            <p>Already logged in</p>
        ) : (
            <Paper radius="md" p="xl" withBorder {...props}>
              <h1>Connexion au manager</h1>

              <form onSubmit={form.onSubmit((e) => {
                handleLogin(e.name, e.password)
              })}>
                <div className={styles.containerInput}>
                  <div>
                    <input
                        placeholder={"Pseudo"}
                        className={styles.input}
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        value={form.values.name}
                        onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                    />
                  </div>
                  <div>
                    <input
                        placeholder={"Mot de passe"}
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                    />
                  </div>
                  <div className={styles.containerButton}>
                    <label className={styles.labelCheckBox}>
                      <input
                          type="checkbox"
                      />{" "}
                      Se souvenir de moi
                    </label>
                    <Button type="submit" radius="xl" className={styles.btnblue}>
                      {upperFirst("Connexion")}
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
        )}
      </div>
  );
};

export default Login;
