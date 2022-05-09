class Keyboard {
  elements = {
    main: null,
    keysContainer: null,
    keys: [],
    input: null,
  };

  properties = {
    value: '',
    capsLock: false,
    layout: 'en',
    cursorPosition: 0,
  };

  keyLayout = [
    { en: '~', ru: 'ё', code: 'Backquote' },
    { en: '1', ru: '1', code: 'Digit1' },
    { en: '2', ru: '2', code: 'Digit2' },
    { en: '3', ru: '3', code: 'Digit3' },
    { en: '4', ru: '4', code: 'Digit4' },
    { en: '5', ru: '5', code: 'Digit5' },
    { en: '6', ru: '6', code: 'Digit6' },
    { en: '7', ru: '7', code: 'Digit7' },
    { en: '8', ru: '8', code: 'Digit8' },
    { en: '9', ru: '9', code: 'Digit9' },
    { en: '0', ru: '0', code: 'Digit0' },
    { en: '-', ru: '-', code: 'Minus' },
    { en: '=', ru: '=', code: 'Equal' },
    {
      lineBreak: true,
      code: 'Backspace',
      icon: 'backspace',
      classes: ['keyboard-container__key--wide'],
    },
    {
      code: 'Tab',
      icon: 'keyboard_tab',
      classes: ['keyboard-container__key--wide'],
    },
    { en: 'q', ru: 'й', code: 'KeyQ' },
    { en: 'w', ru: 'ц', code: 'KeyW' },
    { en: 'e', ru: 'у', code: 'KeyE' },
    { en: 'r', ru: 'к', code: 'KeyR' },
    { en: 't', ru: 'е', code: 'KeyT' },
    { en: 'y', ru: 'н', code: 'KeyY' },
    { en: 'u', ru: 'г', code: 'KeyU' },
    { en: 'i', ru: 'ш', code: 'KeyI' },
    { en: 'o', ru: 'щ', code: 'KeyO' },
    { en: 'p', ru: 'з', code: 'KeyP' },
    { en: '[', ru: 'х', code: 'BracketLeft' },
    { en: ']', ru: 'ъ', code: 'BracketRight' },
    { en: '\\', ru: '\\', code: 'Backslash' },
    { label: 'del', lineBreak: true, code: 'Delete' },
    {
      code: 'CapsLock',
      icon: 'keyboard_capslock',
      classes: [
        'keyboard-container__key--wide',
        'keyboard-container__key--activetable',
      ],
    },
    { en: 'a', ru: 'ф', code: 'KeyA' },
    { en: 's', ru: 'ы', code: 'KeyS' },
    { en: 'd', ru: 'в', code: 'KeyD' },
    { en: 'f', ru: 'а', code: 'KeyF' },
    { en: 'g', ru: 'п', code: 'KeyG' },
    { en: 'h', ru: 'р', code: 'KeyH' },
    { en: 'j', ru: 'о', code: 'KeyJ' },
    { en: 'k', ru: 'л', code: 'KeyK' },
    { en: 'l', ru: 'д', code: 'KeyL' },
    { en: ';', ru: 'ж', code: 'Semicolon' },
    { en: "'", ru: 'э', code: 'Quote' },
    {
      lineBreak: true,
      code: 'Enter',
      icon: 'keyboard_return',
      class: ['keyboard-container__key--wide'],
    },
    { label: '🠕', code: 'ShiftLeft' },
    { en: 'z', ru: 'я', code: 'KeyZ' },
    { en: 'x', ru: 'ч', code: 'KeyX' },
    { en: 'c', ru: 'с', code: 'KeyC' },
    { en: 'v', ru: 'м', code: 'KeyV' },
    { en: 'b', ru: 'и', code: 'KeyB' },
    { en: 'n', ru: 'т', code: 'KeyN' },
    { en: 'm', ru: 'ь', code: 'KeyM' },
    { en: ',', ru: 'б', code: 'Comma' },
    { en: '.', ru: 'ю', code: 'Period' },
    { en: '/', ru: '.', code: 'Slash' },
    { label: '🢑', code: 'ArrowUp' },
    { label: '🠕', lineBreak: true, code: 'ShiftRight' },
    { label: 'ctrl', code: 'ControlLeft' },
    { label: 'win', code: 'MetaLeft' },
    { label: 'alt', code: 'AltLeft' },
    {
      code: 'Space',
      icon: 'space_bar',
      classes: ['keyboard-container__key--extra-wide'],
    },
    { label: 'alt', code: 'AltRight' },
    { label: '🢐', code: 'ArrowLeft' },
    { label: '🢓', code: 'ArrowDown' },
    { label: '🢒', code: 'ArrowRight' },
    { label: 'ctrl', code: 'ControlRight' },
  ];

  constructor() {
    const lang = localStorage.getItem('lang') || 'en';
    this.properties.layout = lang;

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add(
      'keyboard-container',
      'keyboard-container--hidden',
    );
    this.elements.keysContainer.classList.add('keyboard-container__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard-container__key',
    );

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-container__key');

      if (key.classes) {
        keyElement.classList.add(...key.classes);
      }

      keyElement.dataset.code = key.code;

      if (key.icon) {
        keyElement.innerHTML = createIconHTML(key.icon);
      } else if (key.label) {
        keyElement.textContent = key.label;
      } else {
        keyElement.dataset.en = key.en;
        keyElement.dataset.ru = key.ru;
        keyElement.textContent = this.getCapsValue(key[this.properties.layout]);
      }

      keyElement.addEventListener('click', () => this.onKeyClick(key));

      fragment.appendChild(keyElement);

      if (key.lineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  onKeyClick(key) {
    this.elements.input.focus();
    const { selectionStart, selectionEnd, value } = this.elements.input;

    switch (key.code) {
      case 'Backspace':
        this.elements.input.value =
          value.substring(0, selectionStart - 1) +
          value.substring(selectionEnd);
        this.elements.input.selectionStart =
          selectionStart === 0 ? 0 : selectionStart - 1;
        this.elements.input.selectionEnd =
          selectionEnd === 0 ? 0 : selectionEnd - 1;
        break;
      case 'Delete':
        this.elements.input.value =
          value.substring(0, selectionStart) +
          value.substring(selectionEnd + 1);
        this.elements.input.selectionStart = selectionStart;
        this.elements.input.selectionEnd = selectionEnd;
        break;
      case 'Tab':
        this.elements.input.selectionStart = 0;
        this.elements.input.selectionEnd = 0;
        this.onInput('  ');
        this.elements.input.selectionStart = selectionStart + 2;
        this.elements.input.selectionEnd = selectionEnd + 2;
        break;
      case 'CapsLock':
        this.toggleCapsLock();
        break;
      case 'Enter':
        this.onInput('\n');
        break;
      case 'Space':
        this.onInput(' ');
        break;
      case 'ArrowLeft':
        this.elements.input.selectionStart =
          selectionStart === 0 ? 0 : selectionStart - 1;
        this.elements.input.selectionEnd =
          selectionEnd === 0 ? 0 : selectionEnd - 1;
        break;
      case 'ArrowRight':
        this.elements.input.selectionStart =
          selectionStart === value.length - 1
            ? value.length
            : selectionStart + 1;
        this.elements.input.selectionEnd =
          selectionEnd === value.length - 1 ? value.length : selectionEnd + 1;
        break;
      case 'ArrowUp':
        this.elements.input.selectionStart = 0;
        this.elements.input.selectionEnd = 0;
        break;
      case 'ArrowDown':
        this.elements.input.selectionStart = value.length;
        this.elements.input.selectionEnd = value.length;
        break;
      default:
        if (key[this.properties.layout]) {
          this.onInput(key[this.properties.layout]);
        }

        break;
    }
  }

  onInput(char) {
    const { selectionStart, selectionEnd, value } = this.elements.input;
    const capsChar = this.getCapsValue(char);

    this.elements.input.value =
      value.substring(0, selectionStart) +
      capsChar +
      value.substring(selectionEnd);

    this.elements.input.selectionStart = selectionStart + 1;
    this.elements.input.selectionEnd = selectionEnd + 1;
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    const keyElement = this.elements.keysContainer.querySelector(
      '[data-code="CapsLock"]',
    );
    keyElement.classList.toggle('keyboard-container__key--active');

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && key.dataset[this.properties.layout]) {
        key.textContent = this.getCapsValue(key.textContent);
      }
    }
  }

  getCapsValue(value) {
    return this.properties.capsLock ? value.toUpperCase() : value.toLowerCase();
  }

  open(input) {
    this.elements.input = input;
    this.elements.main.classList.remove('keyboard-container--hidden');
    this.addEventListeners();
  }

  close() {
    this.elements.main.classList.add('keyboard-container--hidden');
  }

  addEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (
        (e.code === 'ShiftLeft' && e.altKey) ||
        (e.code === 'AltLeft' && e.shiftKey)
      ) {
        this.changeLayout();
      } else if (e.code === 'CapsLock') {
        this.toggleCapsLock();
      } else {
        const key = this.elements.keysContainer.querySelector(
          `[data-code="${e.code}"]`,
        );
        if (key) {
          key.classList.add('keyboard-container__key--active');
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'CapsLock') {
        return;
      }

      const key = this.elements.keysContainer.querySelector(
        `[data-code="${e.code}"]`,
      );

      if (key) {
        key.classList.remove('keyboard-container__key--active');
      }
    });

    this.elements.input.addEventListener('click', (e) => {
      this.properties.cursorPosition = e.target.selectionStart;
    });
  }

  changeLayout() {
    if (this.properties.layout === 'en') {
      this.properties.layout = 'ru';
    } else {
      this.properties.layout = 'en';
    }

    localStorage.setItem('lang', this.properties.layout);

    for (const key of this.elements.keys) {
      if (key.dataset[this.properties.layout]) {
        key.textContent = this.getCapsValue(
          key.dataset[this.properties.layout],
        );
      }
    }
  }
}

const keyboard = new Keyboard();

const title = document.createElement('h1');
title.textContent = 'RSS VIRTUAL KEYBOARD';
document.body.append(title);

const textArea = document.createElement('textarea');
document.body.append(textArea);
textArea.addEventListener('focus', () => keyboard.open(textArea));

const text = document.createElement('h3');
text.textContent =
  'Клавиатура создана в операционной системе Windows Для переключения языка комбинация: левыe shift + alt';
document.body.append(text);
