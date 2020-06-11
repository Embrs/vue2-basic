const useHash = true;
function b64e(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

function b64d(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function(c) {
        return "%" + c.charCodeAt(0).toString(16);
      })
      .join("")
  );
}
Storage.prototype.setObjectHash = function(key, myObject) {
  if (useHash) {
    // 加密 key 與 data
    this.setItem(b64e(key), b64e(JSON.stringify(myObject)));
    return;
  }
  this.setItem(key, JSON.stringify(myObject));
};

Storage.prototype.getObjectHash = function(key) {
  // 加密 key 取加密 data
  const myObject = useHash ? this.getItem(b64e(key)) : this.getItem(key);
  if (!myObject) return null;
  if (useHash) {
    return b64d(myObject) && JSON.parse(b64d(myObject));
  }
  return myObject && JSON.parse(myObject);
};
