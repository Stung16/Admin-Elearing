"use client";
import React from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";

const Test = () => {
  return (
    <div>
      <MDEditor.Markdown
        source={"**thisabc**"}
        style={{ whiteSpace: "pre-wrap" }}
      />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/6B6MHJiA_kc?si=pRGEvNoMo8RgHMie"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Test;
