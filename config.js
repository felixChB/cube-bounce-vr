////////////////// CONFIG FILE //////////////////

// This file contains all configuration variables of the project to adjust the project to your needs.
// Make all changes here, do not change any other file


//// CHANGE THIS TO YOUR LOCAL IP ADDRESS ////
export const ipAdress = '192.168.178.84';
//////////////////////////////////////////////

//// Server settings ////
export const serverRefreshRate = 5; // time between server updates in milliseconds

//// Basic Game  settings ////
export const gameTimeLength = 10; // the Game Length in seconds, 5 minutes = 300s
export const maxPlayers = 4; // the maximum number of players that can join the game
export const showResultsTime = 15; // the time to show the results after the game ends in seconds

// Game Scores Settings
export const scoreAddOnHit = 1; // the score added to a players score when they hit the ball
export const scoreSubtractOnMiss = 1; // the score subtracted from a players score when they miss the ball

//// Game Area sizes and settings ////
export const playCubeSize = { x: 1.2, y: 1.9, z: 1.2 }; // the size of the player cube in meters // the y value is the top of the cube
export const playCubeElevation = 0.6; // the elevation of the player cube in meters
export const playerAreaDepth = 1; // the depth of the player area in the z direction in meters
export const playerAreaDistance = 0.2; // the distance from the player area to the wall in meters
export const playerPaddleSize = { h: 0.2, w: 0.4 }; // the size of the player plane in meters
export const ballStartSpeed = 0.01 * serverRefreshRate / 10;

//// Leaderboard settings ////
export const leaderboardLength = 10; // the length of the leaderboard

//// Server Auto join settings ////
export const autoJoin = false; // if true, players can join the game automatically by entering the game area
export const firstEnteredTimerTime = 5000; // in milliseconds
export const areaExitTimerTime = 3000; // in milliseconds
export const areaEnteredTimerTime = 3000; // in milliseconds
export const enteredDelayTime = 1000; // in milliseconds
export const exitDelayTime = 1000; // in milliseconds