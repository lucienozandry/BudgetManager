const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default async function backend(route = "/", json = {}, method = "post") {

    const response = {
        data: null,
        errors: null,
        setData: function (json) {
            this.data = json;
        },
        setError: function (data) {
            this.errors = data;
        }
    }

    const token = {
        value: localStorage.getItem("token"),
        userAgent: navigator.userAgent
    }

    let payload = {
        route: route,
        token: token
    }

    switch (route) {
        case '/auth/login':
            payload = { ...payload, loginData: json }
            break;

        case '/auth/signup':
            payload = { ...payload, signupData: json }
            break;
            
        default:
            break;
    }

    await fetch(backendUrl, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(feedback => {
            if (feedback.errors) {
                response.setError(feedback.errors)
            } else {
                response.setData(feedback);
            }
        })
        .catch(error => {
            response.setError(error)
        });

    return response;
}