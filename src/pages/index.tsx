import Loading from '@components/Loading';
import Menu from '@components/Menu';
import styles from '@styles/pages/Home.module.scss';
import utilsStyles from '@styles/utilStyles.module.scss';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineFrown } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';
import Link from 'next/link';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';
import { formatPrice } from 'src/utils/formatPrice';
import { withSSRAuth } from 'src/utils/withSSRAuth';

interface IUserBalance {
  id: string;
  total_balance: number;
  available_for_withdraw: number;
}

interface INotification {
  id: string
  user_id: string
  content: string
  user: {
    username: string
    avatar_url?: string
    name?: string
  }
  created_at: string
}
export default function Home(): JSX.Element {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [userBalance, setUserBalance] = useState<IUserBalance>(
    {} as IUserBalance,
  );

  useEffect(() => {
    api.get('/notifications/sponsorships').then(response => {
      let responseNotifications: INotification[] = response.data;

      setLoading(false)

      responseNotifications = responseNotifications.map(notification => {
        const parsedDate = formatDistance(
          new Date(notification.created_at),
          new Date(),
          {
            locale: ptBR,
          },
        );

        return { ...notification, created_at: parsedDate };
      });

      setNotifications(responseNotifications);
    });

    api.get('/users/balance-amount').then(response => {
      setUserBalance(response.data);
    });
  }, []);

  const formatedTotalbalance = useMemo(
    () => formatPrice(userBalance.total_balance || 0),
    [userBalance],
  );
  const formatedAvailableForWithdraw = useMemo(
    () => formatPrice(userBalance.available_for_withdraw || 0),
    [userBalance],
  );
  const handleSignOut = useCallback(
    () => {
      signOut();
      router.push('/login');
    },
    [router, signOut],
  )

  const checkedIfTheUserHasNotificationOrnot = useMemo(() => {
    if(loading === false && notifications.length === 0) {
      return false
    }
    return true
  }, [notifications, loading])

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleSignOut}
      >
        <ImExit size={20} color="#4b4b5c" />
      </button>

      <button
        className={styles.head}
        onClick={() => router.push('/saldo')}
      >
        <h1>{formatedTotalbalance}</h1>
        <span>{formatedAvailableForWithdraw} disponível para saque</span>
      </button>
      <div className={styles.content}>
        <ul className={styles.userList}>
          {loading &&
            <Loading size={30} />
          }

          {checkedIfTheUserHasNotificationOrnot ? notifications.map(notification => (
            <Link
              key={notification.id}
              href={`/patrocinios/${notification.user.username}?user_id=${notification.user_id}`}
            >
              <li className={styles.user}>
                <div className={styles.first}>
                <Link href={`/${notification.user.username}`}>
                  <img
                    src={
                      notification.user.avatar_url ?
                      notification.user.avatar_url :
                      'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'
                    }
                    alt={notification.user.username}
                    className={styles.img}
                  />
                </Link>

                  <div className={styles.text}>
                  <Link href={`/${notification.user.username}`} >
                    <h2>
                      {notification.user.username === user.username
                        ? 'Eu'
                        :  notification.user.name || notification.user.username }
                    </h2>
                  </Link>
                    <span>{notification.content}</span>
                  </div>
                </div>
                <div className={styles.second}>
                  <span>{notification.created_at}</span>
                  <FiChevronRight size={15} color="#6d6d7e" />
                </div>
              </li>
            </Link>
          )) :
          <div className={utilsStyles.noContent}>
            <AiOutlineFrown size={60} />
            <span>
              Oh! Não tem conteúdo
            </span>
            </div>
            }
        </ul>
      </div>
      <Menu page="sponsor" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
