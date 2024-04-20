type PlaceholderProps = { error?: boolean, search?: string }


function Placeholder({ error, search }: PlaceholderProps) {
    return (
        <div className="mt-4">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        <div>
                            <h2 className="my-2">{error ? `No results were found for “${search}”.` : 'Start searching'}</h2>
                            <ul>
                                <li>{!error ? 'Search by company name, city, zip code, or street.' : 'Make sure the spelling is correct.'}</li>
                                <li>{!error ? 'Use one or more search terms' : 'Try a different search term.'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Placeholder;
