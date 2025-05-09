
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";

const Filter = () => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const handleButtonClick = (e) => {
        e.preventDefault();

        const validatedMin = min ? min : 0;
        const validatedMax = max ? max : 0;

        // Crée une nouvelle instance avec les deux paramètres
        let updatedParams = getPriceQueryParams(searchParams, "min", validatedMin);
        updatedParams = getPriceQueryParams(updatedParams, "max", validatedMax);
        console.log("Navigating to: ", updatedParams.toString());
        // Utilise bien updatedParams ici, pas searchParams
        navigate({
            pathname: window.location.pathname,
            search: updatedParams.toString(),
        });
    };

    // const handleButtonClick = (e) => {
    //     e.preventDefault();

    //     // Ensure min and max values are valid numbers before proceeding
    //     const validatedMin = min ? min : 0;
    //     const validatedMax = max ? max : 0;

    //     searchParams = getPriceQueryParams(searchParams, "min", validatedMin);
    //     searchParams = getPriceQueryParams(searchParams, "max", validatedMax);

    //     // Crée une nouvelle instance avec min et max
    //     let updatedParams = getPriceQueryParams(searchParams, "min", validatedMin);
    //     updatedParams = getPriceQueryParams(updatedParams, "max", validatedMax);

    //     const path = window.location.pathname + "?" + searchParams.toString();
    //     navigate(path);
    // }

    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <h5 className="filter-heading mb-3">Price</h5>
            <form
                id="filter_form"
                className="px-2"
                onSubmit={handleButtonClick}
            >
                <div className="row">
                    <div className="col">
                        <input
                            type="number" // Changed from "text" to "number"
                            className="form-control"
                            placeholder="Min ($)"
                            name="min"
                            value={min}
                            onChange={(e) => setMin(e.target.value ? Number(e.target.value) : 0)} // Fallback to 0 if input is empty
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number" // Changed from "text" to "number"
                            className="form-control"
                            placeholder="Max ($)"
                            name="max"
                            value={max}
                            onChange={(e) => setMax(e.target.value ? Number(e.target.value) : 0)} // Fallback to 0 if input is empty
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">GO</button>
                    </div>
                </div>
            </form>
            <hr />
            <h5 className="mb-3">Category</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    id="check4"
                    value="Category 1"
                />
                <label className="form-check-label" htmlFor="check4"> Category 1 </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    id="check5"
                    value="Category 2"
                />
                <label className="form-check-label" htmlFor="check5"> Category 2 </label>
            </div>

            <hr />
            <h5 className="mb-3">Ratings</h5>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="ratings"
                    id="check7"
                    value="5"
                />
                <label className="form-check-label" htmlFor="check7">
                    <span className="star-rating">★ ★ ★ ★ ★</span>
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="ratings"
                    id="check8"
                    value="4"
                />
                <label className="form-check-label" htmlFor="check8">
                    <span className="star-rating">★ ★ ★ ★ ☆</span>
                </label>
            </div>
        </div>
    )
}

export default Filter;
///////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { getPriceQueryParams } from "../../helpers/helpers";

// const Filter = () => {

//     const [min, setMin] = useState(0);
//     const [max, setMax] = useState(0);

//     const navigate = useNavigate();
//     let [searchParams] = useSearchParams();

//     const handleButtonClick = (e) => {
//         e.preventDefault();

//         searchParams = getPriceQueryParams(searchParams, "min", min)
//         searchParams = getPriceQueryParams(searchParams, "max", max)

//         const path = window.location.pathname + "?" + searchParams.toString();
//         navigate(path);
//     }


//     return (
//         <div className="border p-3 filter">
//             <h3>Filters</h3>
//             <hr />
//             <h5 className="filter-heading mb-3">Price</h5>
//             <form
//                 id="filter_form"
//                 className="px-2"
//                 onSubmit={handleButtonClick}
//             >
//                 <div className="row">
//                     <div className="col">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Min ($)"
//                             name="min"
//                             value={min}
//                             onChange={(e) => setMin(Number(e.target.value))}
//                         />
//                     </div>
//                     <div className="col">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Max ($)"
//                             name="max"
//                             value={max}
//                             onChange={(e) => setMax(Number(e.target.value))}
//                         />
//                     </div>
//                     <div className="col">
//                         <button type="submit" className="btn btn-primary">GO</button>
//                     </div>
//                 </div>
//             </form>
//             <hr />
//             <h5 className="mb-3">Category</h5>

//             <div className="form-check">
//                 <input
//                     className="form-check-input"
//                     type="checkbox"
//                     name="category"
//                     id="check4"
//                     value="Category 1"
//                 />
//                 <label className="form-check-label" for="check4"> Category 1 </label>
//             </div>
//             <div className="form-check">
//                 <input
//                     className="form-check-input"
//                     type="checkbox"
//                     name="category"
//                     id="check5"
//                     value="Category 2"
//                 />
//                 <label className="form-check-label" for="check5"> Category 2 </label>
//             </div>

//             <hr />
//             <h5 className="mb-3">Ratings</h5>

//             <div className="form-check">
//                 <input
//                     className="form-check-input"
//                     type="checkbox"
//                     name="ratings"
//                     id="check7"
//                     value="5"
//                 />
//                 <label className="form-check-label" for="check7">
//                     <span className="star-rating">★ ★ ★ ★ ★</span>
//                 </label>
//             </div>
//             <div className="form-check">
//                 <input
//                     className="form-check-input"
//                     type="checkbox"
//                     name="ratings"
//                     id="check8"
//                     value="4"
//                 />
//                 <label className="form-check-label" for="check8">
//                     <span className="star-rating">★ ★ ★ ★ ☆</span>
//                 </label>
//             </div>
//         </div>

//     )
// }

// export default Filter