import dayjs from 'dayjs';

import Button from '@/components/Common/Button';

import { INITIAL_FORM } from '@/constants/HomePage/form';

import { Bed } from '@/api/models/bed/bed.type';

import { generateRandomPatientCode } from '@/utils/random';

const BedCard = ({
  bed,
  handleAdd,
  handleEdit,
  handleDischarge,
  setForm,
}: {
  bed: Bed;
  handleAdd: () => void;
  handleEdit: (bed: Bed) => void;
  handleDischarge: (bed: Bed) => void;
  setForm?: any;
}) => {
  const isEmpty = !bed.patientId;
  const isWaiting = bed.patientId && !bed.patient?.name;

  const onSetFormAdd = () => {
    setForm({
      ...INITIAL_FORM,
      bedCode: bed.id,
      patientCode: generateRandomPatientCode(),
    });
  };

  const onSetFormDischargeOrEdit = () => {
    setForm({
      bedCode: bed.id,
      patientCode: bed.patientId,
      name: bed.patient?.name,
      etaHour: bed.patient?.etaHour ?? '',
      etaMin: bed.patient?.etaMin ?? '',
      diagnosis: bed.patient?.diagnosis ?? '',
      birthMonth: bed.patient?.birthMonth ?? '',
      birthDay: bed.patient?.birthDay ?? '',
      birthYear: bed.patient?.birthYear ?? '',
      gender: bed.patient?.gender,
      severity: bed.patient?.severity ?? '',
    });
  };

  return (
    <section className="min-w-[392px] min-h-[190px] bg-white border border-solid border-gray_300 rounded-lg p-6 drop-shadow-card_container">
      <h2 className="text-gray_700 text-lg font-semibold">{`Bed A-00${bed.id}`}</h2>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        <h1 className="text-gray_900 text-[20px] font-semibold">
          {isEmpty
            ? 'Vacant Bed'
            : isWaiting
            ? 'Waiting'
            : `${bed.patient?.name}(${bed.patient?.birthYear})`}
        </h1>
        <div className="flex items-center gap-2">
          <img src="/fracture.svg" alt="fracture" />
          <h4 className="text-gray_700 text-sm font-normal">
            {isEmpty
              ? '-'
              : isWaiting
              ? 'Please enter patient information.'
              : `fracture(${bed?.patient?.diagnosis})`}
          </h4>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray_200 mt-[12px] mb-[8px]" />
      <div className="w-full flex items-center justify-between">
        <h3 className="text-black text-opacity-[0.67] text-sm font-semibold">
          {isEmpty
            ? '-'
            : `In : ${dayjs(bed.patient?.createdAt).format('YY.MM.DD')}`}
        </h3>

        {isEmpty ? (
          <Button
            buttonType="Primary"
            text="Admission"
            size="sm"
            customClassName="w-[100px] h-[30px]"
            onClick={handleAdd}
            onMouseOver={onSetFormAdd}
          />
        ) : (
          <div className="flex items-center gap-[8px]">
            <Button
              buttonType="Secondary"
              text="Disch"
              size="sm"
              customClassName="min-w-[78px] h-[30px]"
              onClick={() => handleDischarge(bed)}
              onMouseOver={onSetFormDischargeOrEdit}
            />
            <Button
              buttonType="Primary"
              text="Edit"
              size="sm"
              customClassName="min-w-[78px] h-[30px]"
              onClick={() => handleEdit(bed)}
              onMouseOver={onSetFormDischargeOrEdit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BedCard;
