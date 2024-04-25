import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    };
  }, [timeRemaining]); // Include timeRemaining as a dependency for useEffect

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining for the next question
      onAnswered(false); // Notify the parent component that time is up
    }
  }, [timeRemaining, onAnswered]); // Include timeRemaining and onAnswered as dependencies for useEffect

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timeRemaining on answer
    onAnswered(isCorrect); // Notify the parent component about the answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
