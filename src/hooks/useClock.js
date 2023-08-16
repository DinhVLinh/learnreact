import { useEffect, useState } from "react";

function formartTime(date) {
  if (!date) return;
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}
function useClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const date = new Date();
      const newTimeString = formartTime(date);
      setTimeString(newTimeString);
    }, 1000);

    return () => {
      // CLEAN UP
      console.log("Clock clean up");
      clearInterval(clockInterval);
    };
  }, []);

  return { timeString };
}

export default useClock;
