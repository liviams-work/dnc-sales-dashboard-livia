import { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { SubmitEventHandler } from 'react'

import { useNavigate } from 'react-router-dom' //import para redirecionar a pagina

//COMPONENTS

import { Box, Container, Grid } from '@mui/material'
import {
  BannerImage,
  FormComponents,
  Logo,
  StyledH1,
  StyledP,
} from '@/components'

//HOOKS
import { useFormValidation } from '@/hooks'

//UTILS
import { pxToRem } from '@/utils'

//TYPES
import type { MessageProps } from '@/types'

function Login() {
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' },
  ]

  const [error, setError] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleMessage = (): MessageProps => {
    if (!error) {
      return { msg: '', type: 'success' }
    }

    switch (error) {
      case 401:
        return {
          msg: 'Email e/ou senha incorretos',
          type: 'error',
        }

      default:
        return {
          msg: 'Erro ao realizar login. Entre em contato com o nosso suporte.',
          type: 'error',
        }
    }
  }
  const navigate = useNavigate() // para o redirecionamento da pag
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setLoading(true)

    // Simulação sem usar a API pq nao consegui fazer o login funcionar, mas era para aparecer o error caso tivesse algum erro no login :)
    setTimeout(() => {
      setLoading(false)
      setError(null)
      navigate('/home') // redireciona apos o login feito sem api
    }, 500)
  }

  return (
    <>
      <Box>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>

              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Digite sua senha e email para logar</StyledP>
              </Box>

              <FormComponents
                inputs={inputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index],
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, (e.target as HTMLInputElement).value),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled: !formValid || loading,
                    type: 'submit',
                    children: loading ? 'Aguarde...' : 'Login',
                  },
                ]}
                message={handleMessage()}
                onSubmit={handleSubmit}
              />
            </Container>
          </Grid>

          <Grid size={{ sm: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default Login
