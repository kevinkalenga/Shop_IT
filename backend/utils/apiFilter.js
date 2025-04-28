class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i', // insensible à la casse (majuscule/minuscule)
                }
            };
            this.query = this.query.find({ ...keyword });
        }
        return this;
    }

    filters() {
        const queryCopy = { ...this.queryStr };

        // Fields to remove because we already handle them elsewhere
        const fieldsToRemove = ["keyword", "page"];
        fieldsToRemove.forEach(field => delete queryCopy[field]);

        // Advanced filters for fields like price, ratings, etc.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        let parsedQuery = JSON.parse(queryStr);

        // Convert numeric filter values into numbers
        for (const key in parsedQuery) {
            if (typeof parsedQuery[key] === 'object') {
                for (const op in parsedQuery[key]) {
                    const value = parsedQuery[key][op];
                    if (!isNaN(value)) {
                        parsedQuery[key][op] = Number(value);
                    }
                }
            }
        }

        this.query = this.query.find(parsedQuery);
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }

    getQuery() {
        return this.query;
    }
}

export default APIFilters;


// class APIFilters {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr
//     }

//     search() {
//         // check if the keyword is there
//         const keyword = this.queryStr.keyword ? {
//             name: {
//                 $regex: this.queryStr.keyword,
//                 // insensitive case(mijiscule et miniscule)
//                 $options: 'i',
//             },
//         } : {};

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filters() {
//         const queryCopy = { ...this.queryStr };

//         // Fields to remove because we've already got the keyword in the search
//         const fieldsToRemove = ["keyword", "page"]
//         fieldsToRemove.forEach((el) => delete queryCopy[el])


//         // Advance filter for price, ratings etc
//         let queryStr = JSON.stringify(queryCopy)
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

//         let parsedQuery = JSON.parse(queryStr)

//         // Convertir les valeurs en nombre si c'est un filtre numérique
//         for (const key in parsedQuery) {
//             if (typeof parsedQuery[key] === 'object') {
//                 for (const op in parsedQuery[key]) {
//                     const val = parsedQuery[key][op];
//                     if (!isNaN(val)) parsedQuery[key][op] = Number(val);
//                 }
//             }
//         }


//         this.query = this.query.find(parsedQuery)
//         return this
//     }

//     getQuery() {
//         return this.query;
//     }

//     // Pagination
//     pagination(resPerPage) {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resPerPage * (currentPage - 1)

//         this.query = this.query.limit(resPerPage).skip(skip);
//         return this;
//     }
// }

// export default APIFilters