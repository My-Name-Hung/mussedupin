import React from "react";
import "./CommingSoon.css";
import TranslatedText from "./TranslatedText";

const CommingSoon = () => (
  <div className="comming-soon-page">
    <div className="comming-soon-content">
      <h1>
        <TranslatedText>Coming Soon</TranslatedText>
      </h1>
      <p>
        <TranslatedText>
          Chức năng này sẽ sớm được cập nhật, vui lòng quay lại sau, Musée Du
          Pin xin cảm ơn!
        </TranslatedText>
      </p>
    </div>
  </div>
);

export default CommingSoon;
