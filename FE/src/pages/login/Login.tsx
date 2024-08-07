import React, { useState } from "react";
import styles from "../../styles/login/Login.module.css";
import { useNavigate } from "react-router-dom";
import { LoginAction, LoginResponse } from "./LoginAction";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Header from "../../components/Header";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const data: LoginResponse = await LoginAction(email, password);
      console.log("Login response data:", data);

      if (data.message && data.message.includes("환영합니다")) {
        console.log("로그인에 성공하셨습니다");
        localStorage.setItem("token", data.token); // 토큰 저장
        localStorage.setItem("user", JSON.stringify(data.user)); // 유저 정보 저장

        // 사용자별 티켓 정보 로드
        const userTickets = localStorage.getItem(`tickets_${data.user.email}`);
        if (userTickets) {
          localStorage.setItem("tickets", userTickets);
        } else {
          localStorage.removeItem("tickets");
        }

        navigate("../myPage");
      } else {
        console.error("Login failed response:", data);
        setError("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error: any) {
      setError(error.message || "로그인 중 오류가 발생했습니다.");
      console.error("Login error:", error);
      console.log("로그인에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpinnerTest = () => {
    setIsSpinnerActive(true);
    setTimeout(() => {
      setIsSpinnerActive(false);
    }, 5000); // 5초 동안 스피너 작동
  };

  return (
    <div>
      <Header leftContent="로그인" />
      <div className={styles["login-container"]}>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles["login-form"]} onSubmit={handleLogin}>
          <input
            className={styles["email-input"]}
            id="email-input"
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            className={styles["password-input"]}
            id="password-input"
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className={styles["button-container"]}>
            <button className={styles["login-button"]} type="submit">
              로그인
            </button>
            <button
              className={styles["signup-button"]}
              type="button"
              onClick={() => navigate("../createAccount")}
            >
              회원가입
            </button>
          </div>
          <div>
            {" "}
            {/*텍스트로 아래 간단하게 유지*/}
            <button> 아이디 찾기 </button>
            <p> | </p>
            <button> 비밀번호 찾기</button>
          </div>
        </form>
      </div>
      {isLoading && <LoadingSpinner message="로그인 중입니다..." />}
      {isSpinnerActive && <LoadingSpinner message="테스트 중입니다..." />}
    </div>
  );
};

export default Login;
