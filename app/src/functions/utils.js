export function c(...classes) {
  let str = "";
  for (const c of classes) {
    str += c + " ";
  }
  return str;
}
