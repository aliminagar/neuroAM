import React, { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after minimum time and when page is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show for at least 2 seconds

    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null; // Don't render anything when not loading
  }

  return (
    <div id="preloader" className={isLoading ? "" : "fade-out"}>
      <section className="container">
        <section className="loader">
          <article style={{ "--rot": 0 }} className="sphere sphere1">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 1 }} className="sphere sphere2">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 2 }} className="sphere sphere3">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 3 }} className="sphere sphere4">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 4 }} className="sphere sphere5">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 5 }} className="sphere sphere6">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 6 }} className="sphere sphere7">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 7 }} className="sphere sphere8">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
          <article style={{ "--rot": 8 }} className="sphere sphere9">
            <div className="item" style={{ "--rot-y": 1 }}></div>
            <div className="item" style={{ "--rot-y": 2 }}></div>
            <div className="item" style={{ "--rot-y": 3 }}></div>
            <div className="item" style={{ "--rot-y": 4 }}></div>
            <div className="item" style={{ "--rot-y": 5 }}></div>
            <div className="item" style={{ "--rot-y": 6 }}></div>
            <div className="item" style={{ "--rot-y": 7 }}></div>
            <div className="item" style={{ "--rot-y": 8 }}></div>
            <div className="item" style={{ "--rot-y": 9 }}></div>
          </article>
        </section>
      </section>
    </div>
  );
};

export default Preloader;
