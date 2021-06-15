import styles from '@styles/pages/patrocinar/index.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useEffect, useState } from 'react'
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';

interface User {
	sponsored: {
		id: string;
		name: string;
		username: string;
		avatar_url: string;
	}
}

export default function Patrocinar() {
	const [users, setUsers] = useState<User[]>();
	const { user } = useAuth();

	useEffect(() => {
		api.get(`/sponsors/sponsored/${user.id}`).then(response => {
			setUsers(response.data);
			console.log(response.data);
		});
	}, [user]);

	return (
		<div className={styles.container}>
			<Header text="Patrocinar" />
			<div className={styles.content}>
				<div className={styles.innerContent}>
					<div className={styles.searchBar}>
						<input type="text" placeholder="Pesquisar" />
					</div>
					{!users ? (
						<p>Você não patrocinou ninguém ainda.</p>
					) :
					<ul className={styles.storeList}>
						{users.map(user => (
							<li className={styles.store} key={user.sponsored.id}>
								<div className={styles.first}>
									<img src={user.sponsored.avatar_url}></img>
									<div className={styles.text}>
										<h2>{user.sponsored.name}</h2>
										<span>{user.sponsored.username}</span>
									</div>
								</div>
								<div className={styles.second}>
									<Button url={`/patrocinar/valor?user_id=${user.sponsored.id}`}>Enviar patrocínio</Button>
								</div>
							</li>
						))}
					</ul>
					}
				</div>

				<div className={styles.buttonConfirmation}>
					<Button url="/patrocinar/valor">Continuar</Button>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})