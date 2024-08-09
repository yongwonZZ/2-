import { useParams, useNavigate } from "react-router-dom";
import { useFetchAirlineData } from "../../hooks/useFetchAirlineData";
import {
  terminal2,
  terminal1LogosUrl,
  terminal2LogosUrl,
} from "./airlineTerminals";
import styles from "../../styles/airlinePage/AirlineDetailPage.module.css";
import stylesEx from "../../styles/airlinePage/airlineSerchComponents/AirlineSearchResultCard.module.css";
import Header from "../../components/Header";
import { formatTime } from "../../utils/formatTime";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

function AirlineDetailPage() {
  const navigate = useNavigate();

  /** flightId 소문자 형식 */
  let { id } = useParams();
  /** flightId 대문자 형식으로 */
  id = id?.toUpperCase();

  /** data fetching */
  const { data } = useFetchAirlineData({});

  /** 자료에서 flightId에 해당하는 특정 항공편 하나 찾기 */
  const detailData = data?.find(({ flightId }) => flightId === id);

  const handleRegister = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.email) {
      const storedTickets = JSON.parse(
        localStorage.getItem(`tickets_${user.email}`) || "[]"
      );
      const updatedTickets = [...storedTickets, detailData];
      localStorage.setItem(
        `tickets_${user.email}`,
        JSON.stringify(updatedTickets)
      );
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    }

    navigate("/boardingPass");
  };

  return (
    <div className={styles.wrapper}>
      <Header
        leftContent={
          <FaChevronLeft
            className={styles["icon-prev"]}
            onClick={() => navigate(-1)}
          />
        }
        centerContent={detailData?.flightId}
      />
      <div className={styles.card}>
        <div className={styles.section}>
          <img
            src={
              terminal2.includes(detailData!.airline)
                ? terminal2LogosUrl[detailData!.airline]
                : terminal1LogosUrl[detailData!.airline]
            }
            alt="항공사로고"
          />
          <span>{detailData?.airline}</span>
          <span>{detailData?.flightId}</span>
        </div>
        <div className={styles.section}>
          <span>운항현황</span>
          <span
            className={
              detailData?.remark === "결항"
                ? stylesEx["section-cancelled"]
                : detailData?.remark === "도착" || detailData?.remark === "출발"
                ? stylesEx["section-blue"]
                : stylesEx["section-delayed"]
            }
          >
            {detailData?.remark}
          </span>
        </div>
      </div>
      <div
        className={`${styles.card} ${!detailData?.carousel && styles.reverse}`}
      >
        <div className={styles.section}>
          <span>{detailData?.airport}</span>
          <span style={{ fontSize: 36, fontWeight: "bold" }}>
            {detailData?.airportCode}
          </span>
        </div>
        <IoIosAirplane
          style={{ fontSize: 36 }}
          className={styles["icon-departure"]}
        />
        <div className={styles.section}>
          <span>인천(서울)</span>
          <span style={{ fontSize: 36, fontWeight: "bold" }}>ICN</span>
        </div>
      </div>
      <div className={styles.card}>
        <span>터미널</span>
        <span>{`터미널 ${terminal2.includes(detailData!.airline) ? 2 : 1} [${
          detailData?.gatenumber
        }]`}</span>
      </div>
      <div className={styles.card}>
        <span>{detailData?.chkinrange ? "체크인카운터" : "수하물수취대"}</span>
        <span>
          {detailData?.chkinrange
            ? detailData?.chkinrange
            : detailData?.carousel}
        </span>
      </div>
      <div className={styles.card}>
        <span>{detailData?.chkinrange ? "탑승게이트" : "출구"}</span>
        <span>
          {detailData?.chkinrange
            ? detailData?.gatenumber
            : detailData?.exitnumber}
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.section}>
          <span>
            {!detailData?.chkinrange ? "도착예정시간" : "출발예정시간"}
          </span>
          <span>
            {!detailData?.chkinrange ? "도착변경시간" : "출발변경시간"}
          </span>
        </div>
        <div className={styles.section}>
          <span className={stylesEx["section-strikethrough"]}>
            {detailData?.scheduleDateTime !== detailData?.estimatedDateTime &&
              formatTime(detailData!.scheduleDateTime)}
          </span>
          <span className={stylesEx["section-blue"]}>
            {formatTime(detailData!.estimatedDateTime)}
          </span>
        </div>
      </div>
      <button className={styles.btn} onClick={handleRegister}>
        내 항공편 등록하기
      </button>
    </div>
  );
}

export default AirlineDetailPage;
