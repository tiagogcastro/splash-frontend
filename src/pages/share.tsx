import Header from '@components/Header';
import Link from 'next/link'

import styles from '@styles/pages/share.module.scss'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from 'src/services/api';
import Menu from '@components/Menu';
import { useAuth } from 'src/hooks/useAuth';

interface Sponsorship {
  amount: number;
  allow_withdrawal: boolean;
  sponsorship_code: string;
}
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';

export default function Share() {
  const { user } = useAuth();
  const [sponsorship, setSponsorship] = useState<Sponsorship>();
  console.log(sponsorship);

  const router = useRouter()
  const value = router.query.value;

  useEffect(() => {
    api.post('/sponsorships/sponsorship-code', {
      allow_withdrawal_balance: user.role === 'shop',
      amount: value
    }).then(response => {
      setSponsorship(response.data);
    });
  }, [value]);

  return (
    <>
      <div className={styles.container}>
        {!sponsorship || !user.name ? (<p>Carregando...</p>) : (
        <>
        <Header text={user.name} />
        <div className={styles.content}>
          <div className={styles.img}>
            <img src="/qrcode.png" alt="" />
          </div>

          <div className={styles.text}>
            <h2>{sponsorship.sponsorship_code}</h2>
            <span>
              {sponsorship.allow_withdrawal 
              ? 'Valor permitido para saque' 
              : 'Valor não permitido para saque'}
            </span>
            <span>Patrocínio de {sponsorship.amount}</span>
            <Link href="/">
              <a>lavimco.com</a>
            </Link>
          </div>
        </div>
        </>
        )}
        <Menu page="newSponsor" />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})