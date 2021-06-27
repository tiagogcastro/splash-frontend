import Button from '@components/Button';
import Input from '@components/Input';
import styles from '@styles/pages/signup.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { withSSRGuest } from 'src/utils/withSSRGuest';
import * as yup from 'yup';
import getValidationErrors from '../utils/getValidationErrors';

export default function LoginNumber() {
  const [accepted, setAccepted] = useState(false)
  const [sponsorshipCode, setSponsorshipCode] = useState<string>(null)

  const formRef = useRef<FormHandles>(null)
  const router = useRouter();
  const paramsSponsorshipCode = router.query.sponsorship_code;

  interface ISignUpFormData {
    sponsorship_code: string
  }
  const handleSubmit = useCallback(
    async ({
      sponsorship_code
    }: ISignUpFormData) => {
      try {
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          sponsorship_code: yup.string().trim()
          .matches(/^[A-Z0-9]+$/, 'Este código de patrocínio é inválido').min(6, 'O mínimo é de 6 caracteres').max(6, 'O máximo é de 6 caracteres'),
        });

        await schema.validate({
          sponsorship_code
        }, {
          abortEarly: false,
        });

        if(accepted)
          router.push(`/signup/phone?sponsorship_code=${sponsorshipCode || sponsorship_code}`)

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current.setErrors(errors)

          return;
        }
      }
    },
    [accepted],
  )
  useEffect(() => {
    if(typeof paramsSponsorshipCode === 'string') {
      setSponsorshipCode(paramsSponsorshipCode);
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span>
            <strong>Lavimco</strong>
            <br/>
            Faça login ou crie uma conta para iniciar
          </span>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="sponsorship_code"
              defaultValue={paramsSponsorshipCode}
              placeholder="Digite seu codigo de patrocinio"
            />

            <div className={styles.wrapper}>
              <Button>{accepted ? 'Continue com WhatsApp': 'Aceite os termos para continuar'}</Button>
            </div>

            <div className={styles.terms}>
              <input checked={accepted} type="checkbox" onChange={(e) => setAccepted(!accepted)} />
              <span>Eu concordo com os <Link href="/termos">Termos e condições</Link></span>
            </div>

          </Form>


      </div>



      <div className={styles.links}>
        <span>Já tem uma conta?</span>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
      <footer className={styles.footer}>
        <strong>Lavimco Tecnologia Ltda</strong>
        <p>
          Rua Sader Macul, nº 96, <strong>São Paulo/SP</strong> - CEP: 04543-907 | CNPJ: 35.576.012/0001-43
        </p>


      </footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
