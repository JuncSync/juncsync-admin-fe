import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useState,
} from 'react';

import Input from '@/components/Common/Input';
import Radio from '@/components/Common/Radio';

import { INITIAL_FORM } from '@/constants/HomePage/form';

export type ModalType = 'Add' | 'Edit' | 'Discharge';

const useBedModalChildrenForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);

  const onChangeCommonForm: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeRadio = (
    event: ChangeEvent<HTMLInputElement>,
    key: 'gender' | 'severity',
  ) => {
    const { value } = event.target;

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const bedModalChildren = useCallback(
    (type: ModalType) => {
      return (
        <form className="w-full flex flex-col">
          <h1 className="w-full flex justify-start text-xl font-semibold text-gray_900">
            {type === 'Add'
              ? 'Admission'
              : type === 'Edit'
              ? 'Edit'
              : 'Discharge'}
          </h1>
          {type === 'Discharge' && (
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
                onChange={onChangeCommonForm}
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
                onChange={onChangeCommonForm}
                placeholder="Diagnosis"
                disabled={type === 'Discharge'}
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
                onChange={onChangeCommonForm}
                placeholder="Patient ID"
                disabled
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
                  onChange={onChangeCommonForm}
                  placeholder="MM"
                  disabled={type === 'Discharge'}
                  type="number"
                  max="2"
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form?.birthDay ?? ''}
                  name="birthDay"
                  onChange={onChangeCommonForm}
                  placeholder="DD"
                  disabled={type === 'Discharge'}
                  type="number"
                  max="2"
                />
                <Input
                  inputClassName="w-[101px] h-[56px] py-4 px-5"
                  value={form?.birthYear ?? ''}
                  name="birthYear"
                  onChange={onChangeCommonForm}
                  placeholder="YYYY"
                  disabled={type === 'Discharge'}
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
                onChange={onChangeCommonForm}
                placeholder="Patient Name"
                disabled={type === 'Discharge'}
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
                  handleChange={(event) => onChangeRadio(event, 'gender')}
                />
                <Radio
                  title="Male"
                  value="Male"
                  checked={form.gender === 'Male'}
                  handleChange={(event) => onChangeRadio(event, 'gender')}
                />
              </div>
            </div>
            {type === 'Add' && (
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
                      onChange={onChangeCommonForm}
                      placeholder="00"
                      type="number"
                      max="2"
                    />
                    <span className="text-gray_400 text-lg font-normal">:</span>
                    <Input
                      inputClassName="w-[150px] h-[56px] py-4 px-5"
                      value={form?.etaMin ?? ''}
                      name="etaMin"
                      onChange={onChangeCommonForm}
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
                      handleChange={(event) => onChangeRadio(event, 'severity')}
                    />
                    <Radio
                      title="Level1"
                      value="Level1"
                      checked={form.severity === 'Level1'}
                      handleChange={(event) => onChangeRadio(event, 'severity')}
                    />
                    <Radio
                      title="Level2"
                      value="Level2"
                      checked={form.severity === 'Level2'}
                      handleChange={(event) => onChangeRadio(event, 'severity')}
                    />
                    <Radio
                      title="Level3"
                      value="Level3"
                      checked={form.severity === 'Level3'}
                      handleChange={(event) => onChangeRadio(event, 'severity')}
                    />
                    <Radio
                      title="Level4"
                      value="Level4"
                      checked={form.severity === 'Level4'}
                      handleChange={(event) => onChangeRadio(event, 'severity')}
                    />
                    <Radio
                      title="Level5"
                      value="Level5"
                      checked={form.severity === 'Level5'}
                      handleChange={(event) => onChangeRadio(event, 'severity')}
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

  return { bedModalChildren, form, setForm };
};

export default useBedModalChildrenForm;
