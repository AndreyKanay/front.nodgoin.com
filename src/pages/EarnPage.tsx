import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBackButton, useUtils} from "@tma.js/sdk-react";
import taskService from "../services/task.service.ts";
import CoinSvg from "../components/SVG/CoinSvg.tsx";
import {gameState} from "../state/GameState.ts";

const EarnPage = () => {
    const navigate = useNavigate();
    const backButton = useBackButton();
    const [tasks, setTasks] = useState([])
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
                                utils.openTelegramLink(item.url)
                                setTasks(tasks.filter((i: any) => i.id !== item.id))
                                taskService.completeTask(item.id).then();
                                gameState.setBalance(gameState.balance + item.award)
                            }}>
                                <div className="task__content">
                                    <div className="task__name">{item.name}</div>
                                    <div className="task__desc">{item.description}</div>
                                </div>
                                <div className="task__award">
                                    <CoinSvg />
                                    {item.award}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default EarnPage;