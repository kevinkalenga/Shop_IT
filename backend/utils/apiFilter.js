class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        // check if the keyword is there
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                // insensitive case(mijiscule et miniscule)
                $options: 'i',
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }
}

export default APIFilters