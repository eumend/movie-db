import React from "react";
import ItemList from './ItemList'

export default function Credits({credits, onSelected}){
    return (
        <>
        {
            credits.cast.length > 0 && credits.crew.length > 0 && (
                <h2>Credits</h2>
            )
        }
        {
            credits.cast.length > 0 && (
                <>
                    <h3>Cast</h3>
                    <ItemList items={credits.cast} onSelected={onSelected} />
                </>
            )
        }
        {
            credits.crew.length > 0 && (
                <>
                    <h3>Crew</h3>
                    <ItemList items={credits.crew} onSelected={onSelected} />
                </>
            )
        }
        </>
    )
}