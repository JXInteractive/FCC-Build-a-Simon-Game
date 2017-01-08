/* Create instances of Gameboard, Grid and Btn classes ('Btn' = coloured game key):
 *****************************************************************************************************/

const GAME_BOARD = new GameBoard({element: 'div', id: 'elem-gameboard', class: 'elem-gameboard'});
const GRID = new Grid({element: 'table', id: 'elem-grid-table', class: 'elem-grid-table'});

const GREEN_BTN = new Btn({id: 'elem-btn-green', class: 'elem-btn elem-btn-green', sound: 'sound-green'});
const YELLOW_BTN = new Btn({id: 'elem-btn-yellow', class: 'elem-btn elem-btn-yellow', sound: 'sound-yellow'});
const BLUE_BTN = new Btn({id: 'elem-btn-blue', class: 'elem-btn elem-btn-blue', sound: 'sound-blue'});
const RED_BTN = new Btn({id: 'elem-btn-red', class: 'elem-btn elem-btn-red', sound: 'sound-red'});



/* Create instances of Audio classes:
 *****************************************************************************************************/

const GREEN_SOUND = new Audio({id: 'sound-green', index: 0});
const YELLOW_SOUND = new Audio({id: 'sound-yellow', index: 1});
const BLUE_SOUND = new Audio({id: 'sound-blue', index: 2});
const RED_SOUND = new Audio({id: 'sound-red', index: 3});
const GAME_OVER_SOUND = new Audio({id: 'sound-gameover', index: 'gameover'});



/* Cache appropriately-named DOM elements as variables:
 *****************************************************************************************************/

const ELEM_POWER_BTN = document.getElementById('elem-power-btn');
const ELEM_STRICT_BTN = document.getElementById('elem-strict-btn');
const ELEM_RESTART_BTN = document.getElementById('elem-restart-btn');
const ELEM_OUTPUT_SCORE = document.getElementById('elem-output-score');
const ELEM_OUTPUT_TURN = document.getElementById('elem-output-turn');
const ELEM_OUTPUT_FEEDBACK = document.getElementById('elem-output-feedback');



/* 'UPDATE_UI' is a function for updating various UI elements (their innerHTML content):
 *****************************************************************************************************/

const UPDATE_UI = (o, showScore) => {
    ELEM_OUTPUT_TURN.innerHTML = o.outputTurn;
    ELEM_OUTPUT_FEEDBACK.innerHTML = o.outputFeedback;
    if (showScore) ELEM_OUTPUT_SCORE.innerHTML = `${config.gameState.playerScore.current} /  ${config.gameState.playerScore.winning}`;
};



/* 'GET_OBJ_FROM_TARGET' is a function for retrieving an object/class from a button/key pressed:
 *****************************************************************************************************/

const GET_OBJ_FROM_TARGET = (e) => {
    if (e == 'elem-btn-green') return config.keys.btnMaps[0][1];
    if (e == 'elem-btn-red') return config.keys.btnMaps[1][1];
    if (e == 'elem-btn-yellow') return config.keys.btnMaps[2][1];
    if (e == 'elem-btn-blue') return config.keys.btnMaps[3][1];
};



/* 'RESIZE_GAMEBOARD' is a function that does what it says — resizes the gameboard. This keeps the
   size of buttons/keys constrained to the outer bezel. Resizing is easy/less likely to break:
 *****************************************************************************************************/

const RESIZE_GAMEBOARD = (btn, gameboard) => {
    for (let i = 0; i < document.getElementsByClassName('elem-btn').length; i++) {
        document.getElementsByClassName('elem-btn')[i].style.width = btn + 'px';
        document.getElementsByClassName('elem-btn')[i].style.height = btn + 'px';
    }
    document.getElementById('elem-gameboard').style.width = (btn * 2 + 10) + 'px';
    document.getElementById('elem-gameboard').style.height = (btn * 2 + 6) + 'px';
};



/* 'FORMAT_GAMEBOARD'
 *****************************************************************************************************/

const FORMAT_GAMEBOARD = () => {
    let elemContainerHeight = document.getElementById('elem-container').offsetHeight;
    let elemGameboardHeight = document.getElementById('elem-gameboard').offsetHeight;
    let difference = elemContainerHeight - elemGameboardHeight;
    let marginTop = (difference / 2) - 10;
    document.getElementById('elem-gameboard').style.marginTop = marginTop + 'px';
};



/* On window resize, hide the footer (if the height < 490px) — or else center the gameboard:
 *****************************************************************************************************/

window.onresize = () => {
    if (window.innerHeight > 490) {
        document.getElementById('elem-footer').style.display = 'block';
        FORMAT_GAMEBOARD();
    } else {
        document.getElementById('elem-footer').style.display = 'none';
    }
}



/* GAME_OVER is a function that is called when the user inputs the wrong sequence of buttons/keys. It
   resets a number of values and the user has to try again. If strict mode is enabled, the user has
   to memorize a new sequence (of equal length) — think of it as hard mode!:
 *****************************************************************************************************/

const GAME_OVER = () => {
    config.gameState.gameOver = true;
    UPDATE_UI({ outputTurn: UI_LABELS.TURN.PLAYER, outputFeedback: UI_LABELS.MESSAGES.TOO_BAD }, true);
    document.getElementById('sound-gameover').play();
    setTimeout(() => {
        config.gameState.sequences.key_sequence_player = [];
        config.gameState.playerTurn = false;
        config.gameState.firstTime = false;
        ELEM_OUTPUT_SCORE.innerHTML = `${config.gameState.playerScore.current} /  ${config.gameState.playerScore.winning}`;
        if (config.gameState.strictMode) SHUFFLE(config.gameState.sequences.key_sequence_computer);
        config.gameState.gameOver = false;
        COMPUTER_TURN(true);
    }, 1800);
};



/* 'CONGRATULATIONS' is a function that ushers in the end screen (when user completes game):
 *****************************************************************************************************/

const CONGRATULATIONS = () => {
    UPDATE_UI({ outputTurn: UI_LABELS.MESSAGES.COMPLETE, outputFeedback: UI_LABELS.MESSAGES.CONGRATULATIONS }, `${config.gameState.playerScore.current} /  ${config.gameState.playerScore.winning}`);

    let topBtns = false;

    // Button/key press animation to signify game is complete!

    setInterval(() => {
        if (topBtns) {
            GREEN_BTN.getId().click();
            RED_BTN.getId().click();
        } else {
            YELLOW_BTN.getId().click();
            BLUE_BTN.getId().click();
        }
        topBtns = !topBtns;
    }, 300);

    // Reload window after 3 seconds:

    setTimeout(() => { location.reload(); }, 3000);
};



/* 'PLAYER_TURN' is a function that deals with user interactions during gameplay — checking whether
    what buttons/keys have been pressed and the actions to take:
 *****************************************************************************************************

    1. If user clicks a key, push it to the 'config.gameState.sequences.key_sequence_player' array (as an object)
    2. If 'config.gameState.sequences.key_sequence_player' is the same as 'config.gameState.sequences.key_sequence_computer', well done! Then call 'DETERMINE_WHOSE_TURN'
    3. If 'config.gameState.sequences.key_sequence_player' is the different than 'config.gameState.sequences.key_sequence_computer', gameover!
    _________________________________________________________________________________________
*/


const PLAYER_TURN = () => {
    UPDATE_UI({ outputTurn: UI_LABELS.TURN.PLAYER, outputFeedback: '<br/>' }, true);

    // 1a. User clicks coloured button/key:
    document.getElementById('elem-gameboard').onclick = (e) => {
    
        // 1b. If game is in gameover mode, i.e. the "too bad" message is showing — disable the following event actions:
        if (!config.gameState.gameOver) {
            let colour_btn_obj = GET_OBJ_FROM_TARGET(e.target.id);
            if (config.gameState.playerTurn) {
                config.gameState.sequences.key_sequence_player.push(colour_btn_obj);

                // 2. Check arrays are the same:
                if (config.gameState.sequences.key_sequence_player[config.gameState.sequences.key_sequence_player.length - 1] !== config.gameState.sequences.key_sequence_computer[config.gameState.sequences.key_sequence_player.length - 1]) {
                    
                    // 3. If arrays aren't the same, game over!
                    GAME_OVER();

                } else {
                    if (config.gameState.sequences.key_sequence_player.length === config.gameState.sequences.key_sequence_computer.length) {
                        if (config.gameState.sequences.key_sequence_player[config.gameState.sequences.key_sequence_player.length - 1] === config.gameState.sequences.key_sequence_computer[config.gameState.sequences.key_sequence_player.length - 1]) {
                            config.gameState.playerTurn = false;
                            config.gameState.sequences.key_sequence_player = [];
                            UPDATE_UI({ outputTurn: UI_LABELS.TURN.PLAYER, outputFeedback: UI_LABELS.MESSAGES.WELL_DONE });
                            ANIMATION.COLOUR_FLASH(config.animation.effect.colorFlash.interval, config.animation.effect.colorFlash.timeout, ['elem-btn', 'elem-ui-btn']);
                            config.gameState.playerScore.current++;
                            setTimeout(() => { DETERMINE_WHOSE_TURN(); }, config.animation.effect.colorFlash.timeout);
                        }
                    }
                }
            }
        }
    }
};



/* 'COMPUTER_TURN' is a function that generates the sequence of notes the play must memorize and play:
 *****************************************************************************************************

    1. Add a random note (colour button) to the array
    2. Play array (loop through colour buttons)
    3. Set 'config.gameState.playerTurn' to true
    4. Call 'DETERMINE_WHOSE_TURN' and PLAYER_TURN() will be called
    _________________________________________________________________________________________
*/

const COMPUTER_TURN = (replay) => {
    UPDATE_UI({ outputTurn: UI_LABELS.TURN.COMPUTER, outputFeedback: '<br/>' }, true);
    config.gameState.computerPlayIndex = 0;

    // 1. Add a random note (colour button/key) to the array:
    if (!replay) config.gameState.sequences.key_sequence_computer.push(config.keys.btns[Math.floor(Math.random() * config.keys.btns.length)]);

    // 2. Play array (loop through colour buttons):
    config.gameState.intervals.computerPlayArray = setInterval(() => {
        if (!config.gameState.playerTurn) {
            if (config.gameState.computerPlayIndex < config.gameState.sequences.key_sequence_computer.length) {
                config.gameState.sequences.key_sequence_computer[config.gameState.computerPlayIndex].getId().click();
                config.gameState.computerPlayIndex++;
            } else {

                // 3. Set 'config.gameState.playerTurn' to true:
                config.gameState.playerTurn = true;
                config.gameState.computerPlayIndex = 0;
                clearInterval(config.gameState.intervals.computerPlayArray);

                // 4. Call 'DETERMINE_WHOSE_TURN':
                setTimeout(() => { DETERMINE_WHOSE_TURN(); }, 200);
            }
        }  
    }, 600);
};



/* 'DETERMINE_WHOSE_TURN' is a function that does what it says — it calls either 'PLAYER_TURN' or
   'COMPUTER_TURN' depending on whether 'playerTurn' is true or false:
 *****************************************************************************************************/

const DETERMINE_WHOSE_TURN = () => {
    if (config.gameState.playerScore.current >= config.gameState.playerScore.winning) {
        CONGRATULATIONS();
    } else {
        config.gameState.playerTurn ? PLAYER_TURN() : COMPUTER_TURN();
    }
};



/* 'CONFIGURE_BTNS' is a function that assigns keyboard shortcuts to coloured keys/btns:
 *****************************************************************************************************/

const CONFIGURE_BTNS = () => {
    config.keys.btns = [GREEN_BTN, YELLOW_BTN, BLUE_BTN, RED_BTN];
    config.keys.btnMaps = [[config.keys.btnMapKeys.green, GREEN_BTN], [config.keys.btnMapKeys.red, RED_BTN], [config.keys.btnMapKeys.yellow, YELLOW_BTN], [config.keys.btnMapKeys.blue, BLUE_BTN]];
};



/* 'CREATE_GAME_SCREEN' is a function that does what it says — it creates the screen that users see
   when playing the game (the screen with the Simon board, score, etc.):
 *****************************************************************************************************/

const CREATE_GAME_SCREEN = () => {
    // 1. When "Stop" (the value of the 'power button') is pressed, reset the game, but first confirm with user:
    ELEM_POWER_BTN.onclick = () => { if (eval("confirm('" + UI_LABELS.MESSAGES.OFF_CONFIRMATION + "')")) location.reload(); };

    // 2. When "Strict" button is pressed, toggle strict mode (which shuffles the computer's button/key array):
    ELEM_STRICT_BTN.onclick = () => {
        config.gameState.strictMode = !config.gameState.strictMode
        ELEM_STRICT_BTN.innerHTML = config.gameState.strictMode ? '<i class="fa fa-toggle-on" aria-hidden="true"></i> Strict' : '<i class="fa fa-toggle-off" aria-hidden="true"></i> Strict';
    };

    ELEM_POWER_BTN.innerHTML = ELEM_POWER_BTN.innerHTML.replace('Start', 'Stop');

    // 3. Output "Get Ready" to the screen and count down — to allow the user to prepare for the game starting:
    UPDATE_UI({ outputTurn: UI_LABELS.MESSAGES.GET_READY, outputFeedback: '<br/>' }, true);
    config.animation.getReadyCountdown.current = config.animation.getReadyCountdown.default;
    let si = setInterval(() => { // use a setInterval function to countdown from predetermined value (see config object if you want to edit this ^)
        if (config.animation.getReadyCountdown.current > 0) {
            ELEM_OUTPUT_FEEDBACK.innerHTML = config.animation.getReadyCountdown.current;
            config.animation.getReadyCountdown.current--;
        } else {
            clearInterval(si);
        }
    }, 1000);

    // 4. Append the newly-generate gameboard, resize it, populate grid/table (each cell housing a coloured key/button) and create a footer:
    GAME_BOARD.appendTo(document.getElementById('elem-container'));
    POPULATE_GRID.INIT(document.getElementById('elem-gameboard'), [2, 2, 'elem-grid-table-td']);
    RESIZE_GAMEBOARD(config.gameBoard.size);
    FORMAT_GAMEBOARD();
    document.getElementById('elem-footer').innerHTML = config.footer.credit;
    CONFIGURE_BTNS();
    POPULATE_AUDIO.INIT();
    POPULATE_AUDIO.BTN_MAP(config.keys.btnMaps);
    setTimeout(() => { DETERMINE_WHOSE_TURN(); }, parseInt((config.animation.getReadyCountdown.default + 1) + '000'));
};



/* 'CREATE_GAME_SCREEN' is a function that does what it says — it creates the first screen the user
    sees upon visiting the app. They must click start to start the game:
 *****************************************************************************************************/

const CREATE_TITLE_SCREEN = () => {
    UPDATE_UI({ outputTurn: UI_LABELS.TITLE, outputFeedback: UI_LABELS.SUBTITLE }, false);
    ELEM_STRICT_BTN.disabled = true;
    ELEM_RESTART_BTN.disabled = true;
    ELEM_OUTPUT_TURN.classList.add('elem-output-title-screen');
    ELEM_POWER_BTN.onclick = () => {
        ELEM_OUTPUT_TURN.classList.remove('elem-output-title-screen');
        ELEM_OUTPUT_TURN.classList.add('elem-output-game-screen');
        ELEM_STRICT_BTN.disabled = false;
        ELEM_RESTART_BTN.disabled = false;
        ANIMATION.ZOOM_IN_AND_OUT.CLEAR();
        CREATE_GAME_SCREEN();
    }
    ANIMATION.ZOOM_IN_AND_OUT.INIT({element: ELEM_OUTPUT_FEEDBACK, fontSize: { small: 20, current: 20, big: 22 }, zoomInterval: 300, zoomAmount: 3 });
};



CREATE_TITLE_SCREEN();
