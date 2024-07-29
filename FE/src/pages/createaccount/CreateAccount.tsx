import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateAccount.css'; // CSS 파일을 임포트

const CreateAccount: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    return (
        <>
            <div>
                <h3>회원가입</h3>
            </div>
            <div className="create-account-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('userName', {required: true, minLength: 2, maxLength: 10})}
                        name="userName"
                        type="text"
                        placeholder="Username"
                    />
                    {errors.userName &&
                        <p className="error">사용자 이름은 필수이며 3자 이상 10자 이하여야 합니다.</p>}

                    <input
                        {...register('email', {required: true, pattern: emailPattern})}
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">올바른 이메일 주소가 아닙니다.</p>}

                    <input
                        {...register('password', {required: true, minLength: 4, pattern:passwordPattern})}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">비밀번호는 필수이며 4자 이상이어야 합니다</p>}

                    <input
                        {...register('confirmpassword', {required: true, minLength: 4})}
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    {errors.confirmpassword &&
                        <p className="error">비밀번호가 같지 않습니다.</p>}

                    <button type="submit">계정 생성</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;
