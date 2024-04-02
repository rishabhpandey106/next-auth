import styles from './id.module.css'

export default function ProfileIdpage({params}:any) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.loading}>Profile Information</h1>
        <form className={styles.form}>
          <button className={styles.button}>{params.id}</button>
        </form>
      </div>
    </div>
  )
}
