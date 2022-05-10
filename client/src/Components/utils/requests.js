export const SITE_URL = process.env.REACT_APP_SITE_URL;
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const requests = {
  doRegister: "/auth/add-user/",
  doLogin: "/auth/login/",
  editProfile: "/auth/profile/",
  doOAuthLogin: "/auth/social/google-oauth2/",
  getDocuments: "/api/document/",
  getBankDetails: "/api/account/",
  createApplication: "/api/application/",
  acceptOffer: "/api/offer/",
  getMyApplications: "/api/application/me/",
  makeOffer: "/api/offer/make-offer/",
  getOffers: "/api/offer/",
  getDues: "/api/bill/",
  payEmi: "/api/bill/",
  logout: "/auth/logout/",
};