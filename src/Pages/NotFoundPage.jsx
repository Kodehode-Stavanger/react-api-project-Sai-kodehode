import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
export default function NotFoundPage({ msg }) {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundHeading}>{msg}</h1>
      <Link className={styles.homeLink} to="/search">
        Go to Home
      </Link>
    </div>
  );
}
