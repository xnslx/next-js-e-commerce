function arrayUnique(array1, array2) {
    for (var i = 0; i < array1.length; ++i) {
        for (var j = i + 1; j < array2.length; ++j) {
            if (array1[i].prodId === array2[j].prodId)
            // console.log('array1[i]',array1[i])
            // console.log('array2[j]',array2[j])
                var newArray = [];
            var test = Object.assign(array2[j], array1[i]);
            newArray.push(test);
        }
    }
    return newArray;
}

export default arrayUnique;