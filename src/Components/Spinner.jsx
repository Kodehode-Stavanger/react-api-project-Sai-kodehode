// Spinner.js
import ReactLoading from "react-loading";

export default function Spinner({ type, color }) {
  return <ReactLoading type={type} color={color} height={150} width={150} />;
}
