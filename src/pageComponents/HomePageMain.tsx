import { queryClient } from '@/react-query/queryClient';
import { queryKeys } from '@/react-query/queryKeys';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useModal } from '@/components/Common/Modal/Modal.hooks';
import Radio from '@/components/Common/Radio';
import BedCard from '@/components/Feature/BedCard';
import HomeLayout from '@/components/Feature/Layout/HomeLayout';

import { INITIAL_FORM } from '@/constants/HomePage/form';

import { Bed } from '@/api/models/bed/bed.type';

import useSearchKeyword from '@/hooks/HomePage/useSearchKeyword';
import { usePostBedOutMutation } from '@/hooks/query/bed/useBedMutation';
import { useGetBedsQuery } from '@/hooks/query/bed/useBedQuery';
import {
  usePostPatientAdmission,
  usePutPatientBedInMutation,
} from '@/hooks/query/patient/usePatientMutation';

const HomePageMain = () => {
  const [beds, setBeds] = useState<Bed[]>([]);

  const [type, setType] = useState('');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const [form, setForm] = useState(INITIAL_FORM);

  const { searchValue, searchKeyword, handleSearchKeyword } =
    useSearchKeyword();

  const { data, isLoading } = useGetBedsQuery({
    s: searchKeyword,
  });

  const { mutate: postBedOutMutate } = usePostBedOutMutation();
  const { mutate: postPatientMutate } = usePostPatientAdmission();
  const { mutate: putPatientMutate } = usePutPatientBedInMutation();

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

    setForm((prev) => ({ ...prev, gender: value }));
  };

  const onChangeSeverity: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setForm((prev) => ({ ...prev, severity: value }));
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
                htmlFor="bed-code"
              >
                Bed number
              </label>
              <Input
                id="bed-code"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={`A-00${form.bedCode}`}
                name="bedCode"
                onChange={onChangeForm}
                placeholder="Bed number"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="diagnosis"
              >
                Diagnosis
              </label>
              <Input
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                id="diagnosis"
                value={form?.diagnosis ?? ''}
                name="diagnosis"
                onChange={onChangeForm}
                placeholder="Diagnosis"
                disabled={type === 'delete'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="w-fit text-gray_700 font-medium text-sm"
                htmlFor="patient-code"
              >
                Patient ID
              </label>
              <Input
                id="patient-code"
                inputClassName="w-[320px] h-[56px] py-4 px-5"
                value={form?.patientCode ?? ''}
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
                  value={form?.birthMonth ?? ''}
                  name="birthMonth"
                  onChange={onChangeForm}
                  placeholder="MM"
                  disabled={type === 'delete'}
                  type="number"
                  max="2"
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form?.birthDay ?? ''}
                  name="birthDay"
                  onChange={onChangeForm}
                  placeholder="DD"
                  disabled={type === 'delete'}
                  type="number"
                  max="2"
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form?.birthYear ?? ''}
                  name="birthYear"
                  onChange={onChangeForm}
                  placeholder="YYYY"
                  disabled={type === 'delete'}
                  type="number"
                  max="4"
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
                value={form?.name ?? ''}
                name="name"
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
                  checked={form.gender === 'Female'}
                  handleChange={onChangeGender}
                />
                <Radio
                  title="Male"
                  value="Male"
                  checked={form.gender === 'Male'}
                  handleChange={onChangeGender}
                />
              </div>
            </div>
            {type === 'add' && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="w-fit text-gray_700 font-medium text-sm">
                    ETA (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      inputClassName="w-[150px] h-[56px] py-4 px-5"
                      value={form?.etaHour ?? ''}
                      name="etaHour"
                      onChange={onChangeForm}
                      placeholder="00"
                      type="number"
                      max="2"
                    />
                    <span className="text-gray_400 text-lg font-normal">:</span>
                    <Input
                      inputClassName="w-[150px] h-[56px] py-4 px-5"
                      value={form?.etaMin ?? ''}
                      name="etaMin"
                      onChange={onChangeForm}
                      placeholder="00"
                      type="number"
                      max="2"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-fit text-gray_700 font-medium text-sm">
                    Severity Levels
                  </label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Radio
                      title="None"
                      value="None"
                      checked={form.severity === 'None'}
                      handleChange={onChangeSeverity}
                    />
                    <Radio
                      title="Critical"
                      value="Critical"
                      checked={form.severity === 'Critical'}
                      handleChange={onChangeSeverity}
                    />
                    <Radio
                      title="Severe"
                      value="Severe"
                      checked={form.severity === 'Severe'}
                      handleChange={onChangeSeverity}
                    />
                    <Radio
                      title="Moderate"
                      value="Moderate"
                      checked={form.severity === 'Moderate'}
                      handleChange={onChangeSeverity}
                    />
                  </div>
                </div>
              </>
            )}
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
            // FIXME: Wrong Hospital...?
            postPatientMutate(
              {
                bedId: Number(form.bedCode),
                patientId: form.patientCode,
                name: form.name,
                gender: form.gender,
                diagnosis: form.diagnosis,
                birthYear: Number(form.birthYear),
                birthMonth: Number(form.birthMonth),
                birthDay: Number(form.birthDay),
                severity: form.severity,
                etaHour: Number(form.etaHour),
                etaMin: Number(form.etaMin),
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries([queryKeys.GetBeds]);
                },
              },
            );

            reset();
            close();
          },
        },
      ],
    });

    open();
  }, [bedModalChildren]);

  const handleEditBed = useCallback(
    (bed: Bed) => {
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
              // TODO: 테스트 필요
              if (bed.patientId && form.name)
                putPatientMutate(
                  {
                    patientId: bed.patientId?.toString(),
                    payload: {
                      name: form.name,
                      gender: form.gender,
                      diagnosis: form.diagnosis,
                      birthYear: Number(form.birthYear),
                      birthMonth: Number(form.birthMonth),
                      birthDay: Number(form.birthDay),
                      severity: form.severity,
                      etaHour: Number(form.etaHour),
                      etaMin: Number(form.etaMin),
                    },
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries([queryKeys.GetBeds]);
                    },
                  },
                );
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

  const handleDischargeBed = useCallback(
    (bed: Bed) => {
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
              postBedOutMutate(bed.id.toString(), {
                onSuccess: () => {
                  // TODO: 테스트 필요
                  queryClient.invalidateQueries([queryKeys.GetBeds]);
                },
              });
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
            handleEditBed(selectedBed);
          }
          break;
        case 'delete':
          if (selectedBed) {
            handleDischargeBed(selectedBed);
          }
          break;
      }
    }
  }, [
    isOpen,
    type,
    handleAddBed,
    handleEditBed,
    handleDischargeBed,
    selectedBed,
  ]);

  useEffect(() => {
    if (!data || isLoading) {
      return;
    }

    const preprocessedData = data.map((d) => ({
      id: d.id,
      hospitalId: d.hospital_id,
      patientId: d?.patient_id,
      patient: {
        id: d.patient?.id,
        name: d.patient?.name,
        birthMonth: d.patient?.birth_month,
        birthDay: d.patient?.birth_day,
        birthYear: d.patient?.birth_year,
        createdAt: d.patient?.createdAt,
        diagnosis: d.patient?.diagnosis,
        etaHour: d.patient?.eta_hour,
        etaMin: d.patient?.eta_min,
        gender: d.patient?.gender,
        hospitalId: d.patient?.hospital_id,
        severity: d.patient?.severity,
      },
    })) as Bed[];

    setBeds(preprocessedData);
  }, [data, isLoading]);

  return (
    <HomeLayout>
      <div className="w-full flex flex-col">
        <nav className="w-full py-5 px-10 flex items-center justify-between border-b border-solid border-gray_300">
          <Input
            type="search"
            placeholder="Search by patient name"
            inputClassName="min-w-[320px] h-10 py-2 px-5"
            value={searchValue}
            onChange={handleSearchKeyword}
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
              <BedCard
                key={bed.id}
                bed={bed}
                handleAdd={handleAddBed}
                handleEdit={handleEditBed}
                handleDischarge={handleDischargeBed}
                setForm={setForm}
              />
            ))}
          </div>
        </main>
      </div>
      {isOpen && render()}
    </HomeLayout>
  );
};

export default HomePageMain;
