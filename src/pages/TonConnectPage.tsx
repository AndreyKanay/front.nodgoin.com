import {FC} from "react";
import CoinSvg from "../components/SVG/CoinSvg.tsx";
import TitleSvg from "../components/SVG/TitleSvg.tsx";
import DgenSvg from "../components/SVG/DgenSvg.tsx";
import ConnectButtonSvg from "../components/SVG/ConnectButtonSvg.tsx";

const TonConnectPage: FC = () => {
    return (
        <div className="ton-connect-page">
            <div className="ton-connect-page__inner">
                <div className="ton-connect-page__title">
                    <TitleSvg />
                </div>
                <div className="ton-connect-page__dgen">
                    <DgenSvg />
                </div>
                <div className="ton-connect-page__coin">
                    <CoinSvg />
                </div>
                <div className="ton-connect-page__button">
                    <ConnectButtonSvg />
                </div>
            </div>
        </div>
    )
}

export default TonConnectPage;