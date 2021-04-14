const baseURL = "/api/v1";

const reqPOST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: {},
};
const reqPUT = {...reqPOST, method: 'PUT'};
const reqDELETE = { method: 'DELETE' };

const parserError = { param: "Application", msg: "Cannot parse server response" };
const connectionError = { param: "Server", msg: "Cannot communicate" }

async function fetchData(url, init) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + url, init)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch(() => {
                            resolve(true);
                        });
                } else {
                    // analyze the cause of error
                    response.json()
                        .then((error) => reject(error))
                        .catch((err) => reject({ errors: [{...parserError, err }] }));
                }
            })
            .catch((err) => reject({ errors: [{...connectionError, err }] }));
    });
}

async function getData(url) {
    // I'm using standard fetch data, not mine encapsulation for having different manipulation at higher level
    return fetch(baseURL + url)
}

async function postData(url, body= {}) {
    return fetchData(url, {...reqPOST, body: JSON.stringify(body)});
}

async function putData(url, body = {}) {
    return fetchData(url, {...reqPUT, body: JSON.stringify(body)});
}

async function deleteData(url) {
    return fetchData(url, reqDELETE);
}

export function getErrorObj(response, msg) {
    return { status: response.status, msg: msg };
}

const HTTP = { getData, postData, putData, deleteData } ;
export default HTTP;
