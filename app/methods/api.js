import {API_URL} from "../constants/api";

export function getProductsAndCategories(uProdList, uSections, uRefrStatus, uCurSection) {
    console.log("Sending POST to", API_URL, JSON.stringify({method:"getCategories"}));
    fetch(API_URL, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            method:"getCategories"
        })
    })
    .then((resp) => {
        console.log("received response", JSON.stringify(resp));
        return resp.json();
    })
    .then((json) => {
        console.log(json);
        if (!!json && json.length > 0) {
            uSections(json);
            let products = {};
            json.forEach((section, index, arr) => {
                console.log("Requesting products in category ", section.nameMainCategory);
                fetch(API_URL, {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        method:"getProductsInCategory",
                        data:{
                            cat_id:section.id
                        }
                    })
                })
                .then((resp) => {
                    console.log("received response", JSON.stringify(resp));
                    return resp.json();
                })
                .then((prod_json) => {
                    console.log(prod_json);
                    products = {...products, [section.id]:prod_json}
                    //console.log(products);
                    if (Object.keys(products).length == arr.length) {
                        console.log("Final products", products);
                        uCurSection(json[0].id);
                        uProdList(products);
                        uRefrStatus(false);
                    }
                })
                .catch((err) => {
                    uRefrStatus(false);
                    console.log(err);
                })
            })
        }
        //if ()
    })
    .catch((err) => {
        uRefrStatus(false);
        console.log(err);
    })
}

export function postOrder(data) {
    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                method:"postOrder",
                data:data
            })
        })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                resolve(json);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
    })
}
