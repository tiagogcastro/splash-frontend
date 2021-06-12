import styles from '@styles/pages/patrocinios/store.module.scss'
import Header from '@components/Header'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import { format, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function Patrocinios({ sender_id }) {
  const router = useRouter();
  const query = router.query;
  const name = query.name as string;

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    api.get(`/notifications/sponsorships-history/${sender_id}`).then(response => {
        let responseNotifications = response.data
        
        responseNotifications = responseNotifications.map(notification => {
            const {content} = notification
            const newContent = JSON.parse(content.replace("/", ""))

            const parsedDate = formatDistance(new Date(notification.created_at), new Date(), { locale: ptBR })

            return {...notification, content: newContent, created_at: parsedDate}
        })

        setNotifications(responseNotifications)
    })
  }, [])

  return (
    <div className={styles.container}>
        <Header text={name} />
        <div className={styles.content}>
            <ul className={styles.sponsorList}>
                { notifications.map(notification => (
                    <li className={styles.store}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>{notification.content.subject}</h2>
                            <span>{notification.created_at}</span>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { sender_id } = query

    return {
        props: {
            sender_id
        }
    }
}