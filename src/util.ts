export function fnsHasPromise<T>(..._type: T[]) {
  return _type.some(t => t instanceof Promise)
}
