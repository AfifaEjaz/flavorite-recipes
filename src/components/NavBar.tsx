import { FormEvent, useState } from "react"
import { useSearchRecipe } from '../store';

const NavBar = () => {

    const [data, setData] = useState("")
    const { fetchSearchResponse } = useSearchRecipe()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("submit", data);
        fetchSearchResponse(data)
        setData("")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success ">
                <div className="container-fluid mx-4 ">
                    <a className="navbar-brand text-light" href="#">
                        Flavorite
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-light" aria-current="page" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/favourite-recipes">
                                    Favourites
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search Meal"
                                aria-label="Search"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                            <button className="btn btn-outline-light" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavBar