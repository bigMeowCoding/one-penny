import { FormErrors, FormRules, FormValue } from "./types";
function isEmpty(value: any): boolean {
  return value == null || value === "";
}
const Validator = (formValue: FormValue, rules: FormRules): FormErrors => {
  let errors: FormErrors = {};
  function addErrors(ruleName: string, msg: string) {
    if (!errors[ruleName]) {
      errors[ruleName] = [];
    }
    errors[ruleName].push(msg);
  }

  rules.map((rule) => {
    const value = formValue[rule.key];
    if (rule.required) {
      if (isEmpty(value)) {
        addErrors(rule.key, "必填");
      }
    }
    if (rule.minLength != null) {
      if (!isEmpty(value) && value?.length < rule.minLength) {
        addErrors(rule.key, "太短");
      }
    }
    if (rule.maxLength != null) {
      if (!isEmpty(value) && value?.length > rule.maxLength) {
        addErrors(rule.key, "太长");
      }
    }
    if (rule.pattern) {
      if (!rule.pattern.test(value)) {
        addErrors(rule.key, "格式不正确");
      }
    }
  });
  return errors;
};
export default Validator;
