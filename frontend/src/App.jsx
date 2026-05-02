import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useApp } from "@/lib/store";

function Home() {
  const { user, setUser } = useApp();
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
      <p>user: {user ? `${user.name} (${user.id})` : "없음"}</p>
      {user ? (
        <button type="button" onClick={() => setUser(null)}>
          로그아웃
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setUser({ id: "demo-1", name: "데모 사용자" })}
        >
          데모 로그인
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
