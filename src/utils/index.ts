import moment from "moment-jalaali";
import { IBreadcrumb, IFile, IFolder } from "../interface";

export const toPersinaDigit = (digits: number | string): string => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return digits.toString().replace(/\d/g, (w) => {
    return fa[+w];
  });
};

export const FaDate = (standardTime: string) => {
  try {
    moment.loadPersian({
      dialect: "persian-modern",
    });
    return toPersinaDigit(moment(standardTime, "YYYY-MM-DDTHH:mm:ssZ").format("HH:mm:ss | jDD jMMMM jYYYY"));
  } catch {
    return "-";
  }
};

export const FaDateFromTimestamp = (timestamp: number) => {
  const newDate = new Date(timestamp);
  try {
    const standardTime = `${newDate.getFullYear()
    }-${
      (`0${newDate.getMonth() + 1}`).slice(-2)
    }-${
      (`0${newDate.getDate()}`).slice(-2)
    }T${
      (`0${newDate.getHours()}`).slice(-2)
    }:${
      (`0${newDate.getMinutes()}`).slice(-2)
    }:${
      (`0${newDate.getSeconds()}`).slice(-2)}`;
    return FaDate(standardTime);
  } catch {
    return "-";
  }
};

export const logger = (key: string, newValue: any, oldValue: any) => {
    console.log(`############################################################################  ${key}`);
    console.log("newValue -->", newValue);
    console.log("oldValue -->", oldValue);
    console.log("####################################################################################");
};

export const getColor = (type: string) => {
  if (
    type === "png"
    || type.includes("jpeg")
    || type.includes("jpg")
    || type.includes("image")
  ) {
    return "#F47C7C";
  }
  if (type.includes("pdf")) return "#FF4949";
  if (type.includes("txt")) return "#36AE7C";
  if (type.includes("audio") || type.includes("mp3")) return "#646FD4";
  if (type.includes("mp4")) return "#FF5F00";
  return "#4C3575";
};

export const isFolder = (item: IFile | IFolder | IBreadcrumb): item is IFolder => {
  return ("type" in item && item.type === "application/vnd.podspace.folder");
}