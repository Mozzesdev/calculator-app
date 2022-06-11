import React from "react";
import { Textfit } from "react-textfit";
import styled from "styled-components";
import { useCalc } from "../context/calcContext";

const Preview = () => {
  const { calc, signPrev } = useCalc();

  const num = calc.num == 0 ? "" : calc.num;

  return (
    <Container>
      <PreviewCalc>
        <p className="preview-calc__theme">
          {calc.res && calc.sign ? `${calc.res}${calc.sign}${num}` : ""}
        </p>
        <h2>
          <Textfit max={36} className="preview-calc__text" mode="single">
            {calc.num ? calc.num : calc.res}
          </Textfit>
        </h2>
      </PreviewCalc>
    </Container>
  );
};

export default Preview;

const Container = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: flex-end;
`;

const PreviewCalc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 25px 25px 40px;
  text-align: right;
  overflow-y: hidden;
  min-height: 84px;
  .preview-calc__theme {
    font-size: 13px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 36px;
    text-align: center;
  }
  @media (max-width: 330px) {
    .preview-calc__theme {
      font-size: 12px;
      margin-bottom: 4px;
    }
    padding-right: 18px;
  }
`;
