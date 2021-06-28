import Button from '@components/Button';
import Header from '@components/Header';
import InputMask from '@components/InputMask';
import styles from '@styles/pages/signUpTelefone.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRGuest } from 'src/utils/withSSRGuest';
import * as yup from 'yup';
interface ISendCodeFormData {
  phone_number: string
}
export default function signUpTelefone() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const {sponsorship_code} = router.query

  const [countryCode, setCountryCode] = useState('+55')
  const [isLoading, setIsLoading] = useState(false)
  
  async function handleSubmit({phone_number}: ISendCodeFormData) {
    setIsLoading(true)

    const phoneNumberFormated = phone_number.replaceAll(/[^\w\s]/gi, '').replace(' ', '')
    
    try {
      const schema = yup.object().shape({
        phone_number: yup.string().trim()
        .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/g, 'Este telefone é inválido').required('Por favor, preencha o campo acima')
      })

      await schema.validate({
        phone_number
      }, {
        abortEarly: false
      })
      await api.post(`/users/sms/send-code`, {
        phone_number: `${countryCode}${phoneNumberFormated}`
      })
      
      router.push({
        pathname: `/signup/verify`,
        query: {
          phoneNumber: `${countryCode}${phoneNumberFormated}`,
          sponsorship_code,
        }
      })
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current.setErrors(errors)

        return;
      }
      formRef.current.setErrors({
        phone_number: 'Verifique se este telefone está mesmo correto'
      })
    }
    finally {
      setIsLoading(false)
    }

  }
  
  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef} className={styles.container}>
        <Header text="Cadastro" />

          <span>Informe seu número de telefone</span>

          <div className={styles.inputs}>
            <div>
              <h4>BR +55</h4>
              <hr /> 
              <InputMask
                mask="(99) 99999-9999"
                name="phone_number" 
                type="tel" 
                placeholder="Número de telefone" 
              />
            </div>
          </div>
          <Button isLoading={isLoading} >Enviar código</Button>
      </Form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})