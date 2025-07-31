import React from "react";
import { useRef, useEffect, useState } from "react";
import "./App.css";
import resumePDF from "./assets/resume.pdf";
import profileImage from "./images/image.jpg";
import logo from "./images/Glitch.png";
import Preloader from "./Preloader.js";
import AtomicClock from "./AtomicClock.js";

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);

    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    overflow: "hidden",
  };

  const canvasStyle = {
    display: "block",
    width: "100%",
    height: "100%",
  };

  const outerVignetteStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
  };

  const centerVignetteStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background:
      "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default App;

function App() {
  const [showEducation, setShowEducation] = useState(false);
  const [showButtonPreloader, setShowButtonPreloader] = useState(false);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showButtonPreloader && <Preloader />}

      {/* Background LetterGlitch - positioned absolutely behind everything */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* Logo in top-left corner */}
      <div
        style={{
          position: "absolute",
          top: "25px",
          left: "50px",
          zIndex: 15,
        }}
      >
        <img
          src={logo}
          alt="Neuro Glitch Logo"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "4px solid #61dca3",
            boxShadow: "0 0 25px rgba(97, 220, 163, 0.5)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "rotate(10deg) scale(1.1)";
            e.target.style.boxShadow = "0 0 35px rgba(97, 220, 163, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "rotate(0deg) scale(1)";
            e.target.style.boxShadow = "0 0 25px rgba(97, 220, 163, 0.5)";
          }}
        />
      </div>

      <AtomicClock />

      {/* Main content - using flexbox centering */}
      <div
        style={{
          position: "relative", // Changed from absolute
          color: "white",
          textAlign: "center",
          zIndex: 10,
          maxWidth: "900px",
          padding: "0 30px",
        }}
      >
        {/* TextTrail Title */}
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textShadow: "3px 3px 6px rgba(0,0,0,0.9)",
            marginBottom: "20px",
            color: "#61dca3",
          }}
        ></h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 20px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "3rem", margin: 0 }}>
            Welcome to Neuro Glitch
          </h1>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Alireza Minagar, MD, MBA, MS
          </h2>

          <h3
            style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "5px" }}
          >
            (Bioinformatics)
          </h3>

          <p style={{ fontSize: "1.6rem", marginTop: "10px" }}>
            Software Engineer
          </p>
        </div>

        <div
          style={{
            fontSize: "1.4rem",
            color: "#61dca3",
            fontStyle: "italic",
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            marginTop: "20px",
            lineHeight: "1.6",
            maxWidth: "700px",
            margin: "0 auto",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          "Where neural pathways meet neural networks, the future of medicine is
          coded. Bridging the synapses of human intuition with the algorithms of
          artificial intelligence."
        </div>

        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Left Column - First 4 buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <button
              className="glitch-button"
              style={{
                whiteSpace: "nowrap",
                padding: "10px 24px",
                minWidth: "160px",
                textAlign: "center",
                lineHeight: "1.2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60px",
              }}
              onClick={() => setShowEducation(!showEducation)}
            >
              MY EDUCATION
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open(
                    "https://pubmed.ncbi.nlm.nih.gov/?term=minagar",
                    "_blank"
                  );
                }, 1000);
              }}
            >
              PubMed
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open(
                    "https://www.linkedin.com/in/alireza-minagar-md-mba-ms-biotech-bioinformatics-b450aa173",
                    "_blank"
                  );
                }, 1000);
              }}
            >
              LinkedIn
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open("https://medium.com/@aminagar_38889", "_blank");
                }, 1000);
              }}
            >
              Medium
            </button>
          </div>

          {/* Center - Profile Image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={profileImage}
              alt="Dr. Alireza Minagar"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                border: "4px solid #61dca3",
                boxShadow:
                  "0 0 25px rgba(97, 220, 163, 0.4), 0 0 50px rgba(97, 220, 163, 0.2)",
                objectFit: "cover",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow =
                  "0 0 35px rgba(97, 220, 163, 0.6), 0 0 70px rgba(97, 220, 163, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow =
                  "0 0 25px rgba(97, 220, 163, 0.4), 0 0 50px rgba(97, 220, 163, 0.2)";
              }}
            />
          </div>

          {/* Right Column - Last 4 buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open("https://github.com/aliminagar", "_blank");
                }, 1000);
              }}
            >
              GitHub
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open(resumePDF, "_blank");
                }, 1000);
              }}
            >
              Resume
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                lineHeight: "1.1",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open(
                    "https://www.linkedin.com/newsletters/7331481504763555840/",
                    "_blank"
                  );
                }, 1000);
              }}
            >
              <span>LINKEDIN</span>
              <span>NEWSLETTER</span>
            </button>

            <button
              className="glitch-button"
              style={{
                height: "60px",
                minWidth: "160px",
              }}
              onClick={() => {
                setShowButtonPreloader(true);
                setTimeout(() => {
                  setShowButtonPreloader(false);
                  window.open(
                    "https://www.amazon.com/s?k=alireza+minagar&i=digital-text&crid=3K41MSI87EZRS&sprefix=%2Cdigital-text%2C120&ref=nb_sb_ss_recent_1_0_recent",
                    "_blank"
                  );
                }, 1000);
              }}
            >
              Amazon Books
            </button>
          </div>
        </div>
      </div>

      {/* Education Section - Fixed Position */}
      {showEducation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "2px solid #61dca3",
            borderRadius: "10px",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 20,
            boxShadow: "0 0 30px rgba(97, 220, 163, 0.3)",
          }}
        >
          <h3
            style={{
              color: "#61dca3",
              marginBottom: "15px",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            EDUCATION
          </h3>
          <ul
            style={{
              textAlign: "left",
              color: "#e0e0e0",
              lineHeight: "1.6",
              listStyleType: "disc",
              paddingLeft: "20px",
            }}
          >
            <li>
              <strong>M.S. Software Engineering</strong> (Expected 2025),
              University of Maryland Global Campus
            </li>
            <li>
              <strong>M.S. Biotechnology – Bioinformatics</strong>, University
              of Maryland Global Campus (2021–2023)
            </li>
            <li>
              <strong>Post Graduate Certificate – AI & Machine Learning</strong>
              , University of Texas at Austin (2023)
            </li>
            <li>
              <strong>MBA</strong>, Louisiana State University, Shreveport
              (2015–2017)
            </li>
            <li>
              <strong>Fellowship – Clinical Neuroimmunology/MS</strong>,
              University of Miami (1999–2001)
            </li>
            <li>
              <strong>Neurology Residency</strong>, New York University
              (1996-1997), University of Miami (1997–1999)
            </li>
            <li>
              <strong>MD</strong>, Tehran University of Medical Sciences
              (1984–1991)
            </li>
          </ul>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              onClick={() => setShowEducation(false)}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #61dca3",
                color: "#61dca3",
                padding: "5px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          right: "20px",
          color: "yellow",
          fontSize: "0.9rem",
          textAlign: "right",
          opacity: "0.7",
          textShadow: "0 0 10px rgba(97, 220, 163, 0.3)",
          zIndex: 10,
        }}
      >
        © 2025 Created by Alireza Minagar • All Rights Reserved
      </div>
    </div>
  );
}
