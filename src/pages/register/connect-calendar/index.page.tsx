import { Button, Heading, MultiStep, Text } from '@tonho-ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { ConnectBox, ConnectItem, Error } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Register() {
  const session = useSession()
  const router = useRouter()
  const hasAuthError = !!router.query.error // transformar em boolean
  const isSignedIn = session.status === 'authenticated'
  if (isSignedIn) {
    toast.success('Usuario Autenticado com sucesso!')
  }

  async function handleConnectCalendar() {
    await signIn('google', { callbackUrl: '/register/connect-calendar' })
  }
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <p style={{ color: '#f75a68', marginBottom: '16px' }}>
            Falha ao conectar ao Google,verifique se você aceitou todas as
            permissões de acesso ao Google Calendar.
          </p>
        )}
        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
        </Button>
      </ConnectBox>
    </Container>
  )
}
