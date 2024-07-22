import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateAccount.css'; // CSS 파일을 임포트

const CreateAccount: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <div>
                <h3>회원가입</h3>
            </div>
            <div className="create-account-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register('userName', { required: true, minLength: 3, maxLength: 10 })}
                        name="userName"
                        type="text"
                        placeholder="Username"
                    />
                    {errors.userName && <p className="error">Username is required and must be between 3 and 10 characters</p>}

                    <input
                        {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">Email is required and must be a valid email address</p>}

                    <input
                        {...register('password', { required: true, minLength: 4 })}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">Password is required and must be at least 4 characters</p>}

                    <input
                        {...register('confirmpassword', { required: true, minLength: 4 })}
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    {errors.confirmpassword && <p className="error">Confirmation password is required and must be at least 4 characters</p>}

                    <button type="submit">Create account</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;
