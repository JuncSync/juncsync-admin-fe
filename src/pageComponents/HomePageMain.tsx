import { queryClient } from '@/react-query/queryClient';
import { queryKeys } from '@/react-query/queryKeys';
import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { useModal } from '@/components/Common/Modal/Modal.hooks';
import BedCard from '@/components/Feature/BedCard';
import HomeLayout from '@/components/Feature/Layout/HomeLayout';

import { INITIAL_FORM } from '@/constants/HomePage/form';

import { Bed } from '@/api/models/bed/bed.type';

import useBedModalChildrenForm, {
  ModalType,
} from '@/hooks/HomePage/useBedModalChildrenForm';
import useSearchKeyword from '@/hooks/HomePage/useSearchKeyword';
import { usePostBedOutMutation } from '@/hooks/query/bed/useBedMutation';
import { useGetBedsQuery } from '@/hooks/query/bed/useBedQuery';
import {
  usePostPatientAdmission,
  usePutPatientBedInMutation,
} from '@/hooks/query/patient/usePatientMutation';

const HomePageMain = () => {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const { searchValue, searchKeyword, handleSearchKeyword } =
    useSearchKeyword();

  const reset = () => {
    setSelectedBed(null);
    setModalType(null);
    setForm(INITIAL_FORM);
  };

  const { isOpen, open, close, setData, render } = useModal({
    onCustomCloseAction: reset,
  });

  const { bedModalChildren, form, setForm } = useBedModalChildrenForm();

  const { data, isLoading } = useGetBedsQuery({
    s: searchKeyword,
  });

  const { mutate: postBedOutMutate } = usePostBedOutMutation();
  const { mutate: postPatientMutate } = usePostPatientAdmission();
  const { mutate: putPatientMutate } = usePutPatientBedInMutation();

  const handleAddBed = useCallback(() => {
    setModalType('Add');
    setData({
      modalChildren: bedModalChildren('Add'),
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
      setModalType('Edit');
      setData({
        modalChildren: bedModalChildren('Edit'),
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
      setModalType('Discharge');
      setData({
        modalChildren: bedModalChildren('Discharge'),
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
      switch (modalType) {
        case 'Add':
          handleAddBed();
          break;
        case 'Edit':
          if (selectedBed) {
            handleEditBed(selectedBed);
          }
          break;
        case 'Discharge':
          if (selectedBed) {
            handleDischargeBed(selectedBed);
          }
          break;
      }
    }
  }, [
    isOpen,
    modalType,
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
          <div className="flex flex-wrap gap-8 justify-center">
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
