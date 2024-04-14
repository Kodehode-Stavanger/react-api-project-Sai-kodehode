import { Link } from "react-router-dom";
export default function NotFoundPage({ msg }) {
  return (
    <div>
      <h1>{msg}</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
