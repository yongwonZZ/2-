import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import styles from '../../styles/editProfile/EditProfile.module.css'; // CSS 파일을 임포트
import { updateUserPassword } from '../../utils/userUtils/action';

const EditProfile: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [message, setMessage] = useState<string | null>(null); // 메시지 상태 추가

    const onSubmit = async (data: any) => {
        try {
            const { oldPassword, newPassword } = data;
            const response = await updateUserPassword(oldPassword, newPassword);
            setMessage(response.message); // 성공 시 메시지 설정
        } catch (error) {
            console.error('Failed to update password', error);
            setMessage('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.'); // 에러 메시지 설정
        }
    };

    const passwordPattern = /^[A-Za-z\d@$!%*#?&]{4,}$/; // 패턴 수정: 알파벳 대소문자, 숫자, 특수문자를 포함한 4자 이상

    return (
        <>
            <Header centerContent="내 정보 수정" />
            <div className={styles.editProfileContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('oldPassword', { required: true })}
                        type="password"
                        placeholder="현재 비밀번호"
                        autoComplete="current-password"
                    />
                    {errors.oldPassword && <p className={styles.error}>현재 비밀번호는 필수입니다.</p>}

                    <input
                        {...register('newPassword', { required: true, minLength: 4, pattern: passwordPattern })}
                        type="password"
                        placeholder="새 비밀번호"
                        autoComplete="new-password"
                    />
                    {errors.newPassword && <p className={styles.error}>비밀번호는 필수이며 4자 이상이어야 합니다.</p>}

                    <input
                        {...register('confirmNewPassword', {
                            required: true,
                            validate: (value) => value === watch('newPassword') || "Passwords do not match"
                        })}
                        type="password"
                        placeholder="새 비밀번호 확인"
                        autoComplete="new-password"
                    />
                    {errors.confirmNewPassword && <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>}

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>비밀번호 변경</button>
                    </div>
                </form>
                {message && <p className={styles.message}>{message}</p>} {/* 메시지 표시 */}
            </div>
        </>
    );
}

export default EditProfile;
