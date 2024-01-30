import { Button, Text, TextArea, TextInput } from '@tonho-ignite-ui/react'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmStep() {
  function handleConfigScheduling() {}
  return (
    <ConfirmForm as="form" onSubmit={handleConfigScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>
      <label>
        <Text size="sm">Endereco de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>
      <FormActions>
        <Button variant="tertiary">Cancelar</Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
