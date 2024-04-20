import { Link } from "react-router-dom";
import { GetCompaniesResponse } from "../utils/api";
import { Params } from "./components.types";
import { useState } from "react";

type ListProps = { results: GetCompaniesResponse, params: Params, onParamsChange: React.Dispatch<React.SetStateAction<Params>> }

function List({ results, params, onParamsChange }: ListProps) {
    const [selected, setSelected] = useState<string>('1')

    const handleParamsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setSelected(e.target.value)
        onParamsChange(prev => ({
            ...prev,
            sortby: "name",
            order: e.target.value === "1" ? "asc" : "desc"
        }));
    };

    const handlePaginationChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (e.currentTarget) {
            const pageNumber = e.currentTarget.textContent;

            if (pageNumber) {
                onParamsChange(prev => ({
                    ...prev,
                    page: Number(pageNumber)
                }));
            }
        }
    };

    return (
        <div>
            <div className="d-sm-flex align-items-end justify-content-between">
                <div className="text-nowrap">
                    <span><strong>{results.total}</strong> <span>results</span></span>
                </div>
                <div className="d-flex align-items-center me-sm-4">
                    <label
                        className="me-2 pe-1 text-nowrap"
                        htmlFor="sorting1"
                    >
                        <i className="fi-arrows-sort mt-n1" />
                        Sort by:
                    </label>
                    <select
                        className="form-select form-select form-select-sm"
                        id="sorting1"
                        value={selected}
                        onChange={handleParamsChange}
                    >
                        <option value="1">Name: asc</option>
                        <option value="2">Name: desc</option>
                    </select>


                </div>
            </div>
            <hr />

            <ul className="list-group list-group-flush mb-3">
                {results.data.map((company) => (
                    <li key={company.id} className="list-group-item">
                        <div className="row text-center text-md-start">
                            <div className="col-sm-12 col-md-2">
                                <img className="img-thumbnail" src={company.logo} alt="" />
                            </div>
                            <div className="col-sm-12 col-md-10">
                                <Link to={`/company/${company.id}`}>
                                    {company.name}
                                </Link>
                                <div>{`${company.streetName}, ${company.zipCode} ${company.city}`}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {Array.from({ length: results.pages }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = params.page === pageNumber;
                            const isDisabled = params.page === pageNumber;

                            return (
                                <li className={`page-item ${isActive ? 'active' : ''}`} key={i}>
                                    <button className="page-link" disabled={isDisabled} onClick={handlePaginationChange}>
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div >
    )
}
export default List;