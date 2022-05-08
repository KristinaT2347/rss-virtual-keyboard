class Keyboard {
  elements = {
    main: null,
    keysContainer: null,
    keys: [],
  };

  eventHandlers = {
    oninput: null,
    onclose: null,
  };

  properties = {
    value: '',
    capsLock: false,
    layout: 'en',
  };

  constructor() {
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
    const keyLayout = [
      { en: '~', ru: 'ё' },
      { en: '1', ru: '1' },
      { en: '2', ru: '2' },
      { en: '3', ru: '3' },
      { en: '4', ru: '4' },
      { en: '5', ru: '5' },
      { en: '6', ru: '6' },
      { en: '7', ru: '7' },
      { en: '8', ru: '8' },
      { en: '9', ru: '9' },
      { en: '0', ru: '0' },
      { en: '-', ru: '-' },
      { en: '=', ru: '=' },
      { en: 'backspace', ru: 'backspace', lineBreak: true },
      { en: 'Tab', ru: 'Tab' },
      { en: 'q', ru: 'й' },
      { en: 'w', ru: 'ц' },
      { en: 'e', ru: 'у' },
      { en: 'r', ru: 'к' },
      { en: 't', ru: 'е' },
      { en: 'y', ru: 'н' },
      { en: 'u', ru: 'г' },
      { en: 'i', ru: 'ш' },
      { en: 'o', ru: 'щ' },
      { en: 'p', ru: 'з' },
      { en: '[', ru: 'х' },
      { en: ']', ru: 'ъ' },
      { en: '\\', ru: '\\' },
      { en: 'Del', ru: 'Del', lineBreak: true },
      { en: 'caps', ru: 'caps' },
      { en: 'a', ru: 'ф' },
      { en: 's', ru: 'ы' },
      { en: 'd', ru: 'в' },
      { en: 'f', ru: 'а' },
      { en: 'g', ru: 'п' },
      { en: 'h', ru: 'р' },
      { en: 'j', ru: 'о' },
      { en: 'k', ru: 'л' },
      { en: 'k', ru: 'л' },
      { en: 'l', ru: 'д' },
      { en: ';', ru: 'ж' },
      { en: "'", ru: 'э' },
      { en: 'enter', ru: 'enter', lineBreak: true },
      { en: '🠕', ru: '🠕' },
      { en: 'z', ru: 'я' },
      { en: 'x', ru: 'ч' },
      { en: 'c', ru: 'с' },
      { en: 'v', ru: 'м' },
      { en: 'b', ru: 'и' },
      { en: 'n', ru: 'т' },
      { en: 'm', ru: 'ь' },
      { en: ',', ru: 'б' },
      { en: '.', ru: 'ю' },
      { en: '/', ru: '.' },
      { en: '🢑', ru: '🢑' },
      { en: '🠕', ru: '🠕', lineBreak: true },
      { en: 'Ctrl', ru: 'Ctrl' },
      { en: 'Win', ru: 'Win' },
      { en: 'Alt', ru: 'Alt' },
      { en: 'space', ru: 'space' },
      { en: 'Alt', ru: 'Alt' },
      { en: '🢐', ru: '🢐' },
      { en: '🢓', ru: '🢓' },
      { en: '🢒', ru: '🢒' },
      { en: 'Ctrl', ru: 'Ctrl' },
    ];

    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-container__key');

      switch (key.en) {
        case 'backspace':
          keyElement.classList.add('keyboard-container__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this.triggerEvent('oninput');
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard-container__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard-container__key--wide',
            'keyboard-container__key--activetable',
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard-container__key--active',
              this.properties.capsLock,
            );
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard-container__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard-container__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        default:
          keyElement.textContent = key.en.toLocaleLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.en.toLocaleUpperCase()
              : key.en.toLocaleLowerCase();
            this.triggerEvent('oninput');
          });

          break;
      }

      keyElement.dataset.en = key.en;
      keyElement.dataset.ru = key.ru;

      fragment.appendChild(keyElement);

      if (key.lineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  triggerEvent() {}

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLocaleLowerCase();
      }
    }
  }

  open() {
    this.elements.main.classList.remove('keyboard-container--hidden');
    this.addEventListeners();
  }

  close() {
    this.elements.main.classList.add('keyboard-container--hidden');
  }

  addEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (
        (e.code === 'ShiftLeft' && e.altKey)
        || (e.code === 'AltLeft' && e.shiftKey)
      ) {
        this.changeLayout();
      }
    });
  }

  changeLayout() {
    if (this.layout === 'en') {
      this.layout = 'ru';
    } else {
      this.layout = 'en';
    }

    for (const key of this.elements.keys) {
      key.textContent = key.dataset[this.layout];
    }
  }
}

const keyboard = new Keyboard();

const title = document.createElement('h1');
title.textContent = 'RSS VIRTUAL KEYBOARD';
document.body.append(title);

const textArea = document.createElement('textarea');
document.body.append(textArea);
textArea.addEventListener('focus', () => keyboard.open());
