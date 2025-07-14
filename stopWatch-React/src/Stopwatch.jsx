import { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  const formatTime = (ms) => {
    const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const start = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    // Cleanup do timer se o componente for desmontado
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div id="container">
      <div id="display">{formatTime(elapsedTime)}</div>
      <div id="controls">
        <button id="startBtn" onClick={start}>Start</button>
        <button id="stopBtn" onClick={stop}>Stop</button>
        <button id="resetBtn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
