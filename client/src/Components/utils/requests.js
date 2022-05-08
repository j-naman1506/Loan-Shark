export const SITE_URL = process.env.REACT_APP_SITE_URL;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requests = {
  doRegister: "/auth/add-user/",
  doLogin: "/auth/login/",
  doOAuthLogin: "/auth/social/google-oauth2/",
  getDocuments: "/api/document",
  getBankDetails: "/api/document",
};
