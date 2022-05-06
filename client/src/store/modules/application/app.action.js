import { SHOW_LOADING, HIDE_LOADING } from "./app.types";

export const showLoader = () => ({ type: SHOW_LOADING });
export const hideLoader = () => ({ type: HIDE_LOADING });
