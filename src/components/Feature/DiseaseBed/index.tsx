import dayjs from 'dayjs';

import { INITIAL_FORM } from '@/pageComponents/HomePageMain';

import Button from '@/components/Common/Button';

export interface DiseaseBedType {
  id: string;
  bedCode: string;
  patientCode?: string;
  patientAge?: number;
  patientName?: string;
  patientSex?: string;
  diseaseName?: string;
  diseaseCode?: string;
  isEmpty: boolean;
  isWaiting: boolean;
  createdAt: number;
}

const DiseaseBed = ({
  bed,
  handleAdd,
  handleEdit,
  handleDischarge,
  setForm,
}: {
  bed: DiseaseBedType;
  handleAdd: () => void;
  handleEdit: (bed: DiseaseBedType) => void;
  handleDischarge: (bed: DiseaseBedType) => void;
  setForm?: any;
}) => {
  const { id, bedCode, isEmpty, isWaiting, createdAt } = bed;

  const onSetFormAdd = () => {
    setForm(INITIAL_FORM);
  };

  const onSetFormDischargeOrEdit = () => {
    setForm({
      bedCode: bed.bedCode,
      patientCode: bed.patientCode ?? '',
      patientAge: bed.patientAge ?? '',
      patientName: bed.patientName ?? '',
      patientSex: bed.patientSex ?? '',
      diseaseName: bed.diseaseName ?? '',
    });
  };

  return (
    <section className="min-w-[392px] min-h-[190px] bg-white border border-solid border-gray_300 rounded-lg p-6 drop-shadow-card_container">
      <h2 className="text-gray_700 text-lg font-semibold">Bed {bedCode}</h2>
      <div className="flex flex-col gap-[10px] mt-[10px]">
        <h1 className="text-gray_900 text-[20px] font-semibold">
          {isEmpty
            ? 'Vacant Bed'
            : isWaiting
            ? 'Waiting'
            : `${bed?.patientName}(${bed?.patientAge})`}
        </h1>
        <div className="flex items-center gap-2">
          <img src="/fracture.svg" alt="fracture" />
          <h4 className="text-gray_700 text-sm font-normal">
            {isEmpty
              ? '-'
              : isWaiting
              ? 'Please enter patient information.'
              : `fracture(${bed?.diseaseCode})`}
          </h4>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray_200 mt-[12px] mb-[8px]" />
      <div className="w-full flex items-center justify-between">
        <h3 className="text-black text-opacity-[0.67] text-sm font-semibold">
          {isEmpty ? '-' : `In : ${dayjs(createdAt).format('YY.MM.DD')}`}
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

export default DiseaseBed;
