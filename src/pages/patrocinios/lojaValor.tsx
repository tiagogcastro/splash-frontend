import styles from '@styles/pages/patrocinios/lojaValor.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'

export default function Home() {
  return (
    <div className={styles.container}>
        <Header text="Enviar patrocínio" returnPage="/"/>
        <div className={styles.content}>
            <div className={styles.innerContent}>
                <div className={styles.value}>
                    <span>Valor:</span>
                    <span>R$ 3,00</span>
                </div>
                <div className={styles.inputCheck}>
                    <span>Permitir saque do patrocínio</span>
                    <input type="checkbox" />
                </div>
            </div>
            
            <Button>Continuar</Button>
        </div>
    </div>
  )
}
