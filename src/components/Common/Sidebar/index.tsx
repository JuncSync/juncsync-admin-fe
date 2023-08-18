import React from 'react';

import { ILayoutProps } from '@/interfaces/layout.type';

const Sidebar = ({ children }: ILayoutProps) => {
  return (
    <aside className="flex flex-col items-center w-[301px] min-h-screen bg-white border-r-[1px] border-solid border-gray">
      <div className="w-full border-b-[1px] border-solid border-gray border-opacity-[0.2] pl-[40px] py-[23px]">
        <img
          className="w-[186px] h-[51px]"
          src="/src/assets/service-letter.svg"
          alt="서비스 글자"
        />
      </div>
      <div className="w-full flex-1 border-b-[1px] border-solid border-gray border-opacity-[0.2]">
        {children}
      </div>
      <button className="w-fit py-[32px] pl-[40px] text-black text-[32px] text-opacity-[0.3] self-start">
        로그아웃
      </button>
    </aside>
  );
};

export default Sidebar;
