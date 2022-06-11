import { useEffect, useState } from "react";
import styled from "styled-components";
import Buttons from "./components/Buttons";
import Preview from "./components/Preview";
import { motion } from "framer-motion";
import DarkMode from "./components/DarkMode";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./themes";
import useKeyboard from "./hooks/useKeyboard";
import ViteLogo from "./components/ViteLogo";

const buttonsValues = [
  {
    id: 0,
    value: "C",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 1,
    value: "%",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 3,
    value: "/",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 4,
    value: "Backspace",
    icon: true,
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 5,
    value: "7",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 6,
    value: "8",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 7,
    value: "9",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 8,
    value: "*",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 9,
    value: "4",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 10,
    value: "5",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 11,
    value: "6",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 12,
    value: "-",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 13,
    value: "1",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 14,
    value: "2",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 15,
    value: "3",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 16,
    value: "+",
    sign: true,
    styles: {
      dark: {
        color: "#7ba598",
        background: "#dff0ea",
      },
      light: {
        color: "#e9e9e9",
        background: "#323232",
      },
    },
  },
  {
    id: 17,
    value: "+/-",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 18,
    value: "0",
    styles: {
      dark: {
        color: "#727272",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 19,
    value: ".",
    styles: {
      dark: {
        color: "#5a5a5a",
        background: "#f0f0f0",
      },
      light: {
        color: "#bcbcbc",
        background: "inherit",
      },
    },
  },
  {
    id: 20,
    value: "=",
    sign: true,
    styles: {
      dark: {
        color: "#c35e73",
        background: "#eed0d5",
      },
      light: {
        color: "#cbcbcb",
        background: "#696969",
      },
    },
  },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [animatedKeyPress, setAnimatedKeyPress] = useState("");

  // const changeValueOnKeyPress = (e) => {
  //   const keyPress = e.key;
  //   setAnimatedKeyPress(e.key);
  //   if (
  //     !isNaN(keyPress) &&
  //     parseInt(valuePreview) < 10000000000000 &&
  //     keyPress != " "
  //   ) {
  //     setValuePreview(
  //       valuePreview == "0" ? keyPress : (prev) => prev + keyPress
  //     );
  //   } else if (keyPress === "Backspace") {
  //     if (valuePreview.toString().length <= 1) {
  //       setValuePreview(0);
  //     } else {
  //       setValuePreview(valuePreview.toString().slice(0, -1));
  //     }
  //   } else if (keyPress === ",") {
  //     setValuePreview((prev) => prev + keyPress);
  //   } else if (operators.includes(keyPress)) {
  //     setValuePreview((prev) => prev + keyPress);
  //   } else if (keyPress === "Enter") {
  //     setAnimatedKeyPress("=");
  //     try {
  //       if (valuePreview.toString().includes("%")) {
  //         const value1 = valuePreview
  //           .toString()
  //           .substring(0, valuePreview.toString().indexOf("%"))
  //           .replace(",", ".");
  //         const value2 = valuePreview
  //           .toString()
  //           .substring(
  //             valuePreview.toString().indexOf("%") + 1,
  //             valuePreview.length
  //           )
  //           .replace(",", ".");

  //         setValuePreview(value2 * (value1 / 100));
  //       } else {
  //         setValuePreview(eval(valuePreview.toString().replaceAll(",", ".")));
  //       }
  //     } catch (error) {
  //       setValuePreview(0);
  //     }
  //   } else if (keyPress === "Escape") {
  //     setValuePreview(0);
  //     setAnimatedKeyPress("C");
  //   }
  // };

  // const equals = (e) => {
  //   // if (e === "Enter") {
  //   //   setTotal(true);
  //   //   setPreview((prev) => prev + curState + "=");
  //   // }
  //   let cal;
  //   switch (operator) {
  //     case "/":
  //       cal = String(parseFloat(preState) / parseFloat(curState));
  //       break;

  //     case "+":
  //       cal = String(parseFloat(preState) + parseFloat(curState));
  //       break;
  //     case "*":
  //       cal = String(parseFloat(preState) * parseFloat(curState));
  //       break;
  //     case "-":
  //       cal = String(parseFloat(preState) - parseFloat(curState));
  //       break;
  //     default:
  //       return;
  //   }
  //   setInput("0");
  //   setCurState("");
  //   setPreState(cal);
  //   setPreview(cal + e);
  // };

  // const changeValueOnKeyPress = (e) => {
  //   if (!isNaN(e.key)) {
  //     if (curState.includes(".") && e.key === ".") return;
  //     if (total) {
  //       setPreState("");
  //       setPreview("");
  //     }

  //     curState ? setCurState((pre) => pre + e.key) : setCurState(e.key);
  //     setTotal(false);
  //   } else if (operators.includes(e.key)) {
  //     setTotal(false);
  //     setOperator(e.key);
  //     if (curState === "") return;
  //     if (preState !== "") {
  //       equals(e.key);
  //     } else {
  //       setPreState(curState);
  //       setCurState("");
  //       setPreview(`${curState}${e.key}`);
  //     }
  //   } else if (e.key == "Enter") {
  //     setTotal(true);
  //     if (total) return;
  //     setPreview((prev) => prev + curState + " =");
  //     let cal;
  //     switch (operator) {
  //       case "/":
  //         cal = String(parseFloat(preState) / parseFloat(curState));
  //         break;

  //       case "+":
  //         cal = String(parseFloat(preState) + parseFloat(curState));
  //         break;
  //       case "*":
  //         cal = String(parseFloat(preState) * parseFloat(curState));
  //         break;
  //       case "-":
  //         cal = String(parseFloat(preState) - parseFloat(curState));
  //         break;
  //       default:
  //         return;
  //     }
  //     setInput("0");
  //     setCurState("");
  //     setPreState(cal);
  //   } else if (e.key === "%") {
  //     if (preState) {
  //       setCurState(String((parseFloat(curState) / 100) * preState));
  //       setTotal(true);
  //     } else {
  //       setCurState("0");
  //       setPreview("0");
  //       setTotal(true);
  //     }
  //   } else if (e.key === "Escape") {
  //     setCurState("");
  //     setPreState("");
  //     setPreview("");
  //     setInput("0");
  //   } else if (e.key === "Backspace") {
  //     if (curState.toString().length < 1) {
  //       setInput("0");
  //       setPreview("");
  //     } else {
  //       setCurState((prev) => prev.toString().slice(0, -1));
  //     }
  //   } else if (e.key === ".") {
  //     curState ? setCurState((pre) => pre + e.key) : setCurState("0" + e.key);
  //     setTotal(false);
  //   }
  // };

  // useEffect(() => {
  //   setInput(curState);
  // }, [curState]);

  // useEffect(() => {
  //   setInput("0");
  // }, []);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    if (theme === "light") {
      localStorage.setItem("mode-window", "dark");
    } else {
      localStorage.setItem("mode-window", "light");
    }
  };

  const modeWindow = () => {
    if (localStorage.getItem("mode-window") === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    modeWindow();
  }, []);

  const { handleKeyPress } = useKeyboard();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <GlobalContainer onKeyDown={handleKeyPress} tabIndex={0}>
        <ViteLogo />
        <ContainerCalculator
          className="container-calculator__theme"
          animate={{ opacity: [0, 1], y: ["-50px", "0px"] }}
        >
          <DarkMode toggler={themeToggler} theme={theme} />
          <Preview />
          <ContainerButtons>
            {buttonsValues.map((button) => (
              <Buttons
                value={button}
                key={button.id}
                theme={theme}
                animatedKeyPress={animatedKeyPress}
              />
            ))}
          </ContainerButtons>
        </ContainerCalculator>
      </GlobalContainer>
    </ThemeProvider>
  );
}
export default App;

const GlobalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  position: relative;
  @media (max-width: 330px) {
    padding: 0 14px;
  }
  @media (max-width: 250px) {
    padding: 0 9px;
  }
`;

const ContainerCalculator = styled(motion.div)`
  width: 330px;
  height: 520px;
  border-radius: 19px;
  box-shadow: 0px 0px 20px 12px #30303067;
  display: flex;
  flex-direction: column;
  padding-top: 35px;
  overflow-x: hidden;
  @media (max-width: 330px) {
    height: 480px;
  }
`;

const ContainerButtons = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(30px, 1fr));
  gap: 8px;
  @media (max-width: 330px) {
    padding: 10px 15px;
  }
  @media (max-width: 250px) {
    padding: 10px 10px;
  }
`;
