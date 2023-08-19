import React from 'react';

import { ILayoutProps } from '@/interfaces/layout.type';

const Sidebar = ({ children }: ILayoutProps) => {
  return (
    <aside className="flex flex-col items-center min-w-[280px] min-h-screen bg-white border-r border-solid border-gray_200">
      <div className="w-full border-b border-solid border-gray_200 py-5 px-8">
        <img className="w-[124px] h-[32px]" src="/logo.svg" alt="로고" />
      </div>
      <div className="w-full flex-1 border-b border-solid border-gray_200">
        {children}
      </div>
      <button className="w-fit py-5 px-8 font-semibold text-gray_700 text-lg self-start flex items-center gap-2">
        <img src="/logout.svg" alt="로그아웃" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
