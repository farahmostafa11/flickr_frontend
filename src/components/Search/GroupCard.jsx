import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faComment} from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import configData from "../../config/development.json"

import './GroupCard.css'
import {Link} from "react-router-dom";
const SERVER_URL = configData.SERVER_URL ;
const endpoint = 'http://dropoids.me/api/v1/'
const staticAvatar= 'https://combo.staticflickr.com/pw/images/buddyicon00_m.png#22501572@N05'

/** Renders Group Card component to show group in search
 * @author Roaa Magdy
 * @namespace GroupCard
 * @category Functional Component
 * @extends Component
 * @property {String} props.group_id -Group id
 * @property {String} props.groupname -Group name
 * @property {Number} props.followers -Number of followers
 * @property {Number} props.noofimages -Number of images
 * @property {String} props.role -indicates role of user in group
 * @property {String} props.date -Date group started
 */
function GroupCard(props) {
    console.log(props)
    const { group_id, groupname,followers, noofimages,role,date } = props;
     const [data, setData] = useState({});
     const [isJoined, setToggleJoin] = useState(false);
     const navStyle={
        color:'white'
    };
     useEffect(() => {if(role === "member"){
        setToggleJoin(true);
        console.log(group_id);
        console.log(data)
    }},[]);
//////////////////////////////toggle function to handle pressing on join or leave action/////////////////////////
        async function toggleJoin(){
            if(isJoined===false){
            const { status } = await axios.post(endpoint+'/group/'+group_id+'/join',);
            if(status=== 200){
                
                setToggleJoin(!isJoined);
            }
            else{
                alert("UnAuthorized request or User not found");
            }
            }
            else{
            const { status } = await axios.delete(endpoint+'/group/'+group_id+'/leave',);
                if(status=== 200){
                
                setToggleJoin(!isJoined);
                   }
                    else{
                        alert("UnAuthorized request or User not found");
                    }
            }

            
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="cardGroup" >
            <div className="groupAvatar">
                <img src={staticAvatar} alt={groupname}></img>
            </div>
            <div className="groupInfo">
                <div className="titleAndjoin">
                    <div>
                        <h6>{groupname}</h6>
                        <span >Since {date}</span>
                    </div>
                    {/* <div>   
                    {!isJoined && <button className="buttonJoined" onClick={toggleJoin}><FontAwesomeIcon className="hover" icon={faPlus} color="DarkGrey" /> Join</button>}
                    {isJoined &&  <button className="buttonJoining" onClick={toggleJoin}><FontAwesomeIcon icon={faCheck} color="DarkGrey" /> </button>}
                    </div> */}
                </div>
                <div className="gcardLinks">
                    <Link style={navStyle}  to={`/Group/${group_id}/members`}>
                    <span>
                    <a href="#">
                    <FontAwesomeIcon icon={faUsers} color="DarkGrey" />
                    {followers}
                    </a>
                    </span>
                    </Link>
                    <Link style={navStyle}  to={`/Group/${group_id}/photos`}>
                    <span>
                    <a href="#">
                    <FontAwesomeIcon icon={faImage} color="DarkGrey" />
                    {noofimages}
                    </a>
                    </span>
                    </Link>
                    <span>
                    <a href="#">
                    <FontAwesomeIcon icon={faComment} color="DarkGrey" />
                    0
                    </a>
                    </span>
                    
                </div>
            </div>
        </div>
    )
}

export default GroupCard
