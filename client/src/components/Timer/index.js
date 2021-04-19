import React, {useEffect, useState} from "react";
import {Text} from "@chakra-ui/react";

const index = ({endDate}) => {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);

  const countDownDate = new Date(endDate).getTime();
  console.log(countDownDate);
  useEffect(() => {
    const interval = setInterval(() => {
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      setDaysRemaining(days);

      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHoursRemaining(hours);

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setMinutesRemaining(minutes);

      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setSecondsRemaining(seconds);

      return () => clearInterval(interval);
    }, 1000);
  }, []);
  return (
    <div style={timer}>
      {daysRemaining > 0 && <span>{daysRemaining}D </span>} {hoursRemaining > 0 && <span>{hoursRemaining}H </span>}
      {minutesRemaining > 0 && <span>{minutesRemaining}M </span>}
      {secondsRemaining > 0 && <span>{secondsRemaining}S </span>}
    </div>
  );
};

const timer = {
    fontSize: "1.6rem",
    fontFamily: "Roboto",
    fontWeight: "400",
    marginTop: "1rem"
}

export default index;
