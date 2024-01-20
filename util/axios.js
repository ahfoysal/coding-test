import axios from "axios";
const API = axios.create({ baseURL: "https://contact.mediusware.com/api/" });

const getAllContactsReq = (payload) => {
  if (payload?.search) {
    return API.get(`/contacts/?search=${payload?.search}`);
  } else {
    return API.get(`/contacts/`);
  }
};
const getUSCountryReq = (payload) => {
  if (payload?.search) {
    return API.get(
      `/country-contacts/United States/?search=${payload?.search}`
    );
  } else {
    return API.get(`/country-contacts/United States/`);
  }
};

export const AppService = {
  getAllContactsReq,
  getUSCountryReq,
};
