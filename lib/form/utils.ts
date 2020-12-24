import {FormErrors} from "./types";

export function controlHasError(errors: FormErrors, controlName: string): boolean {
    return Boolean(errors && errors[controlName]?.length > 0);
}
