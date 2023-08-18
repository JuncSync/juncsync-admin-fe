import Sidebar from '@/components/Common/Sidebar';

const HomePageMain = () => {
  return (
    <div>
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
    </div>
  );
};

export default HomePageMain;
