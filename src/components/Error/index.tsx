import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { IoMdArrowBack } from 'react-icons/io';

export default function Edit() {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Error <strong>404</strong></h1>
          <p>Página de usuário não encontrada.</p>
          <div className={styles.back}>
            <button type="button" onClick={() => router.back()}>
              <IoMdArrowBack size={20} />
              <p>Voltar</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
