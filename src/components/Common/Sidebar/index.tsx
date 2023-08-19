import { ILayoutProps } from '@/interfaces/layout.type';

import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/key';

import { deleteCookie } from '@/utils/cookie';

const Sidebar = ({ children }: ILayoutProps) => {
  const handleLogout = () => {
    deleteCookie(COOKIE_ACCESS_TOKEN_KEY);
    window.location.href = '/';
  };

  return (
    <aside className="flex flex-col items-center min-w-[280px] min-h-screen bg-white border-r border-solid border-gray_200">
      <div className="fixed min-w-[280px] border-b border-solid border-gray_200 py-5 px-8">
        <img className="w-[124px] h-[32px]" src="/logo.svg" alt="로고" />
      </div>
      <div className="fixed left-0 top-[5rem] min-w-[280px]">{children}</div>
      <div className="fixed bottom-0 min-w-[280px] py-5 px-8 border-t border-solid border-gray_200">
        <button
          className="font-semibold text-gray_700 text-lg self-start flex items-center gap-2"
          onClick={handleLogout}
        >
          <img src="/logout.svg" alt="로그아웃" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
