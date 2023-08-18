import { useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useModal } from '@/components/Common/Modal/Modal.hooks';
import Sidebar from '@/components/Common/Sidebar';
import DiseaseBed from '@/components/Feature/DiseaseBed';

const HomePageMain = () => {
  const { isOpen, open, close, setData, render } = useModal();

  const [beds, setBeds] = useState([
    {
      id: 1,
      bedCode: 'A-01',
      patientName: '김진호',
      patientAge: 24,
      diseaseName: '골절',
      diseaseCode: '82-DA',
      isEmpty: false,
      isWaiting: false,
      createdAt: Date.now(),
    },
    {
      id: 2,
      bedCode: 'A-02',
      isEmpty: true,
      isWaiting: false,
      createdAt: Date.now(),
    },
    {
      id: 3,
      bedCode: 'A-02',
      isEmpty: false,
      isWaiting: true,
      createdAt: Date.now(),
    },
  ]);

  const handleAddBed = () => {
    setData({
      modalChildren: (
        <form className="flex flex-col">
          <h1 className="w-full flex justify-start mb-[32px] text-xl">입원</h1>
          <div className="grid grid-cols-2 gap-x-[55px] gap-y-[16px]">
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="bed-id"
              >
                병상번호
              </label>
              <Input
                id="bed-id"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="disease-name"
              >
                병명
              </label>
              <Input
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
                id="disease-name"
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="patient-no"
              >
                환자 번호
              </label>
              <Input
                id="patient-no"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="patient-age"
              >
                연령 (생년월일)
              </label>
              <Input
                id="patient-age"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="patient-name"
              >
                환자 성명
              </label>
              <Input
                id="patient-name"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="patient-sex"
              >
                성별
              </label>
              <Input
                id="patient-sex"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
              />
            </div>
          </div>
        </form>
      ),
      buttons: [
        {
          type: 'Secondary',
          text: 'Cancel',
          action: () => close(),
        },
        {
          type: 'Primary',
          text: 'Save',
          action: () => close(),
        },
      ],
    });

    open();
  };

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
            type="button"
            text="병상 추가"
            buttonType="Secondary"
            size="lg"
            customClassName="w-[204px] h-[50px]"
            onClick={handleAddBed}
          />
        </nav>
        <main className="w-full flex-1 bg-[#F9F7F7] py-[28px] px-[32px]">
          <div className="flex flex-wrap gap-[31px]">
            {beds.map((bed) => (
              <DiseaseBed key={bed.id} {...bed} />
            ))}
          </div>
        </main>
      </div>
      {isOpen && render()}
    </div>
  );
};

export default HomePageMain;
