const useHash = false;

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
  const newObject = {};
  if (useHash) {
    Object.keys(myObject).map(function(value) {
      newObject[value] = b64e(myObject[value]);
    });
    this.setItem(b64e(key), b64e(JSON.stringify(newObject)));
    return;
  }
  Object.keys(myObject).map(function(value) {
    newObject[value] = myObject[value];
  });
  this.setItem(key, JSON.stringify(newObject));
};

Storage.prototype.getObjectHash = function(key) {
  const myObject = useHash ? this.getItem(b64e(key)) : this.getItem(key);
  if (!myObject) return null;
  if (useHash) {
    return (
      b64d(myObject) &&
      JSON.parse(b64d(myObject), function(key) {
        return key ? b64d(this[key]) : this[key];
      })
    );
  }
  return (
    myObject &&
    JSON.parse(myObject, function(key) {
      return key ? this[key] : this[key];
    })
  );
};
