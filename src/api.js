const apiKey = `8868e982d0c8b2c8e5dd414627ebfd89`;

const fetchRequest = (url) => {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

async function callApi(url) {
    const formatted = url.indexOf('?') > -1 ? `${url}&` : `${url}?`
    return fetchRequest(`https://api.themoviedb.org/3/${formatted}api_key=${apiKey}&language=en-US`)
}

function getItemLabel(item, media_type) {
    switch (media_type) {
        case 'movie':
            return item.title
        case 'tv':
            return item.name
        case 'person':
            return item.name
        default:
            return ""
    }
}


function formatItem(item, media_type) {
    return {
        media_type,
        label: getItemLabel(item, media_type),
        ...item
    }
}

async function searchBy(query, media_type = 'all', page = 1) {
    const all = media_type === 'all'
    const assets = await callApi(`search/${all ? 'multi' : media_type}?query=${query}&include_adult=false&page=${page}`)
    const { results = [] } = assets;
    return results.map(item => formatItem(item, all ? item.media_type : media_type))
};

async function getDetails(type, id) {
    return callApi(`${type}/${id}`).then(response => {
        return response;
    });
};

async function getMovieDetails(movieId) {
    const [credits] = await Promise.all([
        callApi(`movie/${movieId}/credits`)
    ])
    return {
        credits: {
            cast: credits.cast.map(p => formatItem(p, 'person')),
            crew: credits.crew.map(p => formatItem(p, 'person')),
        }
    }
};

async function getPersonDetails(personId) {
    const [credits] = await Promise.all([
        callApi(`person/${personId}/combined_credits`)
    ])
    return {
        credits: {
            cast: credits.cast.map(p => formatItem(p, p.media_type)),
            crew: credits.crew.map(p => formatItem(p, p.media_type)),
        }
    }
};

async function getShowDetails(showId) {
    const [credits] = await Promise.all([
        callApi(`tv/${showId}/aggregate_credits`)
    ])
    return {
        credits: {
            cast: credits.cast.map(p => formatItem(p, 'person')),
            crew: credits.crew.map(p => formatItem(p, 'person')),
        }
    }
};

const api = {
    searchBy,
    getDetails,
    getMovieDetails,
    getPersonDetails,
    getShowDetails,
}

export default api