import {observer} from "mobx-react-lite";
import {FC} from "react";
import {gameState} from "../../state/GameState.ts";
import TockensSvg from "../SVG/TockensSvg.tsx";

import './SmallBalance.css';

const SmallBalance:FC = observer(
    () => {
        return (
            <div className="small-balance">
                <div className="small-balance__title">Your balance:</div>
                <div className="small-balance__content">
                    <div className="small-balance__icon">
                        <TockensSvg />
                    </div>
                    <div className="small-balance__value">{gameState.balance}</div>
                </div>
            </div>
        )
    }
)


export default SmallBalance