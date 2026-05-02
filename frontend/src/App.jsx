import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`https://apidev.nohired.com/test`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
