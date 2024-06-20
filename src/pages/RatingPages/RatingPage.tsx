import {useEffect, useState} from "react";
import Avatar from "../../components/Avatar/Avatar.tsx";
import TockensSvg from "../../components/SVG/TockensSvg.tsx";
import CupSvg from "../../components/SVG/CupSvg.tsx";
import ratingService from "../../services/rating.service.ts";
import {useBackButton} from "@tma.js/sdk-react";
import {useNavigate} from "react-router-dom";

const RatingPage = () => {
    const [rating, setRating] = useState([]);
    // const backButton = useBackButton();
    const navigate = useNavigate();
    const [title, setTitle] = useState("User Rating")
    const [ratingTab, setRatingTab] = useState<number>(0)
    // useEffect(() => {
    //     ratingService.getUserRating().then(r => {
    //         setRating(r)
    //     });
    //
    //     backButton.show();
    //     backButton.on('click', () => {
    //         navigate(-1)
    //     })
    // }, []);

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
            </div>

            <div className="rating-page__content">
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
                                    {item.first_name} {item.last_name}
                                </div>
                                <div className="user-area__coins">
                                    {ratingTab === 2 ? (<span>Count: {item.referral_count}</span>) : (
                                        <><TockensSvg/> {item.balance || Math.round(item.total_balance)}</>
                                    )}
                                </div>
                            </div>
                            <div className="user-area__status">
                                <CupSvg/>
                                Bronze
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RatingPage;