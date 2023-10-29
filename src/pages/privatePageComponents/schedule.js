import React from 'react';
import axios from 'axios';
import ScheduleForm from './scheduleForm';
import ScheduleTable from '../../scheduleTable';
import styled from 'styled-components';
import API_BASE_URL from '../../apiConfig';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;
  border: 1px solid grey;
  padding-bottom: 5px;
`;

const Schedule = () => {
  let refreshTableData;

  const handleFormSubmit = async (day, scheduleData) => {
    console.log(day, scheduleData)
    try {
      const response = await axios.put(`${API_BASE_URL}hourly/${day}`, scheduleData, { params: { _: new Date().getTime() } });
      if (response.status === 200) {
        if (refreshTableData) refreshTableData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScheduleContainer>
      <h3>Gestion des horaires</h3>
      <ScheduleTable onRefresh={refresh => { refreshTableData = refresh; }} />
      <ScheduleForm onSubmit={handleFormSubmit} />
    </ScheduleContainer>
  );
};

export default Schedule;
