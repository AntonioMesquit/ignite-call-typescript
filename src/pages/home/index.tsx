import { Heading, Text } from '@tonho-ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import PreviewImage from '../../assets/apppreview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={'4xl'}>Agendamento descomplicado</Heading>
        <Text size={'xl'}>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={PreviewImage}
          height={400}
          quality={100}
          priority
          alt="calendario"
        />
      </Preview>
    </Container>
  )
}
