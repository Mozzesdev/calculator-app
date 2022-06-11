import styled from "styled-components";
import { motion } from "framer-motion";
import { useCalc } from "../context/calcContext";

const Buttons = ({ animatedKeyPress, value, theme }) => {
  const { calc, setCalc } = useCalc();

  const buttonsDark = value.styles?.dark;
  const buttonsLight = value.styles?.light;

  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".")
        ? calc.num + value.value
        : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };

  const handleClick = () => {
    const numString = value.value.toString();

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
  };

  const signClick = () => {
    setCalc({
      sign: value.value,
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

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      "*": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": percentClick,
      "+/-": invertClick,
      Backspace: deleteClick,
    };
    if (results[value.value]) {
      return results[value.value]();
    } else {
      return handleClick();
    }
  };

  return (
    <Inputs
      transition={{ duration: 0, ease: "linear" }}
      onClick={handleBtnClick}
      icon={value.icon && value.icon}
      theme={theme}
      darkStyles={buttonsDark}
      lightStyles={buttonsLight}
    >
      <p>
        {value.value != "Backspace" ? (
          value.value
        ) : (
          <svg
            width="24px"
            height="25px"
            viewBox="2.5 0 15 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="matrix(0 -1 1 0 2.5 15.5)"
            >
              <path d="m0 5.82842712v7.17157288c0 1.1045695.8954305 2 2 2h6c1.1045695 0 2-.8954305 2-2v-7.17157288c0-.53043297-.21071368-1.0391408-.58578644-1.41421356l-3.70710678-3.70710678c-.39052429-.39052429-1.02368927-.39052429-1.41421356 0l-3.70710678 3.70710678c-.37507276.37507276-.58578644.88378059-.58578644 1.41421356z" />
              <g transform="matrix(0 1 -1 0 14 4)">
                <path d="m3 11 4-4" />
                <path d="m3 7 4 4" />
              </g>
            </g>
          </svg>
        )}
      </p>
    </Inputs>
  );
};

export default Buttons;

const Inputs = styled(motion.div)`
  display: grid;
  place-items: center;
  cursor: pointer;
  margin: 0 auto;
  user-select: none;
  text-align: center;
  width: 100%;
  max-width: 60px;
  max-height: 60px;
  transition: all ease 0.3s;
  font-size: 19px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.theme === "dark"
      ? props.lightStyles?.background
      : props.darkStyles?.background};
  :hover {
    background-color: ${(props) =>
      props.theme === "dark"
        ? props.darkStyles?.background
        : props.lightStyles?.background};
    p {
      color: ${(props) =>
        props.theme === "dark"
          ? props.darkStyles?.color
          : props.lightStyles?.color};
    }
  }
  p {
    color: ${(props) =>
      props.theme === "dark"
        ? props.lightStyles?.color
        : props.darkStyles?.color};
  }
  @media (max-width: 330px) {
    font-size: 15px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
`;
