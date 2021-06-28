import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '@components/Input';

interface IProfileFormData {
  name: string
}

export default function Name({ name }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async ({ name }: IProfileFormData) => {
      try {
        setLoading(true)

        const schema = yup.object().shape({
          name: yup.string().max(30, "Máximo de 30 caracteres").required('Nome obrigatório')
        });


        await schema.validate({
          name
        }, {
          abortEarly: false,
        });

        const response = await api.put('/profile', {
          name
        })

        saveOnCookies({ user: response.data })

        router.back()
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError('name', 'Não foi possível atualizar seu nome')
      } finally {
        setLoading(false)
      }

    },
  [])
  return (
    <div className={styles.container}>
      <Header text="Editar nome" />
      <Form ref={formRef} onSubmit={handleSubmit} className={styles.content}>
        <div className={utilStyles.field}>
          <label htmlFor="name">Nome</label>
          <Input
            defaultValue={name}
            type="text"
            name="name"
            placeholder="Insira seu nome..."
          />
        </div>
        <div className={styles.buttonConfirmation}>
          <Button type="submit" isLoading={loading}>Confirmar</Button>
        </div>
      </Form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const name = query.name

  return {
    props: {
      name
    }
  }
})
