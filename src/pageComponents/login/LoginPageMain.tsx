import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';

const LoginPageMain = () => {
  const [form, setForm] = useState<{
    id: string;
    pw: string;
  }>({
    id: '',
    pw: '',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log(form);
  };

  return (
    <div className="flex justify-center items-center bg-orange w-full min-h-screen">
      <form
        className="w-[330px] h-[380px] bg-white drop-shadow-container rounded-xl px-[30px] py-[40px] flex flex-col justify-center items-center"
        onSubmit={onSubmit}
      >
        <img
          className="w-[212px] h-[84px]"
          src="/src/assets/logo.svg"
          alt="로고"
        />
        <div className="w-full flex flex-col gap-[15.47px] mt-[36.49px]">
          <Input
            placeholder="ID"
            inputClassName="w-full"
            autoFocus
            value={form.id}
            onChange={onChange}
            name="id"
          />
          <Input
            placeholder="PW"
            inputClassName="w-full"
            value={form.pw}
            onChange={onChange}
            name="pw"
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
