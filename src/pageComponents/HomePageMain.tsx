import classNames from 'classnames';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useModal } from '@/components/Common/Modal/Modal.hooks';
import Sidebar from '@/components/Common/Sidebar';
import DiseaseBed, { DiseaseBedType } from '@/components/Feature/DiseaseBed';

const INITIAL_FORM = {
  bedCode: '',
  patientCode: '',
  patientAge: '',
  patientName: '',
  patientSex: '',
  diseaseName: '',
};

const HomePageMain = () => {
  const [beds, setBeds] = useState<DiseaseBedType[]>([
    {
      id: '1',
      bedCode: 'A-01',
      patientCode: '19D1LKS',
      patientAge: 24,
      patientName: '김진호',
      patientSex: '남성',
      diseaseName: '골절',
      diseaseCode: '82-DA',
      isEmpty: false,
      isWaiting: false,
      createdAt: Date.now(),
    },
    {
      id: '2',
      bedCode: 'A-02',
      isEmpty: true,
      isWaiting: false,
      createdAt: Date.now(),
    },
    {
      id: '3',
      bedCode: 'A-02',
      isEmpty: false,
      isWaiting: true,
      createdAt: Date.now(),
    },
  ]);

  const [type, setType] = useState('');
  const [selectedBed, setSelectedBed] = useState<DiseaseBedType | null>(null);

  const [form, setForm] = useState(INITIAL_FORM);

  const reset = () => {
    setType('');
    setSelectedBed(null);
    setForm(INITIAL_FORM);
  };

  const { isOpen, open, close, setData, render } = useModal({
    onCustomCloseAction: reset,
  });

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const bedModalChildren = useCallback(
    (type: 'add' | 'modify' | 'delete') => {
      return (
        <form className="flex flex-col">
          <h1 className="w-full flex justify-start mb-[32px] text-xl">
            {type === 'add' ? '입원' : type === 'modify' ? '수정 병상' : '퇴원'}
          </h1>
          <div
            className={`grid grid-cols-2 gap-x-[55px] gap-y-[16px] ${classNames(
              {
                'bg-[#D9D9D9] bg-opacity-[0.2] rounded-lg p-4':
                  type === 'delete',
              },
            )}`}
          >
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
                value={form.bedCode}
                name="bedCode"
                onChange={onChangeForm}
                autoFocus
                disabled={type === 'delete'}
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
                value={form.diseaseName}
                name="diseaseName"
                onChange={onChangeForm}
                disabled={type === 'delete'}
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
                value={form.patientCode}
                name="patientCode"
                onChange={onChangeForm}
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex items-center justify-between gap-[30px]">
              <label
                className="w-fit text-black font-semibold text-xl"
                htmlFor="patient-age"
              >
                연령
              </label>
              <Input
                id="patient-age"
                inputClassName="w-[222px] h-[33px] py-[9px] px-[16px]"
                value={form.patientAge}
                name="patientAge"
                onChange={onChangeForm}
                disabled={type === 'delete'}
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
                value={form.patientName}
                name="patientName"
                onChange={onChangeForm}
                disabled={type === 'delete'}
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
                value={form.patientSex}
                name="patientSex"
                onChange={onChangeForm}
                disabled={type === 'delete'}
              />
            </div>
          </div>
          {type === 'delete' && (
            <span className="mt-[22px] w-full flex justify-start items-center text-xl font-semibold text-opacity-[0.67]">
              퇴원하시겠습니까?
            </span>
          )}
        </form>
      );
    },
    [form],
  );

  const handleAddBed = useCallback(() => {
    setType('add');
    setData({
      modalChildren: bedModalChildren('add'),
      buttons: [
        {
          type: 'Secondary',
          text: 'Cancel',
          action: () => {
            reset();
            close();
          },
        },
        {
          type: 'Primary',
          text: 'Save',
          action: () => {
            reset();
            close();
          },
        },
      ],
    });

    open();
  }, [bedModalChildren]);

  const handleModifyBed = useCallback(
    (bed: DiseaseBedType) => {
      setSelectedBed(bed);
      setType('modify');
      setData({
        modalChildren: bedModalChildren('modify'),
        buttons: [
          {
            type: 'Secondary',
            text: 'Cancel',
            action: () => {
              reset();
              close();
            },
          },
          {
            type: 'Primary',
            text: 'Save',
            action: () => {
              reset();
              close();
            },
          },
        ],
      });

      open();
    },
    [bedModalChildren],
  );

  const handleDeleteBed = useCallback(
    (bed: DiseaseBedType) => {
      setSelectedBed(bed);
      setType('delete');
      setData({
        modalChildren: bedModalChildren('delete'),
        buttons: [
          {
            type: 'Secondary',
            text: 'Cancel',
            action: () => {
              reset();
              close();
            },
          },
          {
            type: 'Primary',
            text: 'Discharge',
            action: () => {
              reset();
              close();
            },
          },
        ],
      });

      open();
    },
    [bedModalChildren],
  );

  useEffect(() => {
    if (isOpen) {
      switch (type) {
        case 'add':
          handleAddBed();
          break;
        case 'modify':
          if (selectedBed) {
            handleModifyBed(selectedBed);
          }
          break;
        case 'delete':
          if (selectedBed) {
            handleDeleteBed(selectedBed);
          }
          break;
      }
    }
  }, [
    isOpen,
    type,
    handleAddBed,
    handleModifyBed,
    handleDeleteBed,
    selectedBed,
  ]);

  return (
    <div className="flex">
      <Sidebar>
        <div className="w-full flex flex-col">
          <div className="py-5 px-8">
            <button className="flex items-center gap-2 text-orange font-semibold text-lg">
              <img className="w-4 h-4" src="/patient-room.svg" alt="활성화" />
              Patient Room A
            </button>
          </div>
          <div className="py-5 px-8">
            <button className="flex items-center gap-2 text-gray_700 font-semibold text-lg">
              <img
                className="w-4 h-4"
                src="/patient-room--inactive.svg"
                alt="비활성화"
              />
              Patient Room B
            </button>
          </div>
          <div className="py-5 px-8">
            <button className="flex items-center gap-2 text-gray_400 font-semibold text-lg">
              <img className="w-4 h-4" src="/plus.svg" alt="추가" />
              Add Patient Room
            </button>
          </div>
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
            onClick={() => {}}
          />
        </nav>
        <main className="w-full flex-1 bg-[#F9F7F7] py-[28px] px-[32px]">
          <div className="flex flex-wrap gap-[31px]">
            {beds.map((bed) => (
              <DiseaseBed
                key={bed.id}
                bed={bed}
                handleAddBed={handleAddBed}
                handleModifyBed={handleModifyBed}
                handleDeleteBed={handleDeleteBed}
                setForm={setForm}
              />
            ))}
          </div>
        </main>
      </div>
      {isOpen && render()}
    </div>
  );
};

export default HomePageMain;
