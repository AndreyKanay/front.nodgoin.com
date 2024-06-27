import {useEffect, useState} from "react";
import Avatar from "../../components/Avatar/Avatar.tsx";
import TockensSvg from "../../components/SVG/TockensSvg.tsx";
import CupSvg from "../../components/SVG/CupSvg.tsx";
import ratingService from "../../services/rating.service.ts";
import {initUtils, useBackButton} from "@tma.js/sdk-react";
import {useNavigate} from "react-router-dom";
import squadService from "../../services/squad.service.ts";
import {userState} from "../../state/UserState.ts";

const RatingPage = () => {
    const [rating, setRating] = useState([]);
    const backButton = useBackButton();
    const navigate = useNavigate();
    const [title, setTitle] = useState("User Rating")
    const [ratingTab, setRatingTab] = useState<number>(0)
    const [mySquad, setMySquad] = useState<any | null>(null);
    useEffect(() => {
        ratingService.getUserRating().then(r => {
            setRating(r)
        });

        squadService.getMySquad(String(userState.user_id).length === 0 ? "980b6e7f-3d3c-47fa-ba9f-9be5a588944f" : String(userState.user_id)).then(res => {
            setMySquad(res)
        });


        backButton.show();
        backButton.on('click', () => {
            navigate(-1)
        })
    }, []);

    const changeTab = (tab_id: number) => {
        if (tab_id === 0) {
            setTitle('User Rating')
            setRatingTab(0)

            ratingService.getUserRating().then(r => {
                setRating(r)
            });
        }
        if (tab_id === 1) {
            setTitle('Referrals Balance')
            setRatingTab(1)
            ratingService.getReferralBalanceRating().then(r => {
                setRating(r)
            });
        }

        if (tab_id === 2) {
            setTitle('Referrals Count')
            setRatingTab(2)
            ratingService.getReferralCountRating().then(r => {
                setRating(r)
            });
        }

        if (tab_id === 3) {
            setTitle('Squads')
            setRatingTab(3)
            squadService.getTopSquad().then(r => {
                setRating(r)
            });
        }

    }

    return (
        <div className="rating-page">
            <div className="rating-page__header">
                <div className="rating-page__title">{title}</div>
            </div>
            <div className="menu">
                <div className={`rating-page__tab ${ratingTab === 0 ? 'rating-page__tab_is_active' : ''}`}
                     onClick={() => changeTab(0)}>Users
                </div>
                <svg className="vertical-drawer" viewBox="0 0 2.89 46.17">
                    <path className="cls-1"
                          d="M.48,1.25c.03.15.05.3.08.45.01.08.02.15.03.23,0,.04,0,.04,0,.06,0,0,0,0,0,.03.03.25.06.5.09.75.16,1.52.21,3.05.19,4.58-.05,3.61-.72,7.17-.83,10.78-.18,6.01.35,11.99.4,17.99.02,3.03-.19,6.07-.44,9.09-.11,1.28,1.89,1.28,2,0,.22-2.7.39-5.41.43-8.12.04-2.49-.14-4.98-.23-7.46-.14-3.46-.24-6.92-.18-10.38.03-1.61.09-3.22.24-4.82.18-1.96.5-3.9.58-5.88.11-2.59.07-5.28-.44-7.83C2.16-.54.23,0,.48,1.25Z"></path>
                </svg>
                <div className={`rating-page__tab ${ratingTab === 1 ? 'rating-page__tab_is_active' : ''}`}
                     onClick={() => changeTab(1)}>Referrals <br/> balance
                </div>
                <svg className="vertical-drawer" viewBox="0 0 2.89 46.17">
                    <path className="cls-1"
                          d="M.48,1.25c.03.15.05.3.08.45.01.08.02.15.03.23,0,.04,0,.04,0,.06,0,0,0,0,0,.03.03.25.06.5.09.75.16,1.52.21,3.05.19,4.58-.05,3.61-.72,7.17-.83,10.78-.18,6.01.35,11.99.4,17.99.02,3.03-.19,6.07-.44,9.09-.11,1.28,1.89,1.28,2,0,.22-2.7.39-5.41.43-8.12.04-2.49-.14-4.98-.23-7.46-.14-3.46-.24-6.92-.18-10.38.03-1.61.09-3.22.24-4.82.18-1.96.5-3.9.58-5.88.11-2.59.07-5.28-.44-7.83C2.16-.54.23,0,.48,1.25Z"></path>
                </svg>
                <div className={`rating-page__tab ${ratingTab === 2 ? 'rating-page__tab_is_active' : ''}`}
                     onClick={() => changeTab(2)}>Referrals <br/> count
                </div>
                <svg className="vertical-drawer" viewBox="0 0 2.89 46.17">
                    <path className="cls-1"
                          d="M.48,1.25c.03.15.05.3.08.45.01.08.02.15.03.23,0,.04,0,.04,0,.06,0,0,0,0,0,.03.03.25.06.5.09.75.16,1.52.21,3.05.19,4.58-.05,3.61-.72,7.17-.83,10.78-.18,6.01.35,11.99.4,17.99.02,3.03-.19,6.07-.44,9.09-.11,1.28,1.89,1.28,2,0,.22-2.7.39-5.41.43-8.12.04-2.49-.14-4.98-.23-7.46-.14-3.46-.24-6.92-.18-10.38.03-1.61.09-3.22.24-4.82.18-1.96.5-3.9.58-5.88.11-2.59.07-5.28-.44-7.83C2.16-.54.23,0,.48,1.25Z"></path>
                </svg>
                <div className={`rating-page__tab ${ratingTab === 3 ? 'rating-page__tab_is_active' : ''}`}
                     onClick={() => changeTab(3)}>Squads
                </div>
            </div>

            <div className="rating-page__content">
                {ratingTab === 3 ? mySquad ? (
                    <div className="squad">
                        <div className="section-title">You squad:</div>
                        <div className="user-area">
                            <div className="user-area__pos"></div>
                            <div className="user-area__avatar">
                                <Avatar id={mySquad.id}/>
                            </div>
                            <div className="user-area__content">
                                <div className="user-area__name">
                                    {mySquad.name}
                                </div>
                                <div className="user-area__coins">
                                    <TockensSvg/>
                                    {mySquad.total_balance}
                                    <span> Users: {mySquad.count}</span>
                                </div>
                            </div>
                            <div className="user-area__share" onClick={() => {
                                const  utils = initUtils()
                                utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/nodgoin_bot/?start=squad_${mySquad.id}&text=Huy frean, join my squad`)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                     viewBox="0 0 50 50">
                                    <path
                                        d="M 40 0 C 34.53125 0 30.066406 4.421875 30 9.875 L 15.90625 16.9375 C 14.25 15.71875 12.207031 15 10 15 C 4.488281 15 0 19.488281 0 25 C 0 30.511719 4.488281 35 10 35 C 12.207031 35 14.25 34.28125 15.90625 33.0625 L 30 40.125 C 30.066406 45.578125 34.53125 50 40 50 C 45.511719 50 50 45.511719 50 40 C 50 34.488281 45.511719 30 40 30 C 37.875 30 35.902344 30.675781 34.28125 31.8125 L 20.625 25 L 34.28125 18.1875 C 35.902344 19.324219 37.875 20 40 20 C 45.511719 20 50 15.511719 50 10 C 50 4.488281 45.511719 0 40 0 Z M 40 2 C 44.429688 2 48 5.570313 48 10 C 48 14.429688 44.429688 18 40 18 C 38.363281 18 36.859375 17.492188 35.59375 16.65625 C 35.46875 16.238281 35.089844 15.949219 34.65625 15.9375 C 34.652344 15.933594 34.628906 15.941406 34.625 15.9375 C 33.230469 14.675781 32.292969 12.910156 32.0625 10.9375 C 32.273438 10.585938 32.25 10.140625 32 9.8125 C 32.101563 5.472656 35.632813 2 40 2 Z M 30.21875 12 C 30.589844 13.808594 31.449219 15.4375 32.65625 16.75 L 19.8125 23.1875 C 19.472656 21.359375 18.65625 19.710938 17.46875 18.375 Z M 10 17 C 11.851563 17 13.554688 17.609375 14.90625 18.65625 C 14.917969 18.664063 14.925781 18.679688 14.9375 18.6875 C 14.945313 18.707031 14.957031 18.730469 14.96875 18.75 C 15.054688 18.855469 15.160156 18.9375 15.28125 19 C 15.285156 19.003906 15.308594 18.996094 15.3125 19 C 16.808594 20.328125 17.796875 22.222656 17.96875 24.34375 C 17.855469 24.617188 17.867188 24.925781 18 25.1875 C 17.980469 25.269531 17.96875 25.351563 17.96875 25.4375 C 17.847656 27.65625 16.839844 29.628906 15.28125 31 C 15.1875 31.058594 15.101563 31.132813 15.03125 31.21875 C 13.65625 32.332031 11.914063 33 10 33 C 5.570313 33 2 29.429688 2 25 C 2 20.570313 5.570313 17 10 17 Z M 19.8125 26.8125 L 32.65625 33.25 C 31.449219 34.5625 30.589844 36.191406 30.21875 38 L 17.46875 31.625 C 18.65625 30.289063 19.472656 28.640625 19.8125 26.8125 Z M 40 32 C 44.429688 32 48 35.570313 48 40 C 48 44.429688 44.429688 48 40 48 C 35.570313 48 32 44.429688 32 40 C 32 37.59375 33.046875 35.433594 34.71875 33.96875 C 34.742188 33.949219 34.761719 33.929688 34.78125 33.90625 C 34.785156 33.902344 34.808594 33.910156 34.8125 33.90625 C 34.972656 33.839844 35.113281 33.730469 35.21875 33.59375 C 36.554688 32.597656 38.199219 32 40 32 Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button className="button" onClick={() => navigate("/squad/create")}>Create Squad</button>
                ) : null}
                {ratingTab === 3 ? <div className="section-title">Top squads:</div> : null}
                {rating.map((item: any, index: number) => {
                    return (
                        <div className="user-area">
                            <div className="user-area__pos">{index + 1}</div>
                            <div className="user-area__avatar">
                                <Avatar id={item.id}/>
                                <svg viewBox="0 0 48 48">
                                    <clipPath id="mask">
                                        <path className="cls-1"
                                              d="m41.62,5.26c-.73-.76-1.66-1.37-2.69-1.56-.92-.17-1.89-.17-2.83-.2-4.09-.13-8.19-.02-12.28.1-.28,0-.57.02-.86.03h-7.4c-1.36,0-2.74-.05-4.08.22-.57.12-1.12.32-1.64.6-.24.13-.47.28-.7.43-.12.08-.23.17-.34.26-.09.07-.18.14-.27.22-.02.02-.05.04-.08.05-.75.57-1.57,1.06-2.27,1.7-.78.71-1.33,1.64-1.59,2.69-.39,1.61-.1,3.24.04,4.85.17,1.83.28,3.68.29,5.53,0,1.61-.06,3.24-.35,4.8-.19.98-.43,1.95-.59,2.94-.39,2.41-.64,4.89-.52,7.33.1,2.12.45,4.67,2.02,6.21h0c1.2,1.19,2.84,1.89,4.46,2.13,2.18.32,4.4.25,6.6.37,1.66.1,3.32.28,4.98.4,1.68.12,3.37.19,5.06.21,3.02.04,6.06-.06,9.07-.45,1.15-.15,2.3-.32,3.43-.63.9-.24,1.8-.57,2.54-1.2,1.76-1.52,1.93-4.28,2.08-6.47.1-1.56.16-3.14.26-4.7.12-1.76.28-3.51.28-5.28,0-2.51-.35-5.04-.14-7.54.01-.13.02-.25.04-.38,0-.01.03-.22.02-.16,0-.04.01-.08.02-.11.05-.31.1-.61.17-.92.11-.51.19-1.03.23-1.56.09-1.17,0-2.34-.19-3.5-.36-2.29-1.19-4.73-2.78-6.42Z"/>
                                    </clipPath>
                                </svg>
                            </div>
                            <div className="user-area__content">
                                <div className="user-area__name">
                                    {ratingTab === 3 ? item.name : `${item.first_name} ${item.last_name}`}
                                </div>
                                <div className="user-area__coins">
                                    {ratingTab === 2 ? (<span>Count: {item.referral_count}</span>) : (
                                        <><TockensSvg/> {item.balance || Math.round(item.total_balance)}</>
                                    )}
                                    {ratingTab === 3 ? (
                                        <span> Users: {item.count}</span>
                                    ) : null}
                                </div>
                            </div>
                            {ratingTab !== 3 ? (
                                <div className="user-area__status">
                                    <CupSvg/>
                                    Bronze
                                </div>
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RatingPage;