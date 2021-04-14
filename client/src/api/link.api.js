import HTTP from "./http-fetch";

async function addLink(link) {
    return HTTP.postData('/links', link);
}

async function updateLink(linkId, link) {
    return HTTP.putData('/links/'+linkId, link);
}

async function deleteLink(linkId) {
    return HTTP.deleteData('/links/'+linkId);
}

const LinkAPI = {
    addLink, updateLink, deleteLink,
} ;

export default LinkAPI;
