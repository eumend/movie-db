const FOLD_ITEMS = {
    movie: {
        getShortLabel: movie => movie.title,
        getDate: movie => (new Date(movie.release_date)).getFullYear(),
    },
    tv: {
        getShortLabel: show => show.name,
        getDate: show => (new Date(show.first_air_date)).getFullYear(),
    },
    person: {
        getShortLabel: person => person.name,
        getDate: person => (new Date(person.birthday)).getFullYear(),
    }
}

export function getShortLabel(item){
    return FOLD_ITEMS[item.media_type].getShortLabel(item)
}

export function getDate(item){
    return FOLD_ITEMS[item.media_type].getDate(item)
}