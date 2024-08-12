import pic from '../../../public/images/notFound.png'

import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.title}>Not Found 404</h1>
        <img src={pic} alt="" />
      </div>
    </section>
  );
};

