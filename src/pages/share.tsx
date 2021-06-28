import Header from '@components/Header';
import Loading from '@components/Loading';
import Menu from '@components/Menu';
import styles from '@styles/pages/share.module.scss';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useMemo, useState } from 'react';
import { useSponsorship } from 'src/hooks/useSponsorship';
import { formatPrice } from 'src/utils/formatPrice';
import { withSSRAuth } from 'src/utils/withSSRAuth';


export default function Share({ user }) {
  const { sponsorship } = useSponsorship();

  const checkedIfTheSponsorshipObjectIsEmpty = useMemo(() => {
    if(Object.keys(sponsorship).length === 0)
      return true

    return false
  }, [sponsorship])

  return (
    <>
      <div className={styles.container}>

        <Header text={user.name} />
        <div className={styles.content}>

          {
            checkedIfTheSponsorshipObjectIsEmpty
            ?
              <Loading size={30} />
            :
            <>
              <div className={styles.img}>
                <img src={`https://api.lavimco.com/users/qrcode?sponsorship_code=${sponsorship.sponsorship_code}`} alt="QRCode" />
              </div>

              <div className={styles.text}>
                <h2>{sponsorship.sponsorship_code}</h2>
                <span>
                  {sponsorship.allow_withdrawal
                  ? 'Valor permitido para saque'
                  : 'Valor não permitido para saque'}
                </span>
                <span>Patrocínio de {formatPrice(sponsorship.amount)}</span>
                <Link href="/login">
                  lavimco.com
                </Link>
              </div>
            </>
          }
          </div>
          <Menu page="newSponsor" />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const user = JSON.parse(parseCookies(ctx)["%40Lavimco%3Auser"])

  return {
    props: {
      user
    }
  }
})
