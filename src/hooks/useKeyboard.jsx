import { useCalc } from "../context/calcContext";

const useKeyboard = () => {
  const { calc, setCalc } = useCalc();

  const commaClick = (keyPress) => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + keyPress : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };

  const handleClick = (keyPress) => {
    if (!isNaN(keyPress)) {
      const numString = keyPress.toString();

      let numValue;
      if (numString === "0" && calc.num === 0) {
        numValue = "0";
      } else {
        numValue = Number(calc.num + numString);
      }

      setCalc({
        ...calc,
        num: numValue,
      });
    } else return;
  };

  const signClick = ( keyPress ) => {
    setCalc({
      sign: keyPress,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const deleteClick = () => {
    setCalc({
      ...calc,
      num: calc.num ? Number(calc.num.toString().slice(0, -1)) : calc.num,
    });
  };

  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = ({ keyPress }) => {
    const results = {
      ".": commaClick,
      Escape: resetClick,
      "/": signClick,
      "*": signClick,
      "-": signClick,
      "+": signClick,
      Enter: equalsClick,
      "%": percentClick,
      "+/-": invertClick,
      Backspace: deleteClick,
    };
    if (results[keyPress]) {
      return results[keyPress](keyPress);
    } else {
      handleClick(parseInt(keyPress));
    }
  };

  const handleKeyPress = (e) => {
    const keyPress = e.key;

    handleBtnClick({ keyPress: keyPress });
  };

  return {
    handleKeyPress,
  };
};

export default useKeyboard;
