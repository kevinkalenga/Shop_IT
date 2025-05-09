
export const getPriceQueryParams = (searchParams, key, value) => {
    const newParams = new URLSearchParams(searchParams); // clone proprement

    if (key === "min") {
        // Update the key to match query structure
        key = "price[gte]";
    } else if (key === "max") {
        key = "price[lte]";
    }

    if (value) {
        newParams.set(key, value);
    } else {
        newParams.delete(key);
    }

    return newParams;
}




// export const getPriceQueryParams = (searchParams, key, value) => {
//     // Special handling for price[min] and price[max]
//     if (key === "min") {
//         key = "price[gte]";  // Update the key to match query structure
//     } else if (key === "max") {
//         key = "price[lte]";  // Update the key to match query structure
//     }

//     const hasValueInParam = searchParams.has(key);

//     if (value && hasValueInParam) {
//         // If value is provided and the key already exists, update it
//         searchParams.set(key, value);
//     } else if (value) {
//         // If value is provided and the key doesn't exist, add it
//         searchParams.append(key, value);
//     } else if (hasValueInParam) {
//         // If value is not provided, and the key exists, remove it
//         searchParams.delete(key);
//     }

//     return searchParams;
// }



// export const getPriceQueryParams = (searchParams, key, value) => {
//     const hasValueInParam = searchParams.has(key);

//     if (value && hasValueInParam) {
//         // update the value
//         searchParams.set(key, value)
//     } else if (value) {
//         // add the new value
//         searchParams.append(key, value)
//     } else if (hasValueInParam) {
//         // delete the value
//         searchParams.delete(key)
//     }

//     return searchParams;

// }