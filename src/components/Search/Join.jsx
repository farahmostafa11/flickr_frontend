import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {JoinGroup,UnJoinGroup} from '../../services/groupServices'
import './Join.css'
/** Renders Join or Leave button
 * @author Roaa Magdy
 * @namespace Join
 * @category Functional Component
 * @extends Component
 * @property {String} props.group_id -group id
 * @property {String} props.role -indicates role of user in group
 */
function Join(props) {
    const {group_id,role} = props;
     //const [data, setData] = useState({});
     console.log(group_id)
     const [isJoined, setToggleJoin] = useState(false);
    useEffect(() => {if(role){
        setToggleJoin(true);
        console.log({role});
    }},[]);
//////////////////////////////toggle function to handle pressing on join or leave action/////////////////////////
    /** toggle function to handle pressing on join or leave action and Toggle Join and Leave button
    * @memberof Follow
    * @method toggleFollow
    */
        async function toggleJoin(){
         if(isJoined===false){
            JoinGroup(group_id).then( response => {
                 setToggleJoin(!isJoined);
        
        })
    }
         else{
            UnJoinGroup(group_id).then( response => {
                setToggleJoin(!isJoined);
             })
     }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="HandleJoin">
             
                    {!isJoined && <button className="buttonJoined" onClick={toggleJoin}><FontAwesomeIcon className="hover" icon={faPlus} color="DarkGrey" /> Join</button>}
                    {isJoined &&  <button className="buttonJoining" onClick={toggleJoin}><FontAwesomeIcon icon={faCheck} color="DarkGrey" /> </button>}
                    
        </div>
    )
}

export default Join
