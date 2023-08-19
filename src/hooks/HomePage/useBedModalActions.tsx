import { queryClient } from '@/react-query/queryClient';
import { queryKeys } from '@/react-query/queryKeys';
import { useCallback, useEffect, useState } from 'react';

import { useModal } from '@/components/Common/Modal/Modal.hooks';

import { INITIAL_FORM } from '@/constants/HomePage/form';

import { Bed } from '@/api/models/bed/bed.type';

import { usePostBedOutMutation } from '../query/bed/useBedMutation';
import {
  usePostPatientAdmission,
  usePutPatientBedInMutation,
} from '../query/patient/usePatientMutation';
import useBedModalChildrenForm, { ModalType } from './useBedModalChildrenForm';

const useBedModalActions = () => {
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const reset = () => {
    setSelectedBed(null);
    setModalType(null);
    setForm(INITIAL_FORM);
  };

  const { isOpen, open, close, setData, render } = useModal({
    onCustomCloseAction: reset,
  });

  const { bedModalChildren, form, setForm } = useBedModalChildrenForm();

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
              if (bed.patientId) {
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
              }
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

  return {
    handleAddBed,
    handleEditBed,
    handleDischargeBed,
    isOpen,
    render,
    setForm,
  };
};

export default useBedModalActions;
