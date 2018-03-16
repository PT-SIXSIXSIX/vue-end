let verifyPhone = phone => {
  return /^[1][34578][0-9]{9}$/.test(phone);
};

let verifyIdCard = idCard => {
  return /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
};

let filterByKeys = (obj, keys, discard=true) => {
  let ikeys = Object.keys(obj);
  let matchingKeys = discard ? ikeys.filter(function(key){ return keys.indexOf(key) === -1 })
                             : ikeys.filter(function(key){ return keys.indexOf(key) > -1 });
  let newObj = {};
  for (let key in matchingKeys) {
    newObj[matchingKeys[key]] = obj[matchingKeys[key]];
  }
  return newObj;
};

let mapByKeys = (array, keys) => {
  let newArray = [];
  for (let index in array) {
    newArray.push(filterByKeys(array[index], keys, false))
  }
  return newArray;
};

let genSearchParams = obj => {
  let q = [];
  for (let key in obj) {
    q.push(key + ':' + obj[key].toString());
  }
  return q.join('+');
};

export default {
  verifyPhone,
  verifyIdCard,
  filterByKeys,
  mapByKeys,
  genSearchParams,
};
