const postData = async (url, data) => { //async await - используются вместе. await ждет результата запроса
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });

    return await res.json();
};


const getResource = async (url) => { //async await - используются вместе. await ждет результата запроса
    const res = await fetch(url);

    if (!res.ok) { //если результат НЕ ОК
        throw new Error(`Could not fetch ${url}, status ${res.status}`); //выкидываем новую ошибку
    }

    return await res.json();
};


export {postData};
export {getResource};