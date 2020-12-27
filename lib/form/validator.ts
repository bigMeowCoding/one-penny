import {
  ErrorMessage,
  FormErrors,
  FormRules,
  formRuleType,
  FormValue,
} from "./types";
import { formRuleMap } from "./utils";

const Validator = (
  formValue: FormValue,
  rules: FormRules,
  callback: (errors: FormErrors) => void
): void => {
  let errors: {
    [key: string]: ErrorMessage[];
  } = {};
  rules.map((rule) => {
    const value = formValue[rule.key];
    const keys: formRuleType[] = [
      "required",
      "minLength",
      "maxLength",
      "pattern",
      "validator",
    ];
    keys.forEach((key) => {
      if (rule[key] != null) {
        formRuleMap[key](value, rule, errors);
      }
    });
  });
  const promiseList: Promise<any>[] = [];
  Object.keys(errors).forEach((key) => {
    const errorRule = errors[key];
    errorRule.forEach((item, index) => {
      if (item.promise) {
        const promise = item.promise.then(
          (d) => {
            if (d) {
              errorRule.splice(index, 1);
            } else {
              delete item.promise;
            }
            return d;
          },
          (error) => {
            console.error(error);
            delete item.promise;
            return error;
          }
        );
        promiseList.push(promise);
      }
    });
  });

  Promise.all(promiseList).then(
    () => {
      let newErrors: FormErrors = {};
      const entries = Object.entries(errors);
      entries.map(([key, errorMessages]) => {
        newErrors[key] = errorMessages.map((item) => {
          return item.message || "";
        });
      });
      callback(newErrors);
    },
    (error) => {
      console.error(error);
    }
  );
};
export default Validator;
