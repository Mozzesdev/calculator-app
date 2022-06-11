import { createContext, useContext, useState } from "react";

const calcContext = createContext({});

export const useCalc = () => {
  const context = useContext(calcContext);
  return context;
};

export const CalcProvider = ({ children }) => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  const [calcPrev, setCalcPrev] = useState();

  return (
    <calcContext.Provider value={{ calc, setCalc, calcPrev, setCalcPrev }}>
      {children}
    </calcContext.Provider>
  );
};
