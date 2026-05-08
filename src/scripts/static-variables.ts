

export const ipAddress: string = '192.168.178.84';

export const refreshRate: number = 20; // 1000 / 60; // 60 FPS
export const autoJoin: boolean = false; // if true, players can join the game by entering the game area
export const gameTimeLength: number = 300000; // in milliseconds, 5 minutes

// ---------- GAME VARIABLES ----------
export const maxPlayers: number = 4;

export const ghostColor = '#bdbdbd';

const playCubeSize: { x: number, y: number, z: number } = { x: 1.2, y: 1.9, z: 1.2 }; // the size of the player cube in meters // the y value is the top of the cube
const playCubeElevation: number = 0.6; // the elevation of the player cube in meters
const playerAreaDepth: number = 1; // the depth of the player area in the z direction in meters
const playerAreaDistance: number = 0.2; // the distance from the player area to the wall in meters
const playerPaddleSize: { h: number, w: number } = { h: 0.2, w: 0.4 }; // the size of the player paddle in meters
const calculatedCubeHeight: number = playCubeSize.y - playCubeElevation;
const midPointOfPlayCube: number = ((playCubeSize.y - playCubeElevation) / 2) + playCubeElevation;

export const sceneVariables = {
    playCubeSize,
    playCubeElevation,
    playerAreaDistance,
    playerAreaDepth,
    calculatedCubeHeight,
    midPointOfPlayCube,
    playerPaddleSize,
};

export const ballStartVariables = {
    position: { x: 0, y: midPointOfPlayCube, z: 0 },
    color: '#1f53ff',
    speed: 0.01 * refreshRate / 10,
    size: 0.03,
};