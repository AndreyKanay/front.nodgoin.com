import {FC, useRef} from "react";
import {userState} from "../../state/UserState.ts";
import {observer} from "mobx-react-lite";

import './Avatar.css'

interface AvatarProps {
    id?: string;
}

const Avatar:FC<AvatarProps> = ({id}) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className="avatar">
            <div className="avatar__inner">
                <img ref={imgRef} src={`https://robohash.org/${id || userState.user_id}?size=200x200&set=2`} alt=""
                     className="avatar__image"/>
            </div>
            <svg className="avatar__border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path className="cls-1" d="m47.75,9.61c-.42-2.67-1.39-5.52-3.25-7.49-.85-.89-1.93-1.6-3.13-1.82-1.08-.2-2.21-.2-3.29-.23-4.77-.15-9.54-.03-14.31.12-.33,0-.67.02-1,.04h-8.63c-1.58,0-3.19-.06-4.76.26-.66.14-1.31.38-1.91.7-.28.15-.55.32-.81.51-.14.1-.26.2-.39.3-.11.08-.21.17-.32.25-.03.02-.05.04-.09.06-.88.66-1.83,1.24-2.64,1.98-.91.83-1.56,1.92-1.85,3.14-.45,1.87-.12,3.78.05,5.66.2,2.14.33,4.3.34,6.45,0,1.87-.07,3.78-.41,5.6-.22,1.14-.5,2.27-.69,3.43-.46,2.81-.75,5.71-.61,8.56.12,2.47.52,5.45,2.35,7.25h0c1.4,1.38,3.31,2.2,5.19,2.48,2.54.38,5.13.29,7.69.44,1.93.11,3.87.32,5.8.46,1.96.14,3.93.22,5.9.25,3.52.04,7.07-.07,10.57-.52,1.34-.18,2.69-.38,4-.73,1.06-.28,2.1-.67,2.96-1.4,2.05-1.77,2.25-5,2.43-7.55.12-1.82.18-3.66.3-5.49.14-2.06.33-4.1.33-6.16,0-2.93-.41-5.88-.16-8.8.01-.15.03-.29.05-.45,0-.01.02-.18.02-.2,0-.04.01-.08.02-.12.05-.36.12-.72.2-1.07.13-.6.22-1.21.26-1.82.1-1.36,0-2.73-.22-4.08Zm-3.22,5.56c-.04.53-.12,1.05-.23,1.56-.07.31-.13.61-.17.92,0,.04-.02.08-.02.11.01-.06-.02.14-.02.16-.02.13-.03.26-.04.38-.21,2.5.14,5.03.14,7.54,0,1.77-.17,3.52-.28,5.28-.1,1.56-.16,3.14-.26,4.7-.15,2.18-.32,4.95-2.08,6.46-.73.63-1.63.96-2.53,1.2-1.12.3-2.28.47-3.42.63-3,.38-6.04.48-9.05.44-1.69-.02-3.37-.09-5.05-.21-1.66-.12-3.31-.3-4.97-.4-2.19-.12-4.41-.05-6.59-.37-1.62-.24-3.25-.94-4.45-2.12h0c-1.57-1.54-1.91-4.1-2.02-6.21-.12-2.44.13-4.92.52-7.33.16-.99.41-1.95.59-2.93.29-1.56.35-3.19.35-4.8,0-1.85-.12-3.69-.29-5.52-.14-1.61-.43-3.24-.04-4.84.25-1.05.81-1.98,1.59-2.69.7-.64,1.51-1.13,2.26-1.69.03-.02.05-.04.08-.05.09-.07.18-.14.27-.22.11-.09.22-.17.34-.26.23-.16.45-.31.7-.43.52-.28,1.07-.48,1.63-.6,1.34-.28,2.72-.22,4.07-.22h7.39c.28-.01.57-.02.86-.03,4.08-.13,8.17-.23,12.26-.1.93.03,1.9.03,2.82.2,1.03.19,1.96.79,2.68,1.56,1.59,1.69,2.42,4.12,2.78,6.41.18,1.15.27,2.33.19,3.49Z"/>
            </svg>
        </div>
    )
}

export default observer(Avatar);