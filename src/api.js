const apiKey = `8868e982d0c8b2c8e5dd414627ebfd89`;
let config = {}

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

async function fetchConfig(){
    config = await callApi('configuration')
    console.log('config', config)
}

const FOLD_ITEMS = {
    movie: {
        getCredits: getMovieCredits,
        getImagePath: movie => movie.poster_path,
    },
    tv: {
        getCredits: getShowCredits,
        getImagePath: movie => movie.poster_path,
    },
    person: {
        getCredits: getPersonCredits,
        getImagePath: movie => movie.profile_path,
    }
}

function getImageUrl(item, size){
    const imagePath = FOLD_ITEMS[item.media_type].getImagePath(item)
    if(imagePath) return `${config.images.base_url}${size}/${imagePath}`
    return ''
}

function formatItem(item, media_type) {
    return {
        media_type,
        image_big: getImageUrl({ ...item, media_type }, 'w500'),
        ...item
    }
}

async function searchBy(query, media_type = 'all', page = 1) {
    const all = media_type === 'all'
    const assets = await callApi(`search/${all ? 'multi' : media_type}?query=${query}&include_adult=false&page=${page}`)
    const { results = [] } = assets;
    return results.map(item => formatItem(item, all ? item.media_type : media_type))
};

async function getItemDetails(item) {
    let detailsPromise = callApi(`${item.media_type}/${item.id}`)
    let creditsPromise = FOLD_ITEMS[item.media_type].getCredits(item.id)
    const [details, credits] = await Promise.all([detailsPromise, creditsPromise])
    return { ...formatItem(details, item.media_type), credits }
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
    fetchConfig,
}

export default api