import { ErrorMessage, FormErrors, FormRules, FormValue } from "./types";
function isEmpty(value: any): boolean {
  return value == null || value === "";
}

const Validator = (
  formValue: FormValue,
  rules: FormRules,
  callback: (errors: FormErrors) => void
): void => {
  let errors: {
    [key: string]: ErrorMessage[];
  } = {};

  function addErrors(ruleName: string, msg: ErrorMessage) {
    if (!errors[ruleName]) {
      errors[ruleName] = [];
    }
    errors[ruleName].push(msg);
  }

  rules.map((rule) => {
    const value = formValue[rule.key];
    if (rule.validator) {
      addErrors(rule.key, {
        message: rule.validator.name,
        promise: rule.validator.validate(value),
      });
    }
    if (rule.required) {
      if (isEmpty(value)) {
        addErrors(rule.key, {
          message: "required",
        });
      }
    }

    if (rule.minLength != null) {
      if (!isEmpty(value) && value?.length < rule.minLength) {
        addErrors(rule.key, {
          message: "minLength",
        });
      }
    }

    if (rule.maxLength != null) {
      if (!isEmpty(value) && value?.length > rule.maxLength) {
        addErrors(rule.key, {
          message: "maxLength",
        });
      }
    }

    if (rule.pattern) {
      if (!rule.pattern.test(value)) {
        addErrors(rule.key, {
          message: "pattern",
        });
      }
    }
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
