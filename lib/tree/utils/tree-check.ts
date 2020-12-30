export function makeNewCheckedKeys(
  checked: boolean,
  checkedKeysValue: string[],
  key: string,
  multiply: boolean
): string[] {
  let keys: string[];
  if (multiply) {
    if (checked) {
      keys = checkedKeysValue.concat(key);
    } else {
      keys = checkedKeysValue.filter((item) => item !== key);
    }
  } else {
    if (checked) {
      keys = [key];
    } else {
      keys = [];
    }
  }
  return keys;
}
