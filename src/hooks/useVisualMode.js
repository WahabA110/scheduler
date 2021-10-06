import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    setHistory(prev => {

      const newHistory = [...prev];

      if (replace) {
        newHistory.pop()
      }

      newHistory.push(newMode)

      return newHistory;
    })
  }

  const back = () => {

    setHistory((prev) => {
      const revertHistory = [...prev];

      if (revertHistory.length > 1){
        revertHistory.pop();
      }

      setMode(revertHistory[revertHistory.length - 1]);

      return revertHistory;
    })


  }

  return { mode, transition, back };
}
