import dayjs from 'dayjs';
import React from 'react';

import Button from '@/components/Common/Button';

interface Props {
  bedCode: string;
  patientName?: string;
  patientAge?: number;
  diseaseName?: string;
  diseaseCode?: string;
  isEmpty: boolean;
  isWaiting: boolean;
  createdAt: number;
}

const DiseaseBed = ({
  bedCode,
  patientName,
  patientAge,
  diseaseName,
  diseaseCode,
  isEmpty,
  isWaiting,
  createdAt,
}: Props) => {
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
            : `${patientName}(${patientAge}세)`}
        </h1>
        <h4 className="text-black text-[12px] font-bold text-opacity-[0.4]">
          {isEmpty
            ? '-'
            : isWaiting
            ? '정보 입력이 필요합니다.'
            : `병명(코드): ${diseaseName}(${diseaseCode})`}
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
          />
        ) : (
          <div className="flex items-center gap-[8px]">
            <Button
              buttonType="Secondary"
              text="퇴원"
              size="sm"
              customClassName="w-[58px] h-[25px]"
            />
            <Button
              buttonType="Primary"
              text="수정"
              size="sm"
              customClassName="w-[58px] h-[25px]"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DiseaseBed;
