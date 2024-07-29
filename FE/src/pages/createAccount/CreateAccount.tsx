import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateAccount.css'; // CSS 파일을 임포트
import { createAccount } from './CreateAccountAction'; // 액션 파일 임포트

const CreateAccount: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const response = await createAccount(data);
            console.log(response); // 성공 시 처리
        } catch (error) {
            console.error('Failed to create account'); // 에러 메시지 수정
        }
    };

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern = /^[A-Za-z\d@$!%*#?&]{4,}$/; // 패턴 수정: 알파벳 대소문자, 숫자, 특수문자를 포함한 4자 이상

    return (
        <>
            <div>
                <h3>회원가입</h3>
            </div>
            <div className="create-account-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('userName', { required: true, minLength: 2, maxLength: 10 })}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                    />
                    {errors.userName && <p className="error">사용자 이름은 필수이며 2자 이상 10자 이하여야 합니다.</p>}

                    <input
                        {...register('email', { required: true, pattern: emailPattern })}
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    {errors.email && <p className="error">올바른 이메일 주소가 아닙니다.</p>}

                    <input
                        {...register('password', { required: true, minLength: 4, pattern: passwordPattern })}
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="error">비밀번호는 필수이며 4자 이상이어야 합니다.</p>}

                    <input
                        {...register('confirmpassword', {
                            required: true,
                            minLength: 4,
                            validate: (value) => value === watch('password') || "Passwords do not match"
                        })}
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                    />
                    {errors.confirmpassword && <p className="error">비밀번호가 일치하지 않습니다.</p>}

                    <button type="submit">계정 생성</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;
