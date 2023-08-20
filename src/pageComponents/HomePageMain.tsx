import { useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import BedCard from '@/components/Feature/BedCard';
import HomeLayout from '@/components/Feature/Layout/HomeLayout';

import { Bed } from '@/api/models/bed/bed.type';

import useBedModalActions from '@/hooks/HomePage/useBedModalActions';
import useSearchKeyword from '@/hooks/HomePage/useSearchKeyword';
import { useGetBedsQuery } from '@/hooks/query/bed/useBedQuery';

const HomePageMain = () => {
  const [beds, setBeds] = useState<Bed[]>([]);

  const { searchValue, searchKeyword, handleSearchKeyword } =
    useSearchKeyword();

  const {
    handleAddBed,
    handleEditBed,
    handleDischargeBed,
    isOpen,
    render,
    setForm,
  } = useBedModalActions();

  const { data, isLoading } = useGetBedsQuery({
    keyword: searchKeyword,
  });

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
        <nav className="fixed top-0 w-[calc(100%-280px)] py-5 px-10 flex items-center justify-between border-b border-solid border-gray_200 z-50 bg-white">
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
        <main className="w-full flex-1 bg-gray_100 py-[7.5rem] px-20">
          {/* TEMP: for column_3 flex styling */}
          <div className="flex flex-wrap gap-8 justify-center column_3:justify-start">
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
