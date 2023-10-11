interface ILocalStorageKeys {
  code: string;
  accessToken: string;
  refreshToken: string;
  expireTime: string;
  filterLibrary: string;
}

export const LOCALSTORAGE_KEYS: ILocalStorageKeys = {
  code: "spotify_code",
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  filterLibrary: "spotify_filter_library",
};

export default {
  getLocalStorage: () => {
    // Map to retrieve localStorage values
    const LOCALSTORAGE_VALUES = {
      code: window.localStorage.getItem(LOCALSTORAGE_KEYS.code),
      accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
      refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
      expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
      //timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
      filterLibrary: window.localStorage.getItem(
        LOCALSTORAGE_KEYS.filterLibrary
      ),
    };
    return LOCALSTORAGE_VALUES;
  },
  setLocalStorage: (key: string, value: any) => {
    window.localStorage.setItem(key, value);
  },
  logout: () => {
    // Clear all localStorage items
    Object.values(LOCALSTORAGE_KEYS).forEach((item) => {
      window.localStorage.removeItem(item);
    });
  },
};
