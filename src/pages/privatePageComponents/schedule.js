import React from 'react';
import axios from 'axios';
import ScheduleForm from './scheduleForm';
import ScheduleTable from '../../scheduleTable';
import styled from 'styled-components';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;
  border: 1px solid grey;
  padding-bottom: 5px;
`;

const Schedule = () => {
  const [schedules, setSchedules] = React.useState([]);

  React.useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const response = await axios.get('http://localhost:3000/hourly');
    setSchedules(response.data);
  };

  const handleFormSubmit = async (day, scheduleData) => {
    console.log(day, scheduleData)
    try {
      const response = await axios.put(`http://localhost:3000/hourly/${day}`, scheduleData, { params: { _: new Date().getTime() } });
      if (response.status === 200) {
        fetchSchedules();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScheduleContainer>
      <h3>Gestion des horaires</h3>
      <ScheduleTable data={schedules} />
      <ScheduleForm onSubmit={handleFormSubmit} />
    </ScheduleContainer>
  );
};

export default Schedule;
