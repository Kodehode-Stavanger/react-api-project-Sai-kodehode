import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
export default function NotFoundPage({ msg }) {
  const handleLinkClick = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundHeading}>{msg}</h1>
      <Link className={styles.homeLink} to="/search" onClick={handleLinkClick}>
        Go to Home
      </Link>
    </div>
  );
}
