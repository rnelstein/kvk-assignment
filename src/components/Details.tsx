import { useEffect, useState } from 'react'
import { getCompanyById, getCompanyDetailsById } from '../utils/api'
import { useHistory, useParams } from 'react-router-dom'
import { Company, CompanyDetails } from './components.types'

type DetailsParams = {
    id: string
}

function Details() {
    const history = useHistory();
    let { id } = useParams<DetailsParams>();
    const [company, setCompany] = useState<Company>()
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails[]>()

    useEffect(() => {
        fetchData()
    }, [id])


    const fetchData = async () => {
        try {
            const responseCompanyById = await getCompanyById(id)
            const responseCompanyDetailsById = await getCompanyDetailsById(id)

            setCompany(responseCompanyById.data)
            setCompanyDetails(responseCompanyDetailsById.data)
        } catch (error) {
            history.push("/");
        }
    };


    if (!company || !companyDetails) {
        return <div>Loading...</div>
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col">
                    <h1>{company.name}</h1>
                    <div>{`${company.streetName}, ${company.zipCode} ${company.city}`}</div>
                    <hr />
                </div>
            </div>

            <div className="row">
                {companyDetails.map(details =>
                    <div key={details.id} className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <ul>
                                    <li>catchPhrase: {details.catchPhrase}</li>
                                    <li>website: {details.website}</li>
                                    <li>phoneNumber: {details.phoneNumber}</li>
                                    <li>id: {details.id}</li>
                                    <li>companyId: {details.companyId}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details;