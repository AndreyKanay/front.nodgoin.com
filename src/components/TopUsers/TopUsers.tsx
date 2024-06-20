import {observer} from "mobx-react-lite";
import {FC} from "react";

const TopUsers:FC = () => {
    return (
        <div className="top-users">
            <div className="top-users__count">
                
            </div>
            <div className="top-users__dot"></div>
            <div className="top-users__status">

            </div>
        </div>
    )
}

export default observer(TopUsers);