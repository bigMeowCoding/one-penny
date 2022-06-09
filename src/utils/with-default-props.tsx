import _ from 'lodash';
export function mergeProps<A, B>(a: A, b: B): A & B;
export function mergeProps<A, B, C>(a: A, b: B, c: C): A & B & C;
export function mergeProps(...items: any[]) {
  function customizer(objValue: any, srcValue: any) {
    return _.isUndefined(objValue) ? srcValue : objValue;
  }
  const ret = _.assign({}, items[0]);

  for (let i = 1; i < items.length; i++) {
    _.assignWith(ret, items[i], customizer);
  }
  return ret;
}
