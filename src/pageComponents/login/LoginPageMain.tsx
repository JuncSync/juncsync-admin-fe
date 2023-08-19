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
  };

  return (
    <div className="flex justify-center items-center bg-orange w-full min-h-screen">
      <form
        className="w-[400px] h-[418px] bg-white drop-shadow-container rounded-xl p-10 flex flex-col justify-center items-center gap-4"
        onSubmit={onSubmit}
      >
        <div className="w-full flex items-center justify-start py-8">
          <img className="w-[221px] h-[57px]" src="/logo.svg" alt="로고" />
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
