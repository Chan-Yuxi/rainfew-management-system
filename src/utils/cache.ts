function set(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

function get(key: string) {
  return window.localStorage.getItem(key);
}

export default {
  set,
  get,
};
