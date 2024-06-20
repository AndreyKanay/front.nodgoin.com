import SmallCoinSvg from "../SVG/SmallCoinSvg.tsx";
import {gameState} from "../../state/GameState.ts";
import {observer} from "mobx-react-lite";
import {FC} from "react";

import './Counter.css';

const Counter:FC = () => {
    return (
        <div className="counter">
            <div className="counter__icon">
                <SmallCoinSvg />
            </div>
            <div className="counter__value">
                {gameState.balance}
            </div>
        </div>
    )
}

export default observer(Counter);