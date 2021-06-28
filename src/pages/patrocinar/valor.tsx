import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import styles from '@styles/pages/patrocinar/valor.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import Switch from 'react-switch';
import { useAuth } from 'src/hooks/useAuth';
import { useSponsorship } from 'src/hooks/useSponsorship';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import * as yup from 'yup';

interface ISponsorshipFormData {
  amount: number
}
export default function PatrocinarValor() {
  const { user } = useAuth()

  const route = useRouter();

  const [value, setValue] = useState(1);
  const formRef = useRef<FormHandles>(null);
  const { setSponsorship } = useSponsorship();

  const [allowWithdrawalBalance, setAllowWithdrawalBalance] = useState(false);
  const [loading, setLoading] = useState(false);

  function setInputValue(e) {
    let v = Number(e.target.value);
    if (v > 0 || v) {
      if (v > 500) {
        setValue(value)
      } else {
        setValue(v)
      }
    } else {
      setValue(0)
    }
  }
  const handleSubmit = useCallback(
    async ({ amount }: ISponsorshipFormData) => {
      try {
        setLoading(true)

        const schema = yup.object().shape({
          amount: yup.number()
          .required("Insira um valor")
          .min(1, 'O valor mínimo é R$1,00')
          .max(500, 'O valor máximo é R$500,00'),
          user_recipient_id: yup.string().uuid('O destinatário é inválido'),
        });

        const data = {
          amount: Number(amount),
          user_recipient_id: route.query.user_id
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        if(!data.user_recipient_id) {
          const response = await api.post('/sponsorships/sponsorship-code', {
            allow_withdrawal_balance: allowWithdrawalBalance,
            amount
          });

          setSponsorship(response.data)

          route.push(`/share`);


          return;
        }

        await api.post('/sponsorships', {
          user_recipient_id: route.query.user_id,
          amount,
          ...(user?.role === 'shop' ?
          {
            allow_withdrawal_balance: allowWithdrawalBalance,
          } : {})
        });

        route.push('/');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError('amount', 'Não foi possível enviar um patrocínio')

      } finally {
        setLoading(false)
      }
    },
    [allowWithdrawalBalance, route, api],
  )
  const showSwitchIfTheUserIsShop = useMemo(() => {
    if(user?.role === 'shop') {
      return (
        <>
          <span>
            Permitir saque do patrocínio
          </span>
          <Switch
            onChange={() => setAllowWithdrawalBalance(!allowWithdrawalBalance)}
            checked={allowWithdrawalBalance}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor={'#80da6a'}
            offColor={'#959899'}
          />
        </>
      )
    }
    return null
  }, [allowWithdrawalBalance])

  return (
    <div className={styles.container}>
      <Header text="Enviar patrocínio" />
      <Form ref={formRef} className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.innerContent}>
          <div className={styles.value}>
            <span>R$</span>
            <div className={styles.input}>
              <Input
                defaultValue={value}
                name="amount"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className={styles.allowWithdrawalBalance}>
          {showSwitchIfTheUserIsShop}
        </div>
        <div className={styles.buttonConfirmation}>
          <Button type="submit" isLoading={loading}>Enviar</Button>
        </div>
      </Form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
