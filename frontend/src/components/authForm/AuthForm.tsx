'use client'
import { TextInput, PasswordInput, Button, Alert, rem } from '@mantine/core'
import { IconLock, IconUser, IconAlertCircle } from '@tabler/icons-react'
import classes from './AuthForm.module.css'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../context/AuthContextProvider'
import { ErrorContext } from '../../context/ErrorContextProvider'

import { useForm, SubmitHandler } from 'react-hook-form'

const lockIcon = (
  <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
)
const userIcon = (
  <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
)
const errorIcon = (
  <IconAlertCircle style={{ width: rem(18), height: rem(18) }} stroke={2} />
)

interface IFormInput {
  username: string
  password: string
}

const AuthForm = ({
  buttonText,
  submitAction,
  dataQaIdPrefix,
}: {
  buttonText: string
  submitAction: Function
  dataQaIdPrefix: string
}) => {
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext)
  const { error, errorMessage, setError, clearError } = useContext(ErrorContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    clearError()
    const response = await submitAction(data)
    if (response.success === true) {
      setCurrentUser(data.username)
      setIsLoggedIn(true)
      router.push('/')
    } else {
      setError(response.error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Username"
        placeholder="Your username"
        error={errors.username ? 'Invalid username' : false}
        leftSection={userIcon}
        {...register('username', { required: true })}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        error={errors.password ? 'Invalid password' : false}
        mt="md"
        mb="md"
        leftSection={lockIcon}
        {...register('password', { required: true })}
      />
      {error && (
        <Alert
          variant="light"
          color="orange"
          title={errorMessage}
          icon={errorIcon}
          mb={'1rem'}
        ></Alert>
      )}
      <Button size="md" fullWidth className={classes.loginButton} type="submit">
        {buttonText}
      </Button>
    </form>
  )
}

export default AuthForm
