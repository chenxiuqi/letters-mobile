import { Dimensions } from "react-native";
import PropTypes from "prop-types";

// Global constants
export const STATUS_BAR_HEIGHT = 20;
export const STATUS_BAR_WIDTH = 100;
export const WINDOW_WIDTHr = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

/** A custom function to validate the type of an object passed for styling.
 *  Accepts any object of strings and numbers,
 * to avoid having to enumerate all possible styles that can be applied. */
export const StyleType = PropTypes.objectOf(
  (propValue, key, componentName, location, propFullName): Error | null => {
    if (
      typeof propValue[key] !== "string" &&
      typeof propValue[key] !== "number"
    ) {
      return new Error(
        "Invalid prop `" +
          propFullName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      );
    }
    return null;
  }
);

export enum Validation {
  Email = "Email",
  Cell = "Cell",
  Password = "Password",
  Zipcode = "Zipcode",
}

export function isValidEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function isValidCell(cell: string) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(cell);
}

export function isValidPassword(password: string) {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
    password
  );
}

export function isValidZipcode(zipcode: string) {
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipcode);
}

export function validateFormat(format: Validation, value: string) {
  switch (format) {
    case Validation.Email:
      return isValidEmail(value);
    case Validation.Cell:
      return isValidCell(value);
    case Validation.Password:
      return isValidPassword(value);
    case Validation.Zipcode:
      return isValidZipcode(value);
    default:
      return false;
  }
}
