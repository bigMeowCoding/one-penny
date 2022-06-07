import { ErrorMessage, FormErrors, FormRules, formRuleType, FormValue } from './types';
import { formRuleMap } from './utils';

const Validator = (
  formValue: FormValue,
  rules: FormRules,
  callback: (errors: FormErrors) => void,
): void => {
  let errors: {
    [key: string]: ErrorMessage[];
  } = {};
  rules.map((rule) => {
    const value = formValue[rule.key];
    const keys: formRuleType[] = ['required', 'minLength', 'maxLength', 'pattern', 'validator'];
    keys.forEach((key) => {
      if (rule[key] != null) {
        formRuleMap[key](value, rule, errors);
      }
    });
  });
  const promiseList: Promise<boolean>[] = [];
  Object.keys(errors).forEach((key) => {
    const errorRule = errors[key];
    errorRule.forEach((errorRuleItem, index) => {
      if (!errorRuleItem.promise) {
        return;
      }
      promiseList.push(
        errorRuleItem.promise.then(
          (ruleResult) => {
            if (ruleResult) {
              // 异步校验规则通过，删除promise和检验错误信息
              errorRule.splice(index, 1);
            } else {
              // 异步校验规则不通过，删除promise展示检验错误信息
              delete errorRuleItem.promise;
            }
            return ruleResult;
          },
          (error) => {
            // 异步校验规则不通过，删除promise展示检验错误信息
            delete errorRuleItem.promise;
            // 可能是网络或者异常错误打印
            console.error(error);
            return error;
          },
        ),
      );
    });
  });

  Promise.all(promiseList).then(
    () => {
      let newErrors: FormErrors = {};
      const entries = Object.entries(errors);
      entries.map(([key, errorMessages]) => {
        newErrors[key] = errorMessages.map((item) => {
          return item.message || '';
        });
      });
      callback(newErrors);
    },
    (error) => {
      console.error(error);
    },
  );
};
export default Validator;
