/* 'config' is an object storing important values used throughout the app — kept at top for quick accessibility:
 *****************************************************************************************************************/

let config = {
    gameBoard: { size: 130 },
    gameState: {
        playerTurn: false,
        strictMode: false,
        gameOver: false,
        playerScore: { current: 0, winning: 20 },
        sequences: { key_sequence_player: [], key_sequence_computer: [] },
        computerPlayIndex: 0,
        intervals: { computerPlayArray: null }
    },
    keys: {
        soundDirectory: 'https://dl.dropboxusercontent.com/u/7797721/FreeCodeCamp/Simon/soundFiles/',
        btns: [],
        btnMaps: [],
        btnMapKeys: {
            'green': 'Q',
            'red': 'W',
            'yellow': 'A',
            'blue': 'S'
        }
    },
    footer: { credit: 'Made by John for <a href="http://www.freecodecamp.com">FreeCodeCamp</a>' },
    animation: {
        enabled: true,
        getReadyCountdown: { current: null, default: 3 },
        effect: {
            colorFlash: {
                colors: ['cyan', 'lime', 'black', 'darkpurple', 'pink'],
                borderSize: '2px solid',
                defaultBorderColor: '#CCC',
                interval: 50,
                timeout: 1000
            },
            countdown: {},
            zoom: {
                amount: 3,
                element: { current: null },
                fontSize: { small: 20, current: 20, big: 22 },
                interval: 300,
                zoomInInterval: null,
                zoomOutInterval: null
            }
        }
    }
};



/* UI_LABELS is an object that makes editing text values used throughout the app quick and easy!:
 *****************************************************************************************************************/

const UI_LABELS = {
    TITLE: 'Simon',
    SUBTITLE: '[Press Start]',
    TURN: {
        PLAYER: 'Your turn',
        COMPUTER: 'Computer\'s turn'
    },
    MESSAGES: {
        GET_READY: 'Get ready...',
        WELL_DONE: 'Well done!',
        TOO_BAD: 'Too bad!',
        OFF_CONFIRMATION: 'Progress will be lost. Are you sure?',
        COMPLETE: 'You win!',
        CONGRATULATIONS: 'Congratulations!'
    }
};
