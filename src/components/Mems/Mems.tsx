import giga from "../../assets/1peAXbxtsCmWzQC8o9x9q-transformed.png"
import chi from "../../assets/криш.png"
import dgen from "../../assets/деген со слюной.png"
import giga_a from "../../assets/g3ox_em_-_GigaChad_Theme_76243200.mp3"
import degen_a from "../../assets/videoplayback.mp3"
import chi_a from "../../assets/ronaldo-siuuu-sound-effect-made-with-Voicemod.mp3"
import {FC, useEffect} from "react";

interface MemsProps {
    show: boolean
}
const audio_1 = new Audio(giga_a);
const audio_2 = new Audio(degen_a);
const audio_3 = new Audio(chi_a);


export const Giga:FC<MemsProps> = ({show}) => {
    useEffect(() => {
        if (show) {
            audio_1.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            audio_1.pause()
            audio_1.currentTime = 0;
        }
    }, [show]);

    if (!show) return;

    return (
        <div className="mems">
            <img src={giga} />
        </div>
    )
}
export const Degen:FC<MemsProps> = ({show}) => {
    useEffect(() => {
        if (show) {
            audio_2.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            audio_2.pause()
            audio_2.currentTime = 0;
        }
    }, [show]);

    if (!show) return;

    return (
        <div className="mems">
            <img src={dgen} />
        </div>
    )
}
export const Chi:FC<MemsProps> = ({show}) => {
    useEffect(() => {
        if (show) {
            audio_3.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            audio_3.pause()
            audio_3.currentTime = 0;
        }
    }, [show]);

    if (!show) return;

    return (
        <div className="mems">
            <img src={chi} />
        </div>
    )
}