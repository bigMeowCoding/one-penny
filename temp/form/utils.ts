import { ErrorMessage, FormErrors, FormRule } from './types';

export const formRuleMap = {
  required: (value: string, rule: FormRule, errors: { [p: string]: ErrorMessage[] }) => {
    validateRequiredRule(value, rule, errors);
  },
  minLength: (value: string, rule: FormRule, errors: { [p: string]: ErrorMessage[] }) => {
    validateMinLengthRule(value, rule, errors);
  },
  maxLength: (value: string, rule: FormRule, errors: { [p: string]: ErrorMessage[] }) => {
    validateMaxLengthRule(value, rule, errors);
  },
  pattern: (value: string, rule: FormRule, errors: { [p: string]: ErrorMessage[] }) => {
    validatePatternRule(rule, value, errors);
  },
  validator: (value: string, rule: FormRule, errors: { [p: string]: ErrorMessage[] }) => {
    validateCustomValidator(rule, value, errors);
  },
};
export function controlHasError(errors: FormErrors, controlName: string): boolean {
  return Boolean(errors && errors[controlName]?.length > 0);
}
export function addErrors(
  ruleName: string,
  msg: ErrorMessage,
  errors: {
    [key: string]: ErrorMessage[];
  },
) {
  if (!errors[ruleName]) {
    errors[ruleName] = [];
  }
  errors[ruleName].push(msg);
}
export function isEmpty(value: any): boolean {
  return value == null || value === '';
}

export function validateRequiredRule(
  value: any,
  rule: FormRule,
  errors: { [p: string]: ErrorMessage[] },
) {
  if (isEmpty(value)) {
    addErrors(
      rule.key,
      {
        message: 'required',
      },
      errors,
    );
  }
}

export function validateMinLengthRule(
  value: any,
  rule: FormRule,
  errors: { [p: string]: ErrorMessage[] },
) {
  if (rule.minLength == null) {
    return;
  }

  if (!isEmpty(value) && value?.length < rule.minLength) {
    addErrors(
      rule.key,
      {
        message: 'minLength',
      },
      errors,
    );
  }
}

export function validateMaxLengthRule(
  value: any,
  rule: FormRule,
  errors: { [p: string]: ErrorMessage[] },
) {
  if (rule.maxLength == null) {
    return;
  }

  if (!isEmpty(value) && value.length > rule.maxLength) {
    addErrors(
      rule.key,
      {
        message: 'maxLength',
      },
      errors,
    );
  }
}

export function validatePatternRule(
  rule: FormRule,
  value: any,
  errors: { [p: string]: ErrorMessage[] },
) {
  if (!rule?.pattern?.test(value)) {
    addErrors(
      rule.key,
      {
        message: 'pattern',
      },
      errors,
    );
  }
}

export function validateCustomValidator(
  rule: FormRule,
  value: any,
  errors: { [p: string]: ErrorMessage[] },
) {
  addErrors(
    rule.key,
    {
      message: rule?.validator?.name,
      promise: rule?.validator?.validate(value),
    },
    errors,
  );
}
