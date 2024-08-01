import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaFilter } from "react-icons/fa";
import Header from "../../components/Header";
import "./styles/ConjestionPage.css";
import { fetchCongestionData } from "./getInfoData/getCongestionData";
import { Link } from "react-router-dom";

interface Congestion {
  adate: string;
  atime: string;
  t1sum1: string;
  t1sum2: string;
  t1sum3: string;
  t1sum4: string;
  t1sum5: string;
  t1sum6: string;
  t1sum7: string;
  t1sum8: string;
  t1sumset1: string;
  t1sumset2: string;
  t2sum1: string;
  t2sum2: string;
  t2sum3: string;
  t2sum4: string;
  t2sumset1: string;
  t2sumset2: string;
}

interface TerminalCongestion {
  adate: string;
  atime: string;
  sum1: string;
  sum2: string;
  sum3: string;
  sum4: string;
  sum5: string;
  sum6: string;
  sum7: string;
  sum8: string;
  sumset1: string;
  sumset2: string;
}

const CongestionPage: React.FC = () => {
  const [congestion, setCongestion] = useState<Congestion[]>([]);
  const [t1Congestion, setT1Congestion] = useState<TerminalCongestion[]>([]);
  const [t2Congestion, setT2Congestion] = useState<TerminalCongestion[]>([]);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [terminal, setTerminal] = useState<string>("T1");
  const [into, setInto] = useState<string>("out");
  const [day, setDay] = useState<string>("오늘");

  /** day state에 따라 api를 재요청 */
  const type = `&selectdate=${day === "오늘" ? "0" : "1"}&type=json`;

  /** 현재 시간을 데이터에 맞게 반환하는 함수 */
  const getCurrentTimeSlot = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const nextHour = (date.getHours() + 1).toString().padStart(2, "0");
    return `${hours}_${nextHour}`;
  };
  const currentTimeSlot = getCurrentTimeSlot();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conges = await fetchCongestionData(type);
        setCongestion(conges.response.body.items);
      } catch (error) {
        console.error("Failed to fetch congestion data", error);
      }
    };
    fetchData();
  }, [type]);

  /** T1의 데이터와 T2의 데이터로 분리 */
  useEffect(() => {
    const t1Data = congestion.map((item) => ({
      adate: item.adate,
      atime: item.atime,
      sum1: Math.floor(parseFloat(item.t1sum1)).toString(), // T1 입국장 (A,B)
      sum2: Math.floor(parseFloat(item.t1sum2)).toString(), // T1 입국장 (E, F)
      sum3: Math.floor(parseFloat(item.t1sum3)).toString(), // T1 입국장 (C)
      sum4: Math.floor(parseFloat(item.t1sum4)).toString(), // T1 입국장 (D)
      sum5: Math.floor(parseFloat(item.t1sum5)).toString(), // T1 출국장 (1, 2)
      sum6: Math.floor(parseFloat(item.t1sum6)).toString(), // T1 출국장 (3)
      sum7: Math.floor(parseFloat(item.t1sum7)).toString(), // T1 출국장 (4)
      sum8: Math.floor(parseFloat(item.t1sum8)).toString(), // T1 출국장 (5, 6)
      sumset1: Math.floor(parseFloat(item.t1sumset1)).toString(), // T1 입국장 합계
      sumset2: Math.floor(parseFloat(item.t1sumset2)).toString(), // T1 출국장 합계
    }));

    const t2Data = congestion.map((item) => ({
      adate: item.adate,
      atime: item.atime,
      sum1: Math.floor(parseFloat(item.t2sum1)).toString(), // T2 입국장 (A)
      sum2: Math.floor(parseFloat(item.t2sum2)).toString(), // T2 입국장 (B)
      sum3: "",
      sum4: "",
      sum5: Math.floor(parseFloat(item.t2sum3)).toString(), // T2 출국장 (1)
      sum6: Math.floor(parseFloat(item.t2sum4)).toString(), // T2 출국장 (2)
      sum7: "",
      sum8: "",
      sumset1: Math.floor(parseFloat(item.t2sumset1)).toString(), // T2 입국장 합계
      sumset2: Math.floor(parseFloat(item.t2sumset2)).toString(), // T2 출국장 합계
    }));

    setT1Congestion(t1Data);
    setT2Congestion(t2Data);
  }, [congestion]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <Header
        leftContent={
          <div className="conjestion-header">
            <Link to={"/"}>
              <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
            </Link>
            {day} {into === "in" ? "입국" : "출국"}장 {terminal}
          </div>
        }
        rightContent={<FaFilter onClick={handleToggle} />}
      />
      <div className="container conjestion">
        {isToggled && (
          <div className="option-controller">
            <div className="option-list">
              <button
                className={`option-btn ${
                  terminal === "T1" ? "btn-active" : ""
                }`}
                onClick={() => setTerminal("T1")}
              >
                터미널 1
              </button>
              <button
                className={`option-btn ${
                  terminal === "T2" ? "btn-active" : ""
                }`}
                onClick={() => setTerminal("T2")}
              >
                터미널 2
              </button>
            </div>
            <div className="option-list">
              <button
                className={`option-btn ${into === "out" ? "btn-active" : ""}`}
                onClick={() => setInto("out")}
              >
                출국장
              </button>
              <button
                className={`option-btn ${into === "in" ? "btn-active" : ""}`}
                onClick={() => setInto("in")}
              >
                입국장
              </button>
            </div>
            <div className="option-list">
              <button
                className={`option-btn ${day === "오늘" ? "btn-active" : ""}`}
                onClick={() => setDay("오늘")}
              >
                오늘
              </button>
              <button
                className={`option-btn ${day === "내일" ? "btn-active" : ""}`}
                onClick={() => setDay("내일")}
              >
                내일
              </button>
            </div>
            <button className="select-btn" onClick={() => setIsToggled(false)}>
              확인
            </button>
          </div>
        )}

        <div className="list-container">
          <table className="data-table">
            <thead className="data-head">
              <tr>
                <th>시간</th>
                {into === "out" ? (
                  <>
                    {terminal === "T1" ? (
                      <>
                        <th>출국장 1,2</th>
                        <th>출국장 3</th>
                        <th>출국장 4</th>
                        <th>출국장 5,6</th>
                      </>
                    ) : (
                      <>
                        <th>출국장 1</th>
                        <th>출국장 2</th>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {terminal === "T1" ? (
                      <>
                        <th>입국장 A, B</th>
                        <th>입국장 C</th>
                        <th>입국장 D</th>
                        <th>입국장 E, F</th>
                      </>
                    ) : (
                      <>
                        <th>입국장 A</th>
                        <th>입국장 B</th>
                      </>
                    )}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {(terminal === "T1" ? t1Congestion : t2Congestion)
                .sort((a, b) => a.atime.localeCompare(b.atime))
                .map((item, index) => (
                  <tr
                    key={index}
                    className={`list-item ${
                      item.atime === currentTimeSlot ? "current-time" : ""
                    }`}
                  >
                    <td className="data-time">
                      {item?.atime.split("_")[0]}
                      <span className="data-time-set">시</span>
                    </td>
                    {into === "out" ? (
                      <>
                        {item.sum1 && <td>{item?.sum1}명</td>}
                        {item.sum3 && <td>{item?.sum3}명</td>}
                        {item.sum4 && <td>{item?.sum4}명</td>}
                        {item.sum2 && <td>{item?.sum2}명</td>}
                      </>
                    ) : (
                      <>
                        {item.sum5 && <td>{item?.sum5}명</td>}
                        {item.sum6 && <td>{item?.sum6}명</td>}
                        {item.sum7 && <td>{item?.sum7}명</td>}
                        {item.sum8 && <td>{item?.sum8}명</td>}
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CongestionPage;
