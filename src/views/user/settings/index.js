import React from "react";
import { AuthContext } from "../../../App";
import { useAuthRedirect } from "../../../config/functions/authentication";
import backend from "../../../config/functions/backend";

const Settings = function () {
    const { state } = React.useContext(AuthContext);

    useAuthRedirect(state, true);

    if (state) {
        return <>
            <div className="container-md" style={{ marginTop: "80px" }}>
                <Profile />
                <Categories />
            </div>
        </>
    }
}

const Profile = React.memo(function () {

    const [currentSection, setCurrentSection] = React.useState(null);

    const Auth = React.useContext(AuthContext);

    const handleAccordionClick = React.useCallback(function (e) {
        const id = e.target.getAttribute('id')
        if (currentSection !== id) {
            setCurrentSection(id)
        } else {
            setCurrentSection(null)
        }
    }, [currentSection]);

    return <>
        <div className="card my-2">
            <div className="card-header">
                <h4>Profile</h4>
            </div>
            <div className="card-body">
                <div className="accordion" id="profileAccordion">
                    <div className="accordion-item list-group" style={{ border: "none" }}>
                        <div className={`list-group-item list-group-item-action ${currentSection === "name" && "active"}`} id="name" data-bs-toggle="collapse" data-bs-target="#nameCollapse"
                            aria-expanded="true" aria-controls="nameCollapse" onClick={handleAccordionClick}>
                            Name <span className="text-success" style={{ position: "absolute", right: "5%" }}>{Auth.user.name}</span>
                        </div>
                        <div id="nameCollapse" className="accordion-collapse collapse" aria-labelledby="name" data-bs-parent="#profileAccordion">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col-lg-10 col-8 ">
                                        <input type="text " className="form-control col-6" name="name" id="name" placeholder="Your new name"
                                            defaultValue={Auth.user.name} />
                                    </div>
                                    <button type="button" className="btn btn-secondary col-lg-2 col-4">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={`list-group-item list-group-item-action ${currentSection === "email" && "active"}`} id="email" data-bs-toggle="collapse" data-bs-target="#emailCollapse"
                            aria-expanded="true" aria-controls="emailCollapse" onClick={handleAccordionClick}>
                            email <span className="text-success" style={{ position: "absolute", right: "5%" }}>{Auth.user.email}</span>
                        </div>
                        <div id="emailCollapse" className="accordion-collapse collapse" aria-labelledby="email" data-bs-parent="#profileAccordion">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col-lg-10 col-8 ">
                                        <input type="text" className="form-control col-6" name="email" id="email" placeholder="Your new email"
                                            defaultValue={Auth.user.email} />
                                    </div>
                                    <button type="button" className="btn btn-secondary col-lg-2 col-4">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={`list-group-item list-group-item-action ${currentSection === "password" && "active"}`} id="password" data-bs-toggle="collapse" data-bs-target="#passwordCollapse"
                            aria-expanded="true" aria-controls="passwordCollapse" onClick={handleAccordionClick}>
                            password
                        </div>
                        <div id="passwordCollapse" className="accordion-collapse collapse" aria-labelledby="password" data-bs-parent="#profileAccordion">
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="">
                                        <input type="text " className="form-control col-12  my-2" name="password" id="password" placeholder="Your current password"
                                        />
                                        <input type="text " className="form-control col-12 my-2" name="newPassword" id="newPassword" placeholder="Your new password"
                                        />
                                    </div>
                                    <div className="">
                                        <button type="button" className="btn btn-secondary w-auto">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
})

const Categories = React.memo(function () {
    const [categories, setCategories] = React.useState(null);

    React.useEffect(() => {
        backend('/categories')
            .then(response => {
                if (response.data.categories) {
                    setCategories(response.data.categories);
                }
            });
    }, [])

    return <>
        <div className="card my-2">
            <div className="card-header">
                <h4> Categories</h4>
            </div>
            <div className="card-body">
                <div className="accordion" id="categoryList">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                                All your categories
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#categoryList">
                            <div className="accordion-body">
                                <div className="accordion" id="categories">
                                    {
                                        categories && categories.map((category) => {
                                            return <div className="accordion-item" key={category.id}>
                                                    <h2 className="accordion-header" id={`categoryHeading-${category.id}`}>
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#category-${category.id}`} 
                                                            aria-expanded="true" aria-controls={`category-${category.id}`}>
                                                            {category.name}
                                                        </button>
                                                    </h2>
                                                    <div id={`category-${category.id}`} className="accordion-collapse collapse bg-secondary text-light" aria-labelledby={`categoryHeading-${category.id}`} 
                                                        data-bs-parent="#categories">
                                                        <div className="accordion-body">
                                                            {category.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="true" aria-controls="flush-collapseTwo">
                                Customize your categories
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#categoryList">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
})

export default Settings;