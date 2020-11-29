import Head from 'next/head'
import Fountain from '../components/Fountain'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IBALIE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>IBALINE</h1>

        <p className={styles.description}>
          <code className={styles.code}>Muggles Code</code>
        </p>
        <Fountain />
      </main>

      <footer className={styles.footer}>
        <a href='https://github.com/MrHanson' target='_blank' rel='noopener noreferrer'>
          Powered by MrHanson
        </a>
      </footer>
    </div>
  )
}
