import React from "react";
import ItemList from './ItemList'

export default function Credits({credits, onSelected}){
    return (
        <>
        {
            credits.cast.length > 0 && (
                <>
                    <h2>Cast</h2>
                    <ItemList items={credits.cast} onSelected={onSelected} />
                </>
            )
        }
        {
            credits.crew.length > 0 && (
                <>
                    <h2>Crew</h2>
                    <ItemList items={credits.crew} onSelected={onSelected} />
                </>
            )
        }
        </>
    )
}