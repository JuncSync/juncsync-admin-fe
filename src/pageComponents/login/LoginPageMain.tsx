import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';

import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/key';
import { COMMON_BACKGROUND_IMAGE_STYLES } from '@/constants/style';
import { INFINITE_EXPIRE_TIME } from '@/constants/time';

import { usePostLoginMutation } from '@/hooks/query/auth/useAuthMutation';

import { getCookie, setCookie } from '@/utils/cookie';

type LoginForm = {
  id: string;
  password: string;
};

const LoginPageMain = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    id: '',
    password: '',
  });

  const { mutate } = usePostLoginMutation();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { id, password } = form;

    mutate(
      {
        id,
        password,
      },
      {
        onSuccess: ({ isOk, data }) => {
          if (!isOk) {
            alert('계정을 올바르게 입력해주세요.');
            return;
          }

          setCookie(COOKIE_ACCESS_TOKEN_KEY, data, INFINITE_EXPIRE_TIME);
          navigate('/');
        },
      },
    );
  };

  useEffect(() => {
    // TEMP: 임시 처리 (사용자 엑세스 토큰으로 유저 인증 처리)
    const accessToken = getCookie(COOKIE_ACCESS_TOKEN_KEY);
    if (accessToken) {
      navigate('/');
    }
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full min-h-screen"
      style={{
        ...COMMON_BACKGROUND_IMAGE_STYLES,
        backgroundImage: `url("/images/login-bg.webp")`,
      }}
    >
      <form
        className="w-[400px] h-[418px] bg-white drop-shadow-container rounded-xl p-10 flex flex-col justify-center items-center gap-4"
        onSubmit={onSubmit}
      >
        <div className="w-full flex items-center justify-start py-8">
          <img
            className="w-[221px] h-[57px]"
            src="/images/logo.svg"
            alt="로고"
          />
        </div>
        <div className="w-full flex flex-col gap-[15.47px]">
          <Input
            type="text"
            placeholder="ID"
            inputClassName="w-full py-4 px-5 h-14"
            autoFocus
            value={form.id}
            onChange={onChange}
            name="id"
          />
          <Input
            type="password"
            placeholder="PW"
            inputClassName="w-full py-4 px-5 h-14"
            value={form.password}
            onChange={onChange}
            name="password"
          />
          <Button
            type="submit"
            text="Login"
            buttonType="Primary"
            size="lg"
            customClassName="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPageMain;
