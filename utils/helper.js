function arrayUnique(array1, array2) {
    console.log("array1", array1);
    console.log("array2", array2);
    const newArray = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = i + 1; j < array2.length; j++) {
            if (array1[i].prodId === array2[j].prodId) {
                console.log("array1[i]", array1[i]);
                console.log("array2[j]", array2[j]);
                const list = {...array2[j], ...array1[i] };
                console.log("list", list);
                newArray.push(list);
            }
        }
    }
    return newArray;
}

export default arrayUnique;