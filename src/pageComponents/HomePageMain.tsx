import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useModal } from '@/components/Common/Modal/Modal.hooks';
import Radio from '@/components/Common/Radio';
import Sidebar from '@/components/Common/Sidebar';
import DiseaseBed, { DiseaseBedType } from '@/components/Feature/DiseaseBed';

const INITIAL_FORM = {
  bedCode: '',
  patientCode: '',
  patientAge: '',
  patientName: '',
  patientSex: 'Female',
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
      patientSex: 'Male',
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

  const onChangeGender: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setForm((prev) => ({ ...prev, patientSex: value }));
  };

  const bedModalChildren = useCallback(
    (type: 'add' | 'modify' | 'delete') => {
      return (
        <form className="w-full flex flex-col">
          <h1 className="w-full flex justify-start text-xl font-semibold text-gray_900">
            {type === 'add'
              ? 'Admission'
              : type === 'modify'
              ? 'Edit'
              : 'Discharge'}
          </h1>
          {type === 'delete' && (
            <span className="mt-2 w-full flex justify-start items-center text-lg font-medium text-gray_700">
              Are you sure you want to proceed with the discharge?
            </span>
          )}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-5">
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="bed-id"
              >
                Bed number
              </label>
              <Input
                id="bed-id"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={form.bedCode}
                name="bedCode"
                onChange={onChangeForm}
                placeholder="Bed number"
                autoFocus
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="disease-name"
              >
                Diagnosis
              </label>
              <Input
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                id="disease-name"
                value={form.diseaseName}
                name="diseaseName"
                onChange={onChangeForm}
                placeholder="Diagnosis"
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="patient-no"
              >
                Patient ID
              </label>
              <Input
                id="patient-no"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={form.patientCode}
                name="patientCode"
                onChange={onChangeForm}
                placeholder="Patient ID"
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-fit text-gray_700 font-medium text-sm">
                Birth (Age)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form.patientAge}
                  name="patientAge"
                  onChange={onChangeForm}
                  placeholder="MM"
                  disabled={type === 'delete'}
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form.patientAge}
                  name="patientAge"
                  onChange={onChangeForm}
                  placeholder="DD"
                  disabled={type === 'delete'}
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form.patientAge}
                  name="patientAge"
                  onChange={onChangeForm}
                  placeholder="YYYY"
                  disabled={type === 'delete'}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="patient-name"
              >
                Patient Name
              </label>
              <Input
                id="patient-name"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={form.patientName}
                name="patientName"
                onChange={onChangeForm}
                placeholder="Patient Name"
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-fit text-gray_700 font-medium text-sm">
                Gender
              </label>
              <div className="flex items-center gap-4">
                <Radio
                  title="Female"
                  value="Female"
                  checked={form.patientSex === 'Female'}
                  handleChange={onChangeGender}
                />
                <Radio
                  title="Male"
                  value="Male"
                  checked={form.patientSex === 'Male'}
                  handleChange={onChangeGender}
                />
              </div>

              {/* <Input
                id="patient-sex"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={form.patientSex}
                name="patientSex"
                onChange={onChangeForm}
                placeholder="Gender"
                disabled={type === 'delete'}
              /> */}
            </div>
          </div>
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
        <nav className="w-full py-5 px-10 flex items-center justify-between border-b border-solid border-gray_300">
          <Input
            type="search"
            placeholder="Search by patient name"
            inputClassName="min-w-[320px] h-10 py-2 px-5"
          />
          <Button
            type="button"
            text="Add bed"
            buttonType="Secondary"
            size="sm"
            customClassName="min-w-[120px] h-10"
            onClick={() => {}}
          />
        </nav>
        <main className="w-full flex-1 bg-gray_100 py-10 px-20">
          <div className="flex flex-wrap gap-8">
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
