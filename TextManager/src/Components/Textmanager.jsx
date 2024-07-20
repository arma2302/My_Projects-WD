import React, { useState } from "react";

export default function Textmanager() {
  const [text, setText] = useState("");
  const [display, setDisplay] = useState("");

  const handleInput = (e) => {
    document.querySelector(".loader-wrap").style.display = "none";
    console.log("hii");
    setText(e.target.value);
    setDisplay(text);
  };

  // uppercase

  const handleUpperCase = () => {
    setDisplay(text.toUpperCase());
    // setText("");
  };
  const handleLowerCase = () => {
    setDisplay(text.toLowerCase());
    // setText("");
  };

  const handlecapital = () => {
    const words = text.split(" ");
    let singlewords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    let newtext = singlewords.join(" ");
    setDisplay(newtext);
    // setText("");
  };

  const handleCharCount = () => {
    setDisplay("Total :" + text.length + "Characters");
    // setText("");
  };

  const handleWordCount = () => {
    let word = text.split(" ");
    setDisplay("Total :" + word.length + "Word");
    // setText("");
  };

  const handleReverseOrder = () => {
    let words = text.split(" ");
    setDisplay(words.reverse().join(" "));
    // setText("");
  };
  const handleReset = () => {
    setText("");
    setDisplay("");
    document.querySelector(".loader-wrap").style.display = "block";
  };
  return (
    <div className="main-warp">
      <div className="inp-wrap w-50">
        {/* input */}
        <div className="inner-wrap">
          <p>Enter Text:</p>
          <div className="input-container">
            <input className="input" value={text} type="text" onInput={handleInput} />
            {/* <label className="label" htmlFor="input">
            Enter Text Here
          </label> */}
            <div className="topline"></div>
            <div className="underline"></div>
          </div>
          {/* buttons */}
          <div className="btn-wrap">
            <button onClick={handleUpperCase}>Uppercase</button>
            <button onClick={handleLowerCase}>Lowercase</button>
            <button onClick={handlecapital}>Capitlize</button>
            <button onClick={handleCharCount}> Char Count</button>
            <button onClick={handleWordCount}>word Count</button>
            <button onClick={handleReverseOrder}>Reverse order</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      <div className="preview-wrap w-50">
        <div className="inner-preview">
          <h2>{display}</h2>
          <div className="loader-wrap">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
