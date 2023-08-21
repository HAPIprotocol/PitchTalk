export enum ESTORAGE_KEYS {
  DO_NOT_SHOW_SUB_INFO_MODAL = 'DO_NOT_SHOW_SUB_INFO_MODAL',
  SHOWED_USER_NAME_MODAL = 'SHOWED_USER_NAME_MODAL',
  GOOGLE_ACCESS_TOKEN = 'GOOGLE_ACCESS_TOKEN',
  GOOGLE_REFRESH_TOKEN = 'GOOGLE_REFRESH_TOKEN',
  NEAR_ACCESS_TOKEN = 'NEAR_ACCESS_TOKEN',
  NEAR_REFRESH_TOKEN = 'NEAR_REFRESH_TOKEN',
}

export const setItem = (name: ESTORAGE_KEYS | string, value: unknown) =>
  localStorage.setItem(name, JSON.stringify(value));

export const getItem = (
  name: ESTORAGE_KEYS | string
): Record<string, unknown> | null => {
  try {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

export const setSessionItem = (name: ESTORAGE_KEYS, value: unknown) =>
  sessionStorage.setItem(name, JSON.stringify(value));

export const getSessionItem = (name: ESTORAGE_KEYS): unknown | null => {
  try {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};
