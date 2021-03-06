// 0xGG Team
// Distributed under AGPL3
//
// DESCRIPTION: This widget displays time related information
import React from "react";
import ReactDOM from "react-dom";
import { WidgetArgs, WidgetCreator } from "vickymd/widget";
import { ErrorWidget } from "vickymd/widget/error/error";
import { useTheme, ThemeProvider } from "@material-ui/core";
import { crossnoteTheme } from "../../../util/theme";

function Timer(props: WidgetArgs) {
  const attributes = props.attributes;
  const theme = useTheme();

  return (
    <div
      style={{
        cursor: "default",
        padding: "4px 12px",
        backgroundColor:
          attributes["backgroundColor"] ||
          theme.palette.secondary.main ||
          "rgb(250, 145, 1)",
        color:
          attributes["color"] || theme.palette.secondary.contrastText || "#fff",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "space-between",
        width: "375px",
        maxWidth: "100%",
        boxShadow: "0 1px 3px 1px #aaa",
        marginBottom: props.isPreview ? "16px" : "0",
      }}
    >
      <div className={"widget-timer-date"}>
        {"⌚ " + new Date(attributes["date"]).toLocaleString()}
      </div>
      <div className={"widget-timer-duration"}>
        {attributes["duration"] ? "🎬 " + attributes["duration"] : ""}
      </div>
    </div>
  );
}

export const TimerWidgetCreator: WidgetCreator = (args) => {
  const el = document.createElement("span");
  if (!args.attributes["date"]) {
    return ErrorWidget({
      ...args,
      ...{
        attributes: {
          message: "Field 'date' is missing",
        },
      },
    });
  }
  ReactDOM.render(
    <ThemeProvider theme={crossnoteTheme}>
      <Timer attributes={args.attributes} isPreview={args.isPreview}></Timer>
    </ThemeProvider>,
    el
  );
  return el;
};
