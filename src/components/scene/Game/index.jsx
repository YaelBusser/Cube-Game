import {Box, OrbitControls, useKeyboardControls} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {RigidBody, quat} from "@react-three/rapier";
import {useRef, useState} from "react";
import {Controls} from "../../../pages/Home";

import * as THREE from "three";

const Game = () => {
    const [hover, setHover] = useState(false);
    const cube = useRef();
    const [start, setStart] = useState(true);
    const jump = () => {
        if (isOnFloor.current) {
            cube.current.applyImpulse({x: 0, y: 5, z: 0});
            isOnFloor.current = false;
        }
    };

    const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
    const leftPressed = useKeyboardControls((state) => state[Controls.left]);
    const rightPressed = useKeyboardControls((state) => state[Controls.right]);
    const backPressed = useKeyboardControls((state) => state[Controls.back]);
    const forwardPressed = useKeyboardControls(
        (state) => state[Controls.forward]
    );

    const handleMovement = () => {
        if (!isOnFloor.current) {
            return;
        }
        if (rightPressed) {
            cube.current.applyImpulse({x: 0.1, y: 0, z: 0});
        }
        if (leftPressed) {
            cube.current.applyImpulse({x: -0.1, y: 0, z: 0});
        }

        if (forwardPressed) {
            cube.current.applyImpulse({x: 0, y: 0, z: -0.1});
        }
        if (backPressed) {
            cube.current.applyImpulse({x: 0, y: 0, z: 0.1});
        }
    };


    useFrame((_state, delta) => {
        if (jumpPressed) {
            jump();
        }
        handleMovement();

        if (!start) {
            return;
        }
    });

    const isOnFloor = useRef(true);

    return (
        <>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[-10, 10, 0]} intensity={0.4}/>
            <OrbitControls/>
            <RigidBody
                position={[-8, 1, 0]}
                ref={cube}
                onCollisionEnter={({other}) => {
                    if (other.rigidBodyObject.name === "floor") {
                        isOnFloor.current = true;
                    }
                }}
                onCollisionExit={({other}) => {
                    if (other.rigidBodyObject.name === "floor") {
                        isOnFloor.current = false;
                    }
                }}
            >
                <Box
                    onClick={() => setStart(true)}
                >
                    <meshNormalMaterial/>
                </Box>
            </RigidBody>
            <RigidBody type="fixed" name="floor">
                <Box position={[10, 0, 0]} args={[40, 0.2, 5]}>
                    <meshNormalMaterial/>
                </Box>
            </RigidBody>
        </>
    );
};

export default Game;
