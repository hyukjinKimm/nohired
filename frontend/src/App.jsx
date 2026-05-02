import { useEffect } from "react";

export default function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetch(`${BACKEND_URL}/test`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
