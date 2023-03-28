export const avatarList = [
  "https://bit.ly/3xH2g5w",
  "https://bit.ly/3SiDDpr",
  "https://bit.ly/3IkTHCh",
  "https://bit.ly/3Ku601K",
  "https://bit.ly/3IquAOD",
  "https://bit.ly/41j3GAD",
];

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://doutankyohi-1-m6114301.deta.app/";

export const INTERVAL = 10000;

export const IS_AUTO_REQUEST =
  process.env.NODE_ENV === "development" ? false : true;

export const MAX_AUTO_HTTP_REQUEST = 20;
