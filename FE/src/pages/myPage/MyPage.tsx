//리렌더링을 막기위해 메모이제이션 시도 사용자 정보가 변경되지 않는 한 불필요한 재계산 방지.
//유즈 이펙트와 메모를 사용해서 로컬스토리지에 저장하고 가져오게함.
import React, {useEffect,useState,useMemo} from "react";
import Header from "../../components/Header";
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/authUtils'; // authUtils 파일에서 함수 가져오기


interface User{
    email: string;
    nickname?: string;
}

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        const userData = localStorage.getItem('user');
        if(userData)
        {
            setUser(JSON.parse(userData)); //json 유저데이터를 변환해서 가져오고 setUser셋팅.
        }
    },[]);
    //useMemo를 사용하여 사용자 정보를 메모이제이션합니다.
    const memoizedUser = useMemo(()=> user,[user]);

    return (
        <div className="mypage-container">
            <Header leftContent={"마이페이지"}/>
            <div className="profile-container">
                <div className="profile-image"></div>
                <div className="profile-info">
                    <p className="nickname">{memoizedUser?.nickname || memoizedUser?.email}</p>
                    <p className="edit-info">내 정보 수정</p>
                </div>
                <button className="move-button">수정</button>
            </div>
            <div className="ticket-container">
                <div>
                    <p>티켓</p>
                    <p>n장</p>
                </div>
            </div>
            <div className="section-container">
                <div className="section">
                    <p>1:1 문의</p>
                    <button className="section-button">수정</button>
                </div>
                <div className="section">
                    <p>공항 패션 히스토리</p>
                    <button className="section-button">수정</button>
                </div>
                <div className="section">
                    <p>버전</p>
                    <p> 0.0.1 </p>
                </div>
                <div className="logout-container">
                    <button className="logout-button" onClick={() => handleLogout(navigate)}>로그아웃</button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
