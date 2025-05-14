// import React, { useEffect } from 'react';
// import MetaData from "./layout/MetaData";
// import { useGetProductsQuery } from "../redux/api/productsApi";
// import ProductItem from "./product/ProductItem";
// import Loader from './layout/Loader';
// import toast from 'react-hot-toast';
// import CustomPagination from "./layout/CustomPagination";
// import { useSearchParams } from "react-router-dom";
// import Filter from "./layout/Filter";

// const Home = () => {
//     let [searchParams] = useSearchParams();

//     // Get page and keyword from searchParams
//     const page = Number(searchParams.get("page")) || 1;
//     const keyword = searchParams.get("keyword") || "";

//     // Get price range (min and max)
//     const rawMin = searchParams.get("min");
//     const rawMax = searchParams.get("max");

//     // Ensure min and max are valid numbers or undefined if invalid
//     const min = rawMin !== null ? (isNaN(Number(rawMin)) ? undefined : Number(rawMin)) : undefined;
//     const max = rawMax !== null ? (isNaN(Number(rawMax)) ? undefined : Number(rawMax)) : undefined;

//     // Params to be sent to API
//     const params = { page, keyword };
//     if (min !== undefined) params.min = min;
//     if (max !== undefined) params.max = max;

//     console.log("Params sent to API:", params);

//     const { data, isLoading, error, isError } = useGetProductsQuery(params);

//     useEffect(() => {
//         if (isError) {
//             toast.error(error?.data?.message || "Error loading products");
//         }
//     }, [isError]);

//     const columnSize = keyword ? 4 : 3;

//     if (isLoading) return <Loader />;

//     return (
//         <>
//             <MetaData title="Buy Best Product Online" />

//             <div className="row">
//                 {keyword && (
//                     <div className='col-6 col-md-3 mt-5'>
//                         <Filter />
//                     </div>
//                 )}

//                 <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
//                     <h1 id="products_heading" className="text-secondary">
//                         {keyword
//                             ? `${data?.products?.length || 0} product(s) found with keyword: "${keyword}"`
//                             : "Latest Products"}
//                     </h1>

//                     <section id="products" className="mt-5">
//                         <div className="row">
//                             {!data?.products?.length ? (
//                                 <p className="text-danger">No products found</p>
//                             ) : (
//                                 data.products.map((product) => (
//                                     <ProductItem
//                                         key={product._id}
//                                         product={product}
//                                         columnSize={columnSize}
//                                     />
//                                 ))
//                             )}
//                         </div>
//                     </section>

//                     <CustomPagination
//                         resPerPage={data?.resPerPage}
//                         filteredProductsCount={data?.filteredProductsCount}
//                     />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;
////////////////////////////////////////////////////////
import React, { useEffect } from 'react';
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from './layout/Loader';
import toast from 'react-hot-toast';
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filter from "./layout/Filter";

const Home = () => {
    let [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const ratings = searchParams.get("ratings");


    const rawMin = searchParams.get("price[gte]");
    const rawMax = searchParams.get("price[lte]");

    const min = rawMin !== null ? Number(rawMin) : undefined;
    const max = rawMax !== null ? Number(rawMax) : undefined;

    // const rawMin = searchParams.get("min");
    // const rawMax = searchParams.get("max");

    // const min = rawMin !== null ? Number(rawMin) : undefined;
    // const max = rawMax !== null ? Number(rawMax) : undefined;

    const params = { page, keyword };
    if (min !== undefined) params.min = min;
    if (max !== undefined) params.max = max;
    if (category) params.category = category;
    if (ratings) params.ratings = Number(ratings);



    console.log("Params envoyés à l'API :", params);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Erreur lors du chargement des produits");
        }
    }, [isError]);

    const columnSize = keyword ? 4 : 3;

    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title="Buy Best Product Online" />

            <div className="row">
                {keyword && (
                    <div className='col-6 col-md-3 mt-5'>
                        <Filter />
                    </div>
                )}

                <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">
                        {keyword
                            ? `${data?.products?.length || 0} produit(s) trouvé(s) avec le mot-clé : "${keyword}"`
                            : "Derniers produits"}
                    </h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {!data?.products?.length ? (
                                <p className="text-danger">Aucun produit trouvé</p>
                            ) : (
                                data.products.map((product) => (
                                    <ProductItem
                                        key={product._id}
                                        product={product}
                                        columnSize={columnSize}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    <CustomPagination
                        resPerPage={data?.resPerPage}
                        filteredProductsCount={data?.filteredProductsCount}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;


// ////////////////////////////////////////////////////////////////////





// import React, { useEffect } from 'react';
// import MetaData from "./layout/MetaData";
// import { useGetProductsQuery } from "../redux/api/productsApi";
// import ProductItem from "./product/ProductItem";
// import Loader from './layout/Loader';
// import toast from 'react-hot-toast';
// import CustomPagination from "./layout/CustomPagination"
// import { useSearchParams } from "react-router-dom";
// import Filter from "./layout/Filter"

// // <div className={keyword ? "col-12 col-sm-9": "col-md-12"}>
// const Home = () => {

//     let [searchParams] = useSearchParams();
//     // if page is not there that will be the first page
//     const page = searchParams.get("page") || 1;
//     const keyword = searchParams.get("keyword") || ""
//     const min = searchParams.get("min")
//     const max = searchParams.get("max")


//     const params = { page, keyword };


//     min !== null && (params.min = min);
//     max !== null && (params.max = max);


//     console.log(params)





//     const { data, isLoading, error, isError } = useGetProductsQuery(params);
//     console.log(data)

//     useEffect(() => {
//         if (isError) {
//             toast.error(error?.data?.message)
//         }
//     }, [isError])

//     const columnSize = keyword ? 4 : 3

//     if (isLoading) return <Loader />



//     return (
//         <>
//             <MetaData title="Buy Best Product Online" />

//             <div className="row">
//                 {keyword && (
//                     <div className='col-6 col-md-3 mt-5'>
//                         <Filter />
//                     </div>
//                 )}

//                 <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
//                     <h1 id="products_heading" className="text-secondary">
//                         {keyword ? `${data?.products.length} Products found with keyword: ${keyword}`
//                             : "Latest Products"}

//                     </h1>

//                     <section id="products" className="mt-5">
//                         <div className="row">
//                             {/* <!-- Product Item 1 --> */}

//                             {data?.products?.map((product) => (
//                                 <ProductItem product={product} columnSize={columnSize} />
//                             ))}


//                         </div>
//                     </section>
//                     <CustomPagination
//                         resPerPage={data?.resPerPage}
//                         filteredProductsCount={data?.filteredProductsCount}
//                     />
//                 </div>
//             </div>
//         </>

//     )
// }

// export default Home