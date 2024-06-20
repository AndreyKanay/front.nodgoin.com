import Avatar from "../Avatar/Avatar.tsx";
import {userState} from "../../state/UserState.ts";
import {observer} from 'mobx-react-lite'
import {FC} from "react";
import TockensSvg from "../SVG/TockensSvg.tsx";
import CupSvg from "../SVG/CupSvg.tsx";

import './UserArea.css';

const UserArea:FC = () => {
    return (
        <div className="user-area">
            <div className="user-area__avatar">
                <Avatar />
                <svg viewBox="0 0 48 48">
                    <clipPath id="mask">
                        <path className="cls-1"
                              d="m41.62,5.26c-.73-.76-1.66-1.37-2.69-1.56-.92-.17-1.89-.17-2.83-.2-4.09-.13-8.19-.02-12.28.1-.28,0-.57.02-.86.03h-7.4c-1.36,0-2.74-.05-4.08.22-.57.12-1.12.32-1.64.6-.24.13-.47.28-.7.43-.12.08-.23.17-.34.26-.09.07-.18.14-.27.22-.02.02-.05.04-.08.05-.75.57-1.57,1.06-2.27,1.7-.78.71-1.33,1.64-1.59,2.69-.39,1.61-.1,3.24.04,4.85.17,1.83.28,3.68.29,5.53,0,1.61-.06,3.24-.35,4.8-.19.98-.43,1.95-.59,2.94-.39,2.41-.64,4.89-.52,7.33.1,2.12.45,4.67,2.02,6.21h0c1.2,1.19,2.84,1.89,4.46,2.13,2.18.32,4.4.25,6.6.37,1.66.1,3.32.28,4.98.4,1.68.12,3.37.19,5.06.21,3.02.04,6.06-.06,9.07-.45,1.15-.15,2.3-.32,3.43-.63.9-.24,1.8-.57,2.54-1.2,1.76-1.52,1.93-4.28,2.08-6.47.1-1.56.16-3.14.26-4.7.12-1.76.28-3.51.28-5.28,0-2.51-.35-5.04-.14-7.54.01-.13.02-.25.04-.38,0-.01.03-.22.02-.16,0-.04.01-.08.02-.11.05-.31.1-.61.17-.92.11-.51.19-1.03.23-1.56.09-1.17,0-2.34-.19-3.5-.36-2.29-1.19-4.73-2.78-6.42Z" />
                    </clipPath>
                </svg>
            </div>
            <div className="user-area__content">
                <div className="user-area__name">
                    {userState.first_name} {userState.last_name}
                </div>
                <div className="user-area__coins">
                    <TockensSvg/>
                </div>
            </div>
            <div className="user-area__status">
                <CupSvg/>
                Bronze
            </div>
        </div>
    )
}

export default observer(UserArea);