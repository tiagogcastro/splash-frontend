import utilsStyles from '@styles/utilStyles.module.scss'
import styles from '@styles/pages/patrocinar/index.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useEffect, useMemo, useState } from 'react'
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import Loading from '@components/Loading';
import { AiOutlineFrown } from 'react-icons/ai';

interface User {
	sponsored: {
		id: string;
		name: string;
		username: string;
		avatar_url: string;
	}
}

export default function Patrocinar() {
	const [usersSponsored, setUsersSponsored] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		api.get(`/sponsors/sponsored/${user.id}`).then(response => {
      setUsersSponsored(response.data)
      setLoading(false)
		});
	}, [user]);


  const checkedIfTheUserHasUsersSponsoredOrnot = useMemo(() => {
    if(loading === false && usersSponsored.length === 0) {
      return false
    }
    return true
  }, [usersSponsored, loading])


	return (
		<div className={styles.container}>
			<Header text="Patrocinar" />
			<div className={styles.content}>
				<div className={styles.innerContent}>
					<div className={styles.searchBar}>
						<input type="text" placeholder="Pesquisar" />
					</div>

					<ul className={styles.storeList}>
						{checkedIfTheUserHasUsersSponsoredOrnot ? usersSponsored.map(user => (
							<li className={styles.store} key={user.sponsored.id}>
								<div className={styles.first}>
									<img src={
                    user.sponsored.avatar_url ?
                    user.sponsored.avatar_url :
                    'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'
                  } />
									<div className={styles.text}>
										<h2>{user.sponsored.name}</h2>
										<span>{user.sponsored.username}</span>
									</div>
								</div>
								<div className={styles.second}>
									<Button url={`/patrocinar/valor?user_id=${user.sponsored.id}`}>Enviar patrocínio</Button>
								</div>
							</li>
						)):
            <div className={utilsStyles.noContent}>
              <AiOutlineFrown size={60} />
              <span>
                Oh! Não tem conteúdo
              </span>
            </div>
            }
            <div style={{marginTop: 180}}>
              {loading && <Loading size={30} />}
            </div>
					</ul>
				</div>

        {user?.role === 'shop' &&
          <div className={styles.buttonConfirmation}>
            <Button url="/patrocinar/valor">Criar código de patrocínio</Button>
          </div>
        }
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
