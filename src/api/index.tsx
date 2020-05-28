import store from "@store";
import { loginUser, logoutUser } from "@store/User/UserActions";
import { User, UserCredentials, UserInfo } from "@store/User/UserTypes";
import url from "url";

export const API_URL = "http://192.168.7.73:9000/api/";

url.resolve(API_URL, "fill later");

export interface UserResponse {
  type: string;
  data: User;
}

export function fetchTimeout<T>(
  url: string,
  options: object,
  timeout = 10000
): Promise<Response | T> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response | T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

/** Dummy function atm, once I implement persistent storage I will replace. */
export function loadToken() {
  const dummyData: User = {
    id: "1",
    firstName: "Evan",
    lastName: "Legrand",
    email: "eleg@college",
    cell: "6127038623",
    address1: "place",
    address2: "",
    country: "USA",
    zipcode: "55419",
    city: "Minneapolis",
    state: "Minnesota",
  };
  setTimeout(() => {
    store.dispatch(logoutUser());
  }, 2000);
}

/** Dummy function atm, once I implement mock login API calls (and then real calls) I will replace */
export function login(cred: UserCredentials) {
  return fetchTimeout<Response>(url.resolve(API_URL, "login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: cred.email,
      password: cred.password,
    }),
  })
    .then((response: Response) => {
      return response.json();
    })
    .then((res) => {
      if (res.type == "error") {
        console.log("login failure");
        throw Error(res.data);
      }
      console.log("login success");
      const userData: User = {
        id: res.data.id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        cell: res.data.cell,
        address1: res.data.address1,
        address2: res.data.address2 || null,
        country: res.data.country,
        zipcode: res.data.zipCode,
        city: res.data.city,
        state: res.data.state,
      };
      store.dispatch(loginUser(userData));
      return userData;
    });
}

export function register(data: UserInfo) {
  return fetchTimeout<Response>(url.resolve(API_URL, "register"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (res.type === "error") {
        console.log("register failure");
        throw Error(res.data);
      }
      console.log("register success");
      const userData: User = {
        id: res.data.id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        cell: res.data.cell,
        address1: res.data.address1,
        address2: res.data.address2 || null,
        country: res.data.country,
        zipcode: res.data.zipcode,
        city: res.data.city,
        state: res.data.state,
      };
      store.dispatch(loginUser(userData));
      return userData;
    });
}
