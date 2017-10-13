import footer from './templates/footer.js';
import header from './templates/header.js';

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, modeHeader) => {
  mainScreen.innerHTML = ``;
  const headerTemplate = header(modeHeader);
  if (headerTemplate) {
    mainScreen.appendChild(headerTemplate);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer);
};

export default changeTemplate;
