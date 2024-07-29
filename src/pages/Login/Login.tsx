import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FieldError } from 'react-hook-form';
import axios from 'axios';
import { login } from '../../services/authSlice';
import styled from 'styled-components';
import Header from '../../components/Header/Header';

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/sign-api/sign-in?account=string&password=string", data);
      const token = response.data.token; 
      dispatch(login(token));
      console.log(response.data);
    } catch (error) {
      console.error("로그인 에러", error);
    }
  };

  return (
    <>
      <Header isLoggedIn={false} marginTop="34px" />
      <LoginLayout>
        <Title>
          <h1>프롬프렌과 함께해요</h1>
          <p>
            <span>아이디</span>와 <span>비밀번호</span>를 작성해주세요
          </p>
        </Title>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Input
              {...register("account", { required: "아이디를 입력해주세요" })}
              type="text"
              placeholder="아이디"
            />
            {errors.account && <Error>{(errors.account as FieldError).message}</Error>}
            <Input
              {...register("password", { required: "비밀번호를 입력해주세요" })}
              type="password"
              placeholder="비밀번호"
            />
            {errors.password && <Error>{(errors.account as FieldError).message}</Error>}
            <SubmitButton type="submit">시작하기</SubmitButton>
          </InputGroup>
        </LoginForm>
      </LoginLayout>
    </>
  );
};

export default Login;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: "Noto Sans KR";
  margin-top: 9.81rem;
`;

const Title = styled.div`
  h1 {
    width: 326px;
    height: 29px;
    font-size: 24px;
    font-weight: 700;
    font-family: "Gmarket Sans TTF";
    font-style: normal;
    background: linear-gradient(90deg, #72d49b 0%, #2cc1bf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  p {
    margin-top: 5px;
    color: #949494;
    font-size: 12px;
    font-weight: 400;
  }
  span {
    font-weight: 700;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 319px;
  margin-top: 24px;
`;

const Input = styled.input`
  margin-bottom: 12px;
  height: 49px;
  padding-left: 18px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  height: 52px;
  margin-top: 24px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(90deg, #72d49b 0%, #2cc1bf 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
