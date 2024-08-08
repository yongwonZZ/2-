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
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpinnerActive, setIsSpinnerActive] = useState<boolean>(false);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);

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
        setLoginAttempts((prev) => prev + 1);
      }
    } catch (error: any) {
      setError(error.message || "로그인 중 오류가 발생했습니다.");
      console.error("Login error:", error);
      console.log("로그인에 실패했습니다");
      setLoginAttempts((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = () => {
    if (email) {
      setShowPasswordField(true);
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
            <div className={styles["email-container"]}>
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
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEmailSubmit();
                    }
                  }}
              />
              {!showPasswordField && (
                  <button
                      type="button"
                      className={styles["email-submit"]}
                      onClick={handleEmailSubmit}
                  >
                    &gt;
                  </button>
              )}
            </div>
            {showPasswordField && (
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
            )}
            <div className={styles["button-container"]}>
              {showPasswordField && (
                  <button className={styles.button} type="submit">
                    로그인
                  </button>
              )}
            </div>
            <div className={styles["link-container"]}>
              <p className={styles["link-text"]}>아직 회원이 아니신가요?</p>
              <button
                  className={`${styles["link-button"]} ${styles["bold-text"]}`}
                  type="button"
                  onClick={() => navigate("../createAccount")}
              >
                회원가입
              </button>
            </div>
            <div className={styles["link-container"]}>
              {loginAttempts >= 3 && (
                  <>
                    <p className={styles["link-text"]}>계정을 잃어 버리셨나요?</p>
                    <button
                        className={`${styles["link-button"]} ${styles["bold-text"]}`}
                        type="button"
                        onClick={() => navigate("../findId")}
                    >
                      계정 찾기
                    </button>
                    <span className={styles["separator"]}> | </span>
                    <button
                        className={styles["link-button"]}
                        type="button"
                        onClick={() => navigate("../findPassword")}
                    >
                      비밀번호 찾기
                    </button>
                  </>
              )}
            </div>
          </form>
        </div>
        {isLoading && <LoadingSpinner message="로그인 중입니다..." />}
        {isSpinnerActive && <LoadingSpinner message="테스트 중입니다..." />}
      </div>
  );
};

export default Login;
