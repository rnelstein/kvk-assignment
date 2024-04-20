import { useEffect, useRef, useState } from 'react'
import { GetCompaniesResponse, getCompanies } from '../utils/api'
import Placeholder from './Placeholder'
import List from './List'
import { Params } from './components.types'

function Home() {
    const [error, setError] = useState(false)
    const [params, setParams] = useState<Params>({ search: '', sortby: 'name', order: 'asc', page: 1, limit: 10 })
    const [results, setResults] = useState<GetCompaniesResponse>()
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            fetchData();
        }
    }, [params.order, params.sortby, params.page])

    const fetchData = async () => {
        try {
            const res: GetCompaniesResponse = await getCompanies(params);
            setResults(res);
        } catch (error) {
            setError(true);
            setResults(undefined);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({
            ...prev,
            search: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className='container mt-5'>
            <h1>Search</h1>
            <form className="row mb-5" onSubmit={handleSubmit}>
                <div className="col-sm-12 col-md-10">
                    <label htmlFor="search" className="form-label">
                        Enter a company name, city, zip code or street.
                    </label>
                    <input
                        type="text"
                        id="search"
                        className="form-control"
                        aria-describedby="search"
                        placeholder='Search in kompany.nl'
                        data-testid="search-input"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-12 col-md-2 d-flex align-items-end">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        data-testid="submit-button"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="row mt-5">
                <div className="col">
                    {!results ? <Placeholder search={params.search} error={error} /> : <List results={results} onParamsChange={setParams} />}
                </div>
            </div>
        </div>
    )
}

export default Home;