// deep copy for object.assign()
export function ObjectAssignDeep(oldObj, newObj) {
    const obj = Object.assign({}, oldObj, newObj);
    if (newObj) {
        Object.keys(newObj).map(key => {
            if (oldObj && newObj[key] && !(newObj[key] instanceof Array) && typeof newObj[key] === 'object') {
                obj[key] = ObjectAssignDeep(oldObj[key], newObj[key]);
            } else {
                obj[key] = newObj[key];
            }
        });
    }
    return obj;
}

// deep copy for one object
export function ObjectCopy(newObj) {
    const obj = Object.assign({}, newObj);
    if (newObj) {
        Object.keys(newObj).map(key => {
            if (newObj[key] && !(newObj[key] instanceof Array) && typeof newObj[key] === 'object') {
                obj[key] = ObjectCopy(newObj[key]);
            } else {
                obj[key] = newObj[key];
            }
        });
    }
    return obj;
}

// copy an array without change the original link
export function ArrayCopy(oldArr = [], newArr = []){
    oldArr.length = 0;
    newArr.forEach(x => {
        oldArr.push(x);
    });
}