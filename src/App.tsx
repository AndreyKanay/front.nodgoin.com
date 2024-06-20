import './App.css'
import {RouterProvider} from "react-router";
import {routes} from "./routes.tsx";
import {useEffect} from "react";
import {userState} from "./state/UserState.ts";
import {gameState} from "./state/GameState.ts";
import io from 'socket.io-client';
import {initInitData, isTMA, useViewport} from "@tma.js/sdk-react";
import {userService} from "./services/user.service.ts";
import config from "./config.ts";

const initialApp = async () => {
    const is_tma = await isTMA();
    let initData: any;

    if (is_tma) {
        initData = initInitData();
    } else {
        initData = {
            "authDate": new Date(),
            "hash": "6b1952aa240935757907743512f7252b6eed81ff384726c1c5b336ad6f80e9d1",
            "queryId": "AAFNZWovAAAAAE1lai92hN72",
            "user": {
                "allowsWriteToPm": true,
                "firstName": "Angry",
                "id": 795501901,
                "isPremium": true,
                "languageCode": "ru",
                "lastName": "Raven",
                "username": "angry_raven"
            },
        }
    }

    console.log(is_tma, initData.user.id)

    const user = await userService.getUser(initData.user.id)
    console.log(user)
    userState.setUserId(user.id)
    userState.setFirstName(user.first_name)
    userState.setLastName(user.last_name)
    userState.setLastVisit(new Date(user.last_visit))
    userState.setEndSession(new Date(user.end_session))

    gameState.setBalance(user.balance)
    gameState.setEnergy(user.energy)
    gameState.set_multi_tap_lvl(user.multi_tap_lvl)
    gameState.set_regeneration_speed_lvl(user.regeneration_speed_lvl)
    gameState.set_energy_limit_lvl(user.energy_limit_lvl)
    gameState.set_tip_top_bot(user.tip_top_bot)
    gameState.set_full_energy_boost(user.full_energy_boost)
    gameState.set_turbo_boost(user.turbo)

    const current_date = new Date();
    const current_time = current_date.getTime();
    const user_end_session_time = userState.end_session.getTime();
    const elapsed_time = current_time - user_end_session_time;

    if (userState.last_visit.getDay() !== current_date.getDay()) {
        gameState.set_full_energy_boost(3)
        gameState.set_turbo_boost(3)
        await userService.updateUserLastVisit(new Date())
    }
    if (gameState.tip_top_bot) {
        const coin_per_milliseconds = gameState.tap / 1000;
        const time =  Math.min(elapsed_time, config.max_time_for_tip_top_bot);
        const coins = Math.min(time * coin_per_milliseconds, config.max_coin_for_tip_top_bot);
        gameState.setBalance(gameState.balance + Math.floor(coins))
    }

    const energy_per_milliseconds = gameState.speed_energy / 1000; // Энергия за миллисекунду


    console.log(elapsed_time * energy_per_milliseconds)
    const energy_bonus = Math.min(elapsed_time * energy_per_milliseconds, gameState.total_energy)
    let energy = 0
    if (gameState.energy + energy_bonus >= gameState.total_energy) {
        energy = gameState.total_energy
    } else {
        energy = gameState.energy + energy_bonus
    }
    gameState.setEnergy(energy)

    return user.id;
}

function App() {
    const viewPort = useViewport(false)
    useEffect(() => {
        const Socket = io('/api', {
            path: '/api/socket.io',
            transports: ['websocket'],
          });
        initialApp().then((res) => {
            console.log(res);
            
            Socket.emit("send_user_id", {
                user_id: res
            })
        })
    }, [])

    useEffect(() => {
        // viewPort?.expand()
    }, [viewPort]);

    return (
        <div className="container">
            <RouterProvider router={routes}/>
        </div>
    )
}

export default App
