import {
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Flex,
} from '@mantine/core'

import classes from './page.module.css'
import AuthForm from '../../components/authForm/AuthForm'
import { loginRequest } from '../../utils/requests'

const loginPage = () => {
  return (
    <Container size={500} pt={'10vh'}>
      <Flex justify="center" align="center" direction="column">
        <Title ta="center" className={classes.title} c="white" order={1}>
          CFG Fitness Tracker
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={'8vh'}
          radius="md"
          maw={420}
          w={'100%'}
        >
          <Stack>
            <Title ta="center" order={2}>
              Log In
            </Title>
            <AuthForm
              buttonText="Log In"
              submitAction={loginRequest}
              dataQaIdPrefix="logIn"
            />
            <Text c="dimmed" size="sm" ta="center" pt="20px">
              Don&apos;t have an account yet?{' '}
              <Anchor size="sm" href="/signup" c="#FD6580">
                Sign Up Here
              </Anchor>
            </Text>
            <Text c="dimmed" size="sm" ta="center" pt="20px">
              Forgot Your Password?{' '}
              <Anchor size="sm" href="/forgot-password" c="#FD6580">
                Reset Your Password
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Flex>
    </Container>
  )
}

export default loginPage
