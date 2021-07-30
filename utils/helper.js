let newArray = [];

function arrayUnique(array1, array2) {
    for (var i = 0; i < array1.length; ++i) {
        for (var j = i + 1; j < array2.length; ++j) {
            if (array1[i].prodId === array2[j].prodId)
                var test = Object.assign(array2[j], array1[i]);
            console.log("test", test);
            newArray.push(test);
        }
    }
    return newArray;
}

export default arrayUnique;