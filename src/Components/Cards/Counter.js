import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoaderCSS from '../Loader';

const Clock = ({ deadline }) => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const leading0 = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = deadline - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };


  useEffect(() => {
    if(deadline){
      setInterval(() => getTimeUntil(deadline), 1000);
    }
  }, [deadline]);

  console.log("deadline",days)

  return (
    <Root>
      {days> 0 || minutes > 0 || hours > 0 || seconds > 0 ? (
            <div className="clock">
            {leading0(days)}D{' : '}
            {leading0(hours)}H{' : '}
            {leading0(minutes)}M{' : '}
            {leading0(seconds)}S
          </div>
          ) : (
            <>
            {days == 0 && minutes == 0 && hours == 0 && seconds == 0?
            <div className="clock-over">Time Over</div>:
            <LoaderCSS/>}
            </>
          )}
    </Root>
  );
};

export default Clock;

const Root = styled.section``;
