import dayjs from 'dayjs';
import React from 'react';

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
  handleAddBed,
  handleModifyBed,
  handleDeleteBed,
  setForm,
}: {
  bed: DiseaseBedType;
  handleAddBed: () => void;
  handleModifyBed: (bed: DiseaseBedType) => void;
  handleDeleteBed: (bed: DiseaseBedType) => void;
  setForm?: any;
}) => {
  const { id, bedCode, isEmpty, isWaiting, createdAt } = bed;

  const onSetFormHoverOrModify = () => {
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
    <section className="w-[338px] h-[200px] bg-white border border-solid border-[#ACACAC] rounded-lg px-[28px] pt-[28px] pb-[19px]">
      <h2 className="text-black text-[20px] font-bold text-opacity-[0.9] mb-[16px]">
        병상 {bedCode}
      </h2>
      <div className="flex flex-col gap-[6.27px]">
        <h1 className="text-black text-[20px] font-bold text-opacity-[0.6]">
          {isEmpty
            ? '빈병상'
            : isWaiting
            ? 'Waiting'
            : `${bed?.patientName}(${bed?.patientAge}세)`}
        </h1>
        <h4 className="text-black text-[12px] font-bold text-opacity-[0.4]">
          {isEmpty
            ? '-'
            : isWaiting
            ? '정보 입력이 필요합니다.'
            : `병명(코드): ${bed?.diseaseName}(${bed?.diseaseCode})`}
        </h4>
      </div>
      <div className="w-full h-[1px] bg-black opacity-[0.1] mt-[12px] mb-[9px]" />
      <div className="w-full flex items-center justify-between">
        <h3 className="text-black text-opacity-[0.67] text-sm font-bold">
          {isEmpty ? '-' : `in : ${dayjs(createdAt).format('YY.MM.DD')}`}
        </h3>

        {isEmpty ? (
          <Button
            buttonType="Primary"
            text="입원"
            size="sm"
            customClassName="w-[58px] h-[25px]"
            onClick={handleAddBed}
          />
        ) : (
          <div className="flex items-center gap-[8px]">
            <Button
              buttonType="Secondary"
              text="퇴원"
              size="sm"
              customClassName="w-[58px] h-[25px]"
              onClick={() => handleDeleteBed(bed)}
              onMouseOver={onSetFormHoverOrModify}
            />
            <Button
              buttonType="Primary"
              text="수정"
              size="sm"
              customClassName="w-[58px] h-[25px]"
              onClick={() => handleModifyBed(bed)}
              onMouseOver={onSetFormHoverOrModify}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DiseaseBed;
