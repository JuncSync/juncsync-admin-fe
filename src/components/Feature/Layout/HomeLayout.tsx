import classNames from 'classnames';
import React, { useState } from 'react';

import Sidebar from '@/components/Common/Sidebar';

import { ILayoutProps } from '@/interfaces/layout.type';

const HomeLayout = ({ children }: ILayoutProps) => {
  const [patientRooms, setPatientRooms] = useState([
    {
      id: 1,
      room: 'Patient Room A',
    },
    {
      id: 2,
      room: 'Patient Room B',
    },
  ]);
  const [currentRoomId, setCurrentRoomId] = useState<number>(1);
  return (
    <div className="flex">
      <Sidebar>
        <div className="w-full flex flex-col">
          {patientRooms.map(({ id, room }) => (
            <div className="py-5 px-8" key={id}>
              <button
                className={`flex items-center gap-2 font-semibold text-lg cursor-pointer ${classNames(
                  {
                    'text-orange': currentRoomId === id,
                    'text-gray_700': currentRoomId !== id,
                  },
                )}`}
                onClick={() => {
                  setCurrentRoomId(id);
                }}
              >
                <img
                  className="w-4 h-4"
                  src={`${
                    currentRoomId === id
                      ? '/icons/patient-room.svg'
                      : '/icons/patient-room--inactive.svg'
                  } `}
                  alt="탭"
                />
                {room}
              </button>
            </div>
          ))}
          <div className="py-5 px-8">
            <button className="flex items-center gap-2 text-gray_400 font-semibold text-lg">
              <img className="w-4 h-4" src="/icons/plus.svg" alt="추가" />
              Add Patient Room
            </button>
          </div>
        </div>
      </Sidebar>
      {children}
    </div>
  );
};

export default HomeLayout;
