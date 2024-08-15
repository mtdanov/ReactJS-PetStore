import styles from "./About.module.css";

import dog_image from "../../../public/images/dog-banner.png";

export default function About() {
  return (
    <div className={styles.about} >
      <div className={styles.aboutContainer}>
        <img className={styles.dogImg} src={dog_image} alt="" />
        <p className={styles.aboutText}>
          Във ветеринарната амбулатория "ИгмаВет" нашата мисия е да осигурим най-добрата медицинска грижа за вашите домашни любимци.
          С дългогодишен опит и професионализъм, нашият екип от ветеринарни лекари и асистенти
          е посветен на здравето и благополучието на вашите животни.
        </p>
      </div>
    </div >
  );
}
