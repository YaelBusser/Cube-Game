import "./index.css";
import {Canvas} from "@react-three/fiber";
import {Suspense, useMemo} from "react";
import {Physics, RigidBody} from "@react-three/rapier";
import {KeyboardControls, Plane} from "@react-three/drei";
import Game from "../../components/scene/Game/index.jsx";

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
};

const Home = () => {
    const map = useMemo(
        () => [
            {name: Controls.forward, keys: ["ArrowUp", "KeyZ"]},
            {name: Controls.back, keys: ["ArrowDown", "KeyS"]},
            {name: Controls.left, keys: ["ArrowLeft", "KeyQ"]},
            {name: Controls.right, keys: ["ArrowRight", "KeyD"]},
            {name: Controls.jump, keys: ["Space"]},
        ],
        []
    );

    return (
        <div className={"home"}>
            <KeyboardControls map={map}>
                <Canvas shadows camera={{position: [-15, 3, 0], fov: 70}}>
                    <color attach="background" args={["#ececec"]}/>
                    <Suspense>
                        <Physics debug>
                            <Game/>
                        </Physics>
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </div>
    );
}

export default Home;
