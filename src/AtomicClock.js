import React, { useState, useEffect } from "react";

const AtomicClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 50); // Update every 50ms for smooth milliseconds

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", { hour12: false });
  };

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getMilliseconds = (date) => {
    return date.getMilliseconds().toString().padStart(3, "0");
  };

  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
  };

  const clockStyle = {
    position: "absolute",
    top: "25px",
    right: "25px",
    background: "rgba(0, 0, 0, 0.9)",
    border: "2px solid #61dca3",
    borderRadius: "12px",
    padding: "15px",
    boxShadow:
      "0 0 25px rgba(97, 220, 163, 0.5), inset 0 0 15px rgba(97, 220, 163, 0.1)",
    backdropFilter: "blur(10px)",
    fontFamily: "'Courier New', monospace",
    zIndex: 20,
    minWidth: "220px",
    textAlign: "center",
    animation: "borderGlow 3s ease-in-out infinite alternate",
  };

  const labelStyle = {
    color: "#61dca3",
    fontSize: "0.7rem",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textShadow: "0 0 8px rgba(97, 220, 163, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  };

  const mainTimeStyle = {
    color: "#ffffff",
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: "8px 0",
    textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
    fontFamily: "'Courier New', monospace",
  };

  const dateStyle = {
    color: "#61b3dc",
    fontSize: "0.9rem",
    margin: "5px 0",
    textShadow: "0 0 8px rgba(97, 179, 220, 0.6)",
  };

  const millisecondsStyle = {
    color: "#ff6b6b",
    fontSize: "0.8rem",
    marginBottom: "10px",
    textShadow: "0 0 8px rgba(255, 107, 107, 0.6)",
  };

  const precisionGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginTop: "10px",
  };

  const timeUnitStyle = {
    background: "rgba(97, 220, 163, 0.1)",
    border: "1px solid rgba(97, 220, 163, 0.3)",
    borderRadius: "6px",
    padding: "6px",
    textAlign: "center",
  };

  const unitLabelStyle = {
    color: "#61dca3",
    fontSize: "0.6rem",
    textTransform: "uppercase",
    marginBottom: "2px",
  };

  const unitValueStyle = {
    color: "#ffffff",
    fontSize: "0.8rem",
    fontWeight: "bold",
    textShadow: "0 0 6px rgba(255, 255, 255, 0.6)",
  };

  const syncIndicatorStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8px",
    gap: "6px",
  };

  const syncDotStyle = {
    width: "6px",
    height: "6px",
    background: "#61dca3",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  };

  const syncTextStyle = {
    color: "#61dca3",
    fontSize: "0.6rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  return (
    <>
      <style>
        {`
          @keyframes borderGlow {
            0% { box-shadow: 0 0 25px rgba(97, 220, 163, 0.5), inset 0 0 15px rgba(97, 220, 163, 0.1); }
            100% { box-shadow: 0 0 35px rgba(97, 220, 163, 0.8), inset 0 0 20px rgba(97, 220, 163, 0.2); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
        `}
      </style>

      <div style={clockStyle}>
        <div style={labelStyle}>
          <span>⚛️</span>
          <span>Atomic Clock</span>
        </div>

        <div style={mainTimeStyle}>{formatTime(currentTime)}</div>

        <div style={dateStyle}>{formatDate(currentTime)}</div>

        <div style={millisecondsStyle}>{getMilliseconds(currentTime)} ms</div>

        <div style={precisionGridStyle}>
          <div style={timeUnitStyle}>
            <div style={unitLabelStyle}>Unix</div>
            <div style={unitValueStyle}>
              {getUnixTimestamp(currentTime).toLocaleString()}
            </div>
          </div>
          <div style={timeUnitStyle}>
            <div style={unitLabelStyle}>Day</div>
            <div style={unitValueStyle}>{getDayOfYear(currentTime)}</div>
          </div>
        </div>

        <div style={syncIndicatorStyle}>
          <div style={syncDotStyle}></div>
          <div style={syncTextStyle}>Synchronized</div>
        </div>
      </div>
    </>
  );
};

export default AtomicClock;
