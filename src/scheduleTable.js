import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-bottom: 1px solid grey;
`;

const StyledRow = styled.tr`
  display: flex;
`;

const StyledDayCell = styled.td`
  width: 25%;
`;

const StyledTimeCell = styled.td`
  width: 37.5%;
  display: flex;
  justify-content: center;
`;
const StyledTimeCellClosed = styled.td`
  width: 75%;
  display: flex;
  justify-content: center;
`;

const ScheduleTable = ({ data }) => {
    data.sort((a, b) => a.day_id - b.day_id);

    return (
        <StyledTable>
            <tbody>
                {data.map(schedule => {
                    const { day, morningOpen, morningClose, afternoonOpen, afternoonClose } = schedule;
                    const isMorningClosed = !(morningOpen && morningClose);
                    const isAfternoonClosed = !(afternoonOpen && afternoonClose);
                    const isWholeDayClosed = isMorningClosed && isAfternoonClosed;
    
                    return (
                        <StyledRow key={day}>
                            <StyledDayCell>{day}</StyledDayCell>
                            {isWholeDayClosed 
                                ? <StyledTimeCellClosed style={{justifyContent: 'center'}} colSpan={4}>Fermé</StyledTimeCellClosed>
                                : (
                                    <>
                                        <StyledTimeCell>{isMorningClosed ? 'Fermé' : `${morningOpen} - ${morningClose}`}</StyledTimeCell>
                                        <StyledTimeCell>{isAfternoonClosed ? 'Fermé' : `${afternoonOpen} - ${afternoonClose}`}</StyledTimeCell>
                                    </>
                                )
                            }
                        </StyledRow>
                    );
                })}
            </tbody>
        </StyledTable>
    );
};

export default ScheduleTable;
