const FOLD_ITEMS = {
    movie: {
        getShortLabel: movie => movie.title,
        getDate: movie => movie.release_date ? (new Date(movie.release_date)).getFullYear() : '',
        getGenres: movie => movie.genres.length ? movie.genres.map(g => g.name).join(', ') : '' ,
        getPopularity: movie => movie.popularity !== null ? `${Math.round(movie.popularity)}/100` : ''
    },
    tv: {
        getShortLabel: show => show.name,
        getDate: show => show.first_air_date ? (new Date(show.first_air_date)).getFullYear() : '',
        getGenres: show => show.genres.length ? show.genres.map(g => g.name).join(', ') : '' ,
        getPopularity: show => show.popularity !== null ? `${Math.round(show.popularity)}/100` : ''
    },
    person: {
        getShortLabel: person => person.name,
        getDate: person => person.birthday ? (new Date(person.birthday)).getFullYear() : '',
        getGenres: () => '',
        getPopularity: () => '',
    }
}

export function getShortLabel(item){
    return FOLD_ITEMS[item.media_type].getShortLabel(item)
}

export function getDate(item){
    return FOLD_ITEMS[item.media_type].getDate(item)
}

export function getGenres(item){
    return FOLD_ITEMS[item.media_type].getGenres(item)
}

export function getPopularity(item){
    return FOLD_ITEMS[item.media_type].getPopularity(item)
}