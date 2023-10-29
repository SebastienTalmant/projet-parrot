import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import API_BASE_URL from './apiConfig';

const StyledTable = styled.table`
  width: 50vw;
  max-width: 512px;
  @media (max-width: 767px) {
    width: 100vw;
  }
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

const ScheduleTable = ({ onRefresh }) => {
  const [data, setData] = useState([]);
    
  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}hourly`);
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires.", error);
      }
    };
    const refreshData = () => {
      fetchData();
    };

    useEffect(() => {
      if (onRefresh) {
        onRefresh(refreshData);
      }
    }, [onRefresh]);

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
