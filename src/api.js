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

const FOLD_ITEMS = {
    movie: {
        getShortLabel: movie => movie.title,
        getCredits: getMovieCredits
    },
    tv: {
        getShortLabel: show => show.name,
        getCredits: getShowCredits
    },
    person: {
        getShortLabel: person => person.name,
        getCredits: getPersonCredits
    }
}

function formatItem(item, media_type) {
    return {
        media_type,
        shortLabel: FOLD_ITEMS[media_type].getShortLabel(item),
        ...item
    }
}

async function searchBy(query, media_type = 'all', page = 1) {
    const all = media_type === 'all'
    const assets = await callApi(`search/${all ? 'multi' : media_type}?query=${query}&include_adult=false&page=${page}`)
    const { results = [] } = assets;
    return results.map(item => formatItem(item, all ? item.media_type : media_type))
};

async function getItemDetails(itemId, mediaType) {
    let detailsPromise = callApi(`${mediaType}/${itemId}`)
    let creditsPromise = FOLD_ITEMS[mediaType].getCredits(itemId)
    const [details, credits] = await Promise.all([detailsPromise, creditsPromise])
    return { ...details, credits }
};

async function getMovieCredits(movieId) {
    const credits = await callApi(`movie/${movieId}/credits`)
    return mapCredits(credits, 'person')
};

async function getPersonCredits(personId) {
    const credits = await callApi(`person/${personId}/combined_credits`)
    return mapCredits(credits)
};

async function getShowCredits(showId) {
    const credits = await callApi(`tv/${showId}/aggregate_credits`)
    return mapCredits(credits, 'person')
};

function mapCredits(credits, media_type){
    return {
        cast: mapCreditList(credits.cast, media_type),
        crew: mapCreditList(credits.crew, media_type),
    }
}

function mapCreditList(items, media_type){
    let itemsMap = items.reduce((acc, item) => {
        if(acc[item.id]) {
            const updatedFields = {
                department: `${acc[item.id].department}, ${item.department}`
            }
            acc[item.id] = {
                ...acc[item.id],
                ...updatedFields
            }
        } else {
            acc[item.id] = formatItem(item, media_type || item.media_type)
        }
        return acc
    }, {})
    return Object.keys(itemsMap).map(k => itemsMap[k])
}

const api = {
    searchBy,
    getItemDetails,
    getPersonCredits,
    getShowCredits,
}

export default api