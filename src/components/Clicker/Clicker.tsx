import {FC, useRef, useState} from "react";
import CoinSvg from "../SVG/CoinSvg.tsx";

import "./Clicker.css"
import {gameState} from "../../state/GameState.ts";
import {AnimatePresence, motion} from "framer-motion";
import {observer} from "mobx-react-lite";

interface NumberInfo {
    id: string
    value: number
    x: number
    y: number
}

const numberAnimationDurationMs = 1500
const numberAnimationDurationSec = numberAnimationDurationMs / 1000


const Clicker: FC = observer(() => {
    const coinRef = useRef<HTMLDivElement>(null)
    const [numbers, setNumbers] = useState<NumberInfo[]>([])
    const [buttonTransform, setButtonTransform] = useState({
        scale: 1,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
    })

    const onTouchHandler = () => {
        if (gameState.x !== 1) {
            gameState.setBalance(gameState.balance + gameState.x)
        } else {
            gameState.setBalance(gameState.balance + gameState.tap)
            gameState.setEnergy(gameState.energy - gameState.tap)
        }
    }

    const onTouchStartHandler = (event: any) => {
        if (gameState.energy < gameState.tap) {
            return
        }
        if (coinRef.current) {
            const touch = event.touches[0]
            const rect = coinRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const offsetX = touch.clientX - centerX
            const offsetY = centerY - touch.clientY

            const rotateXValue = offsetY * 0.15
            const rotateYValue = offsetX * 0.15

            setButtonTransform({
                scale: 1,
                translateZ: -5,
                rotateX: rotateXValue,
                rotateY: rotateYValue,
            })

            const randomNumberBetweenTenAndMinusTen =
                Math.floor(Math.random() * 21) - 10

            const newNumber: NumberInfo = {
                id: `${Date.now()}`,
                value: gameState.x !== 1 ? gameState.x : gameState.tap,
                x: touch.clientX + randomNumberBetweenTenAndMinusTen,
                y: touch.clientY
            }

            setNumbers((prevNumbers) => [...prevNumbers, newNumber])

            setTimeout(() => {
                setNumbers((prevNumbers) =>
                    prevNumbers.filter((number) => number.id !== newNumber.id)
                )
            }, numberAnimationDurationMs)

            onTouchHandler()
        }
    }

    const onTouchEndHandler = () => {
        setButtonTransform({
            scale: 1,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
        })
    }

    return (
        <div className={`clicker ${gameState.energy < gameState.tap ? "clicker_is_disabled" : ""}`} ref={coinRef} onTouchStart={onTouchStartHandler} onTouchEnd={onTouchEndHandler}>
            <motion.div className="clicker__numbers">
                <AnimatePresence>
                    {numbers.map((number) => {
                        return (
                            <motion.div
                                key={number.id}
                                className="clicker__number"
                                initial={{opacity: 1, y: number.y - 390, x: number.x - 50}}
                                animate={{opacity: 0, y: number.y - 700}}
                                exit={{opacity: 0}}
                                transition={{duration: numberAnimationDurationSec}}
                            >
                                +{number.value}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
            <div className="clicker__button" style={{
                transform: `
                scale(${buttonTransform.scale})
                translateZ(${buttonTransform.translateZ}px)
                rotateX(${buttonTransform.rotateX}deg)
                rotateY(${buttonTransform.rotateY}deg)
              `,
            }}>
                <CoinSvg/>
            </div>

        </div>
    )
})

export default Clicker;