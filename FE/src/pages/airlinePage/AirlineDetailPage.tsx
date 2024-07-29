import { useParams, useNavigate } from "react-router-dom";
import { useFetchAirlineData } from "../../hooks/useFetchAirlineData";
import styles from "./AirlineDetailPage.module.css";
import stylesEx from "./airlineSearchComponents/AirlineSearchResultCard.module.css";
import Header from "../../components/Header";
import { formatTime } from "../../utils/formatTime";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
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

  const handleRegisterBoardingPass = () => {
    // detailData의 flightId, scheduleDateTime 정보를
    // 백엔드 api post 요청을 보내 추가한다.(비동기 처리)

    // 그 후 boardingPass로 페이지 라우팅
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
        rightContent={<IoMdShare className={styles["icon-share"]} />}
      />
      <div className={styles.card}>
        <div className={styles.section}>
          <span>{detailData?.airline}</span>
          <span>{detailData?.flightId}</span>
        </div>
        <div className={styles.section}>
          <span>운항현황</span>
          <span className={stylesEx["section-blue"]}>{detailData?.remark}</span>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.section}>
          <span>{detailData?.airport}</span>
          <span>{detailData?.airportCode}</span>
        </div>
        <IoIosAirplane className={styles["icon-departure"]} />
        <div className={styles.section}>
          <span>인천(서울)</span>
          <span>ICN</span>
        </div>
      </div>
      <div className={styles.card}>
        <span>터미널</span>
        <span>{detailData?.terminalid}</span>
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
          <span>도착예정시간</span>
          <span>도착변경시간</span>
        </div>
        <div className={styles.section}>
          <span className={stylesEx["section-strikethrough"]}>
            {formatTime(detailData!.scheduleDateTime)}
          </span>
          <span>{formatTime(detailData!.estimatedDateTime)}</span>
        </div>
      </div>
      <button className={styles.btn} onClick={handleRegisterBoardingPass}>
        내 항공편 등록하기
      </button>
    </div>
  );
}

export default AirlineDetailPage;
