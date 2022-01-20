class Cookie {
  getCookie(key, cookie) {
    if (cookie === undefined) {
      return undefined;
    }
    //Cookie Without space
    let cookieWoSpace = cookie.replace(/\s/g, "");
    //cookie without semicolon
    let cookieWoSemiColon = cookieWoSpace.split(";");
    //paircookie (key : value)
    let pairCookie = [];
    for (let i = 0; i < cookieWoSemiColon.length; i++) {
      pairCookie.push(cookieWoSemiColon[i].split("="));
    }
    for (let i = 0; i < pairCookie.length; i++) {
      if (pairCookie[i][0] === key) {
        return pairCookie[i][1];
      }
    }
    return undefined;
  }
  setCookie({ key, value, path = "/", expire }) {
    const date = new Date();
    date.setTime(date.getTime() + expire / 60);
    const expires = "; expires=" + date.toUTCString();
    return key + "=" + value + expires + "; path=" + path;
  }
}

module.exports = new Cookie();
