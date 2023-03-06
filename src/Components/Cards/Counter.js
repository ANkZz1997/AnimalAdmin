import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Clock = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const leading0 = (num) => {
    return num < 10 ? '0' + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
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
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline]);

  return (
    <Root>
      {deadline?.length < 5 ? (
        <>
          <h1>Loader</h1>
        </>
      ) : (
        <>
          {days == 0 && minutes == 0 && hours == 0 && seconds == 0 ? (
            <div className="clock-over">Time Over</div>
          ) : (
            <>
              <div className="clock">
                {leading0(days)}D{' : '}
                {leading0(hours)}H{' : '}
                {leading0(minutes)}M{' : '}
                {leading0(seconds)}S
                {/* <div className="clock-hours">
                </div>
                <div className="clock-minutes">
                </div>
                <div className="clock-seconds">
                </div> */}
              </div>
              <div className="clock-titles"></div>
            </>
          )}
        </>
      )}
    </Root>
  );
};

export default Clock;

const Root = styled.section``;
