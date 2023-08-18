import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Sidebar from '@/components/Common/Sidebar';

const HomePageMain = () => {
  return (
    <div className="flex">
      <Sidebar>
        <div className="w-full pl-[40px] flex flex-col items-start gap-[44px] mt-[40px]">
          <button className="text-black font-semibold text-[32px]">
            A층 병실
          </button>
          <button className="text-black text-[32px] text-opacity-[0.3] font-normal">
            B층 병실
          </button>
          <button className="text-black text-[32px] text-opacity-[0.3] font-normal">
            + 병실 추가
          </button>
        </div>
      </Sidebar>
      <div className="w-full flex flex-col">
        <nav className="w-full p-[28px] flex items-center justify-between border-b-[1px] border-solid border-[#B8B8B8]">
          <Input
            type="search"
            placeholder="환자명으로 검색"
            inputClassName="w-[337px] py-[8px] px-[18px]"
          />
          <Button
            text="병상 추가"
            buttonType="Secondary"
            size="lg"
            customClassName="w-[204px] h-[50px]"
          />
        </nav>
        <main className="w-full flex-1 bg-[#F9F7F7]"></main>
      </div>
    </div>
  );
};

export default HomePageMain;
