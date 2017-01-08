/* 'Element' is a class with with methods for constructing and appending DOM elements:
 *****************************************************************************************************/

class Element {
  constructor(o) {
    this.element = o.element;
    this.id = o.id;
    this.type = o.type;
    this.name = o.name;
    this.role = o.role;
    this.class = o.class;
    this.style = o.style;
    this.sound = o.sound;
    if (o.aria) this.aria = o.aria;
  }
  appendTo(element) {
    let elem = document.createElement(this.element);
    for (let property in this) elem.setAttribute(property, this[property]);
    element.appendChild(elem);
  }
};



/* 'GameBoard':
 *****************************************************************************************************/

class GameBoard extends Element {
	constructor(o) {
  	super(o);
  }
};



/* 'Grid':
 *****************************************************************************************************/

class Grid extends Element {
  constructor(o) {
    super(o);
  }
  addCells(o) {
    if (!document.getElementById(this.id)) {
      console.error(`${this.id} must be appended to DOM before you can add cells to it.`)
    } else {
      for (let i = 0; i < o.rows; i++) {
        let row = document.getElementById(this.id).insertRow();
        for (let j = 0; j < o.cols; j++) {
          let cell = row.insertCell();
          cell.className = o.cellClass;
          cell.id = 'elem-grid-table-' + 'r' + parseInt(i + 1) + 'c' + parseInt(j + 1);
        }
      }
    }
  }
  populateCells(o) {
    if (GREEN_BTN) GRID.CELLS.TOP_LEFT = document.getElementById(o.TOP_LEFT);
    if (RED_BTN) GRID.CELLS.TOP_RIGHT = document.getElementById(o.TOP_RIGHT);
    if (YELLOW_BTN) GRID.CELLS.BOTTOM_LEFT = document.getElementById(o.BOTTOM_LEFT);
    if (BLUE_BTN) GRID.CELLS.BOTTOM_RIGHT = document.getElementById(o.BOTTOM_RIGHT);
  }
};



/* 'Btn':
 *****************************************************************************************************/

class Btn extends Element {
  constructor(o) {
    o.element = 'button'
    super(o);
  }
  getId() {
    return document.getElementById(this.id);
  }
  playSound() {
    document.getElementById(this.sound).play();
  }
};



/* 'Audio':
 *****************************************************************************************************/

class Audio {
  constructor(o) {
    this.url = config.keys.soundDirectory;
    this.id = o.id;
    this.index = o.index;
    this.element = o.element;
  }
  createAudio(elem) {
    let audio = document.createElement('audio');
    audio.id = this.id;
    elem.appendChild(audio);
  }
  createSource(format, type) {
    let source = document.createElement('source');
    source.src = config.keys.soundDirectory + this.index + format;
    source.type = 'audio/' + type;
    document.getElementById(this.id).appendChild(source);
  }
  createAudioWithSources(o) {
    this.createAudio(document.body);
    this.createSource('.mp3', 'mpeg');
    this.createSource('.ogg', 'ogg');
  }
};



/* 'ANIMATION_HELPER' is an object whose methods provide additional functionality to ANIMATION methods:
 *****************************************************************************************************************/

const ANIMATION_HELPER = {
  ZOOM_HELPER: {
    IN: () => {
      config.animation.effect.zoom.zoomInInterval = setInterval(() => {
        if (config.animation.effect.zoom.fontSize.current < config.animation.effect.zoom.fontSize.big) {
          config.animation.effect.zoom.fontSize.current += config.animation.effect.zoom.amount;
        } else {
          clearInterval(config.animation.effect.zoom.zoomInInterval);
          ANIMATION_HELPER.ZOOM_HELPER.OUT();
        }
      }, config.animation.effect.zoom.interval);
      config.animation.effect.zoom.element.current.style.fontSize = config.animation.effect.zoom.fontSize.current + 'px';
    },

    OUT: (o) => {
      config.animation.effect.zoom.zoomOutInterval = setInterval((o) => {
        if (config.animation.effect.zoom.fontSize.current > config.animation.effect.zoom.fontSize.small) {
          config.animation.effect.zoom.fontSize.current -= config.animation.effect.zoom.amount;
        } else {
          clearInterval(config.animation.effect.zoom.zoomOutInterval);
          ANIMATION_HELPER.ZOOM_HELPER.IN();
        }
      }, config.animation.effect.zoom.interval);
      config.animation.effect.zoom.element.current.style.fontSize = config.animation.effect.zoom.fontSize.current + 'px';
    },
  }
};



/* ANIMATION is an object with a number of (customizable) animation methods:
 *****************************************************************************************************************/

const ANIMATION = {
  COLOUR_FLASH: (interval, timeout, classesArr) => {
    let changeBorder = (classname, borderStyle) => { for (let i = 0; i < document.getElementsByClassName('elem-btn').length; i++) document.getElementsByClassName('elem-btn')[i].style.border = borderStyle; };
    let wellDoneSequence = setInterval(() => {
      for (let i = 0; i < classesArr.length; i++) changeBorder(classesArr[i], `${config.animation.effect.colorFlash.borderSize} ${config.animation.effect.colorFlash.colors[Math.floor(Math.random() * config.animation.effect.colorFlash.colors.length)]}`);
      ELEM_OUTPUT_FEEDBACK.style.color = config.animation.effect.colorFlash.colors[Math.floor(Math.random() * config.animation.effect.colorFlash.colors.length)];
    }, interval);
    setTimeout(() => {
      clearInterval(wellDoneSequence);
      ELEM_OUTPUT_FEEDBACK.style.color = '#000';
      for (let i = 0; i < classesArr.length; i++) changeBorder(classesArr[i], `${config.animation.effect.colorFlash.borderSize} ${config.animation.effect.colorFlash.defaultBorderColor}`);
    }, timeout);
  },
  ZOOM_IN_AND_OUT: {
    INIT: (o) => {
      config.animation.effect.zoom.fontSize.small = o.fontSize.small;
      config.animation.effect.zoom.fontSize.current = o.fontSize.current;
      config.animation.effect.zoom.fontSize.big = o.fontSize.big;
      config.animation.effect.zoom.element.current = o.element;
      config.animation.effect.zoom.interval = o.zoomInterval;
      config.animation.effect.zoom.amount = o.zoomAmount;
      ANIMATION_HELPER.ZOOM_HELPER.IN();
    },
    CLEAR: () => {
      clearInterval(config.animation.effect.zoom.zoomInInterval);
      clearInterval(config.animation.effect.zoom.zoomOutInterval);
      config.animation.effect.zoom.fontSize.current = config.animation.effect.zoom.fontSize.small;
    }
  }
};



/* 'POPULATE_GRID':
 ******************************************************************************************************/

const POPULATE_GRID = {
  INIT: (elem, arr) => {
    POPULATE_GRID.APPEND(elem);
    POPULATE_GRID.ADD_CELLS(arr[0], arr[1], arr[2]);
    POPULATE_GRID.CACHE();
    POPULATE_GRID.ADD_KEYS();
  },
  APPEND: (element) => GRID.appendTo(element),
  ADD_CELLS: (rows, cols, cellClasses) => GRID.addCells({
    rows: rows,
    cols: cols,
    cellClasses: cellClasses
  }),
  ADD_KEYS: () => {
    if (GREEN_BTN) GREEN_BTN.appendTo(GRID.CELLS.TOP_LEFT);
    if (RED_BTN) RED_BTN.appendTo(GRID.CELLS.TOP_RIGHT);
    if (YELLOW_BTN) YELLOW_BTN.appendTo(GRID.CELLS.BOTTOM_LEFT);
    if (BLUE_BTN) BLUE_BTN.appendTo(GRID.CELLS.BOTTOM_RIGHT);
  },
  CACHE: () => {
    GRID.CELLS = {};
    if (GREEN_BTN) GRID.CELLS.TOP_LEFT = document.getElementById('elem-grid-table-r1c1');
    if (RED_BTN) GRID.CELLS.TOP_RIGHT = document.getElementById('elem-grid-table-r1c2');
    if (YELLOW_BTN) GRID.CELLS.BOTTOM_LEFT = document.getElementById('elem-grid-table-r2c1');
    if (BLUE_BTN) GRID.CELLS.BOTTOM_RIGHT = document.getElementById('elem-grid-table-r2c2');
  }
};



/* 'POPULATE_AUDIO':
 *****************************************************************************************************/

const POPULATE_AUDIO = {
  INIT: () => {
    GREEN_SOUND.createAudioWithSources();
    YELLOW_SOUND.createAudioWithSources();
    BLUE_SOUND.createAudioWithSources();
    RED_SOUND.createAudioWithSources();
    GAME_OVER_SOUND.createAudioWithSources();
    POPULATE_AUDIO.EVENT_BIND();
  },
  BTN_MAP: (arr) => {
    window.onkeypress = (e) => {
      let element = null;
      for (var i = 0; i < arr.length; i++) {
        if (e.code === 'Key' + arr[i][0]) {
          element = arr[i][1];

          element.getId().click();

          document.getElementById(element.id).classList.add(element.id + '-pressed');
          setTimeout(() => { document.getElementById(element.id).classList.remove(element.id + '-pressed'); }, 200);
        }
      }
    }
  },
  EVENT_BIND: () => {
    GREEN_BTN.getId().onclick = () => { POPULATE_AUDIO.EVENT_DISPATCH(GREEN_BTN, 'elem-btn-green-pressed'); }
    YELLOW_BTN.getId().onclick = () => { POPULATE_AUDIO.EVENT_DISPATCH(YELLOW_BTN, 'elem-btn-yellow-pressed'); }
    BLUE_BTN.getId().onclick = () => { POPULATE_AUDIO.EVENT_DISPATCH(BLUE_BTN, 'elem-btn-blue-pressed'); }
    RED_BTN.getId().onclick = () => { POPULATE_AUDIO.EVENT_DISPATCH(RED_BTN, 'elem-btn-red-pressed'); }
  },
  EVENT_DISPATCH: (element, className) => {
    element.playSound();
    element.getId().classList.add(className);
    setTimeout(() => { element.getId().classList.remove(className); }, 200);
  }
};



/* 'SHUFFLE' is a function for shuffling arrays — used for 'strict' mode:
 *****************************************************************************************************/

const SHUFFLE = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};



/* 'CHECK_ARRAYS_MATCH' is a function that does what it says — it compares the player's array of
    buttons/colour keys and returns a truth value if they match:
 *****************************************************************************************************/

const CHECK_ARRAYS_MATCH = (arr1, arr2) => {
    let matches = true;
    for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) matches = false;
    return matches;
};
