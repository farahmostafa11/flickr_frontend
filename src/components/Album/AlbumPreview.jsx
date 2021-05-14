import React, {useState}from 'react'
import AlbumCard from './AlbumCard'
import './AlbumPreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'


function AlbumPreview(){
    const New = <FontAwesomeIcon icon={faPlusSquare} color="DarkGrey"/>

    return(
        <>
        <div className="albumPreview">
            <ul className="nav nav-tabs">
                <li className="ml-auto" ><button id="new-album" title="New album">{New}   New album</button></li>
            </ul>
            <div className="album-grid">
                <AlbumCard />
            </div>
        </div>
        </>
        )
}

export default AlbumPreview;