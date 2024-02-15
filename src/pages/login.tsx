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
import { useSession, signIn, signOut } from "next-auth/react"

const login = (props: PaperProps) => {
  
  const { data: session } = useSession()
  console.log(session)

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const handleLogin = async (name:string,password:string) => {
    
    await signIn('credentials', {
      redirect: false,
      name,
      password,
    })
    console.log('loged with' + name + password)

  }

  return (
    <>
      <div
        style={{
          maxWidth: "calc(26.25rem * var(--mantine-scale))",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >

        {session?.user?(
          <p>non</p>
        ):(
            
          
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" fw={500}>
            Welcome to Login page
          </Text>

          <form onSubmit={form.onSubmit((e) => {handleLogin(e.name,e.password)})}>
            <Stack>
              <TextInput
                required
                label="Name"
                placeholder="john.doe@gmail.com"
                value={form.values.name}
                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                error={form.errors.name && "Invalid name"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                error={form.errors.password && "Password should include at least 6 characters"}
                radius="md"
              />
            </Stack>

            <Group justify="center" mt="xl">
              <Button type="submit" radius="xl">
                {upperFirst("login")}
              </Button>
            </Group>
          </form>
        </Paper>
        )}
        
      </div>
    </>
  );
};

export default login;