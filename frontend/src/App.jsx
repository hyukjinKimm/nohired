import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/test`)
      .then((res) => {
        console.log("GET /test", res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .post(`${BACKEND_URL}/test`, { ping: "from-frontend" })
      .then((res) => {
        console.log("POST /test", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [BACKEND_URL]);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
