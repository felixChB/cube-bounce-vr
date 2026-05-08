export interface PlayerStartInfo {
    playerNumber: number;
    position: { x: number, y: number, z: number };
    rotation: { x: number, y: number, z: number };
    color: string;
    used: boolean;
}

export interface SceneStartInfos {
    playCubeSize: { x: number, y: number, z: number };
    playCubeElevation: number;
    playerAreaDistance: number;
    playerAreaDepth: number;
    playerPaddleSize: { w: number, h: number };
    ballSize: number;
    ballStartPos: { x: number, y: number, z: number };
    ballColor: string;
    calculatedCubeHeight: number;
    midPointOfPlayCube: number;
}

// interface Ball {
//     position: { x: number, y: number, z: number };
//     counter: number;
// }

export interface PlayerGameData {
    id: string;
    position: { x: number, y: number, z: number };
    rotation: { x: number, y: number, z: number };
    contrPosR: { x: number, y: number, z: number };
    contrPosL: { x: number, y: number, z: number };
    contrRotR: { x: number, y: number, z: number };
    contrRotL: { x: number, y: number, z: number };
}

export interface PlayerData {
    id: string;
    color: string;
    playerNumber: number;
    score: number;
    isPlaying: boolean;
    inPosition: number;
    position: { x: number, y: number, z: number };
    rotation: { x: number, y: number, z: number };
    contrPosR: { x: number, y: number, z: number };
    contrPosL: { x: number, y: number, z: number };
    contrRotR: { x: number, y: number, z: number };
    contrRotL: { x: number, y: number, z: number };
}

export interface PreviousPlayerData {
    id: string;
    color: string;
    playerNumber: number;
    score: number;
    position: { x: number, y: number, z: number };
    rotation: { x: number, y: number, z: number };
    contrPosR: { x: number, y: number, z: number };
    contrPosL: { x: number, y: number, z: number };
    contrRotR: { x: number, y: number, z: number };
    contrRotL: { x: number, y: number, z: number };
    playerTime: number;
}