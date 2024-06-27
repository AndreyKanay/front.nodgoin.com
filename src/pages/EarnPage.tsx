import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBackButton, useUtils} from "@tma.js/sdk-react";
import taskService from "../services/task.service.ts";
import CoinSvg from "../components/SVG/CoinSvg.tsx";
import {gameState} from "../state/GameState.ts";

const EarnPage = () => {
    const navigate = useNavigate();
    const backButton = useBackButton();
    const [tasks, setTasks] = useState<any[]>([])
    const utils = useUtils()
    useEffect(() => {
        backButton.show();
        backButton.on('click', () => {
            navigate(-1)
        })

        taskService.getTasks().then(res => {
            setTasks(res);
        })
    }, []);
    return (
        <div className="earn">
            <div className="earn__header">
                <div className="earn__title">Earn</div>
            </div>
            <div className="earn__content">
                {tasks.length === 0 ? <div className="empty">:-(</div> : (
                    <div className="earn__list">
                        {tasks.map((item: any) => (
                            <div className="task" key={item.id} onClick={() => {

                                if (!item.complete) {
                                    if (item.url.indexOf("https://t.me") !== -1) {
                                        utils.openTelegramLink(item.url)
                                    } else {
                                        utils.openLink(item.url)
                                    }

                                    taskService.completeTask(item.id).then(() => {
                                        setTimeout(() => {
                                            taskService.getTasks().then(res => {
                                                setTasks(res);
                                                gameState.setBalance(gameState.balance + item.award)
                                            });
                                        }, 2500)

                                    });
                                }
                            }}>
                                <div className="task__content">
                                    <div className="task__name">{item.name}</div>
                                    <div className="task__desc">{item.description}</div>
                                </div>
                                {item.complete ? (
                                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17 9L9.99998 16L6.99994 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                    </svg>
                                ) : (
                                    <div className="task__award">
                                        <CoinSvg/>
                                        {item.award}
                                    </div>
                                )
                                }

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default EarnPage;