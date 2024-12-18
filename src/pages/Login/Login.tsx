import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FieldError } from "react-hook-form";
import { login } from "../../services/authSlice";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/clientapi";
import axios from "axios";

type LoginFormInputs = {
  account: string;
  password: string;
};

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const { data: responseData } = await apiClient.post(
        "/sign-api/sign-in",
        null,
        {
          params: { account: data.account, password: data.password },
        }
      );

      const { token, user } = responseData;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(login({ token, user }));
      navigate(redirectPath, { replace: true });
      setServerError(null);
    } catch (error: unknown) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setServerError(
        error.response?.status === 400
          ? "아이디/비밀번호를 다시 확인해주세요."
          : "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
      console.error("Axios 오류:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      setServerError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("네트워크 오류:", error);
    } else {
      setServerError("알 수 없는 오류가 발생했습니다.");
      console.error("알 수 없는 오류:", error);
    }
  };

  return (
    <LoginLayer>
      <Header isLoggedIn={false} fixed={false} />
      <LoginLayout>
        <Title>
          <h1>프롬프렌과 함께해요</h1>
          <p>
            <span>아이디</span>와 <span>비밀번호</span>를 작성해주세요
          </p>
        </Title>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <StyledInput
              {...register("account", { required: "아이디를 입력해주세요" })}
              type="text"
              placeholder="아이디"
              error={errors.account}
            />
            {errors.account && (
              <ErrorMessage>
                {(errors.account as FieldError).message}
              </ErrorMessage>
            )}

            <StyledInput
              {...register("password", { required: "비밀번호를 입력해주세요" })}
              type="password"
              placeholder="비밀번호"
              error={errors.password}
            />
            {errors.password && (
              <ErrorMessage>
                {(errors.password as FieldError).message}
              </ErrorMessage>
            )}

            {serverError && <ServerError>{serverError}</ServerError>}

            <SubmitButton type="submit">시작하기</SubmitButton>
          </InputGroup>
        </LoginForm>
      </LoginLayout>
    </LoginLayer>
  );
};

export default Login;

const LoginLayer = styled.div`
  max-width: 100%;
`;
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
const StyledInput = styled.input<{ error?: FieldError }>`
  margin-bottom: 12px;
  height: 49px;
  padding-left: 18px;
  border: 1px solid ${(props) => (props.error ? "red" : "#d9d9d9")};
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
const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const ServerError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-weight: 500;
`;
