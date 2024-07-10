"use client";

import { useRef, useState } from "react";
import { Button, Input } from "../../components";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function () {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setError(null);
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message);
        }
        localStorage.setItem("user-id", result.user.id);
        localStorage.setItem("user-info", JSON.stringify(result.user));
        setIsLoading(true);
        console.log(`/${result.user.id}`);
        return router.push(`/${result.user.id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message || "something went wrong");
        setIsLoading(true);
      });
  };

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className={styles.login_page}>
      <Input
        placeholder="enter username"
        value={username}
        onChange={handleOnChange}
      />
      {error && <div>{error}</div>}
      <Button onClick={handleLogin} disabled={isLoading}>
        Login
      </Button>
    </div>
  );
}
