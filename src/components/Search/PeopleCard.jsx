import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {UnFollowPeople,FollowPeople} from "../../services/userServices";
import defaultPhoto from '../../img/deefault.jpg'
import './PeopleCard.css'
import { render } from '@testing-library/react';
const endpoint = 'http://localhost:3001/'
const staticAvatar= 'https://combo.staticflickr.com/pw/images/buddyicon00_m.png#22501572@N05'
/** Renders Group Card component to show group in search
 * @author Roaa Magdy
 * @namespace PeopleCard
 * @category Functional Component
 * @extends Component
 * @property {String} props.id -People id
 * @property {String} props.url -Photo url
 * @property {String} props.Fname -User first name
 * @property {String} props.Lname -User Last name
 * @property {String} props.subtitle -User account name
 * @property {Number} props.followers -Number of followers
 * @property {Number} props.noofimages -Number of images
 * @property {String} props.date -Date account started
 * @property {Boolean} props.followed -boolean indicates if followed or not
 */
function PeopleCard(props) {
    const {id, url, Lname,Fname,subtitle,followers, noofimages,date,followed } = props;
    const [isFollowing, setToggleFollow] = useState(followed);
    const userFollow={
        "peopleid": id
    };

    return (
        <div className="cardPeople"  >
            <div className="peopleAvatar">
                <img src={url} alt={Fname}></img>
            </div>
            <div className="peopleInfo">
                <div className="titleAndfollow">
                    <div>
                        <h6>{Fname} {Lname}</h6>
                        <span>{subtitle}</span>
                    </div>
                    {/* <div>
                        
                    {!isFollowing && <button className="buttonFollowed" onClick={toggleFollow}><FontAwesomeIcon icon={faPlus} color="DarkGrey" /> Follow</button>}
                    {isFollowing &&  <button className="buttonFollowing" onClick={toggleFollow}><FontAwesomeIcon icon={faCheck} color="DarkGrey" /> Following</button>}
                    </div> */}
                </div>
                <div className="cardLinks">
                    <span>
                    <a href="#">
                    <FontAwesomeIcon icon={faImage} color="DarkGrey" />
                    {noofimages}
                    </a>
                    </span>
                    <span>
                    <a href="#">
                    <FontAwesomeIcon icon={faUsers} color="DarkGrey" />
                    {followers}
                    </a>
                    </span>
                    <span className="last">joined at {date}</span>
                </div>
            </div>
        </div>
    )
}
export default PeopleCard
