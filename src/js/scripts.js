import FontAdjust from "./components/FontAdjust/index.js";
import NowPlaying from "./components/NowPlaying/index.js";
import SearchData from "./components/SearchData/index.js";

// API_KEY and API_PATH to be stored in cookies?
window.API_KEY = '?api_key=15d382b5ad53d6b7c9569e8b85954ffa';
window.API_PATH = 'https://api.themoviedb.org/3/';
const body = document.body;
const header = document.querySelector('header');
let mobile = false;
window.genresArray = undefined;

const search = document.querySelector('.js-search-list');
if (search) window.globalSearchData = new SearchData(search);

const nowPlaying = document.querySelector('.js-now-playing');
if (nowPlaying) window.globalNowPlaying = new NowPlaying(nowPlaying);

const fontAdjust = document.querySelector('.js-adjust-font');
if (fontAdjust) new FontAdjust(fontAdjust);

// Add basic functionality to make the website more accessible and respect the user's preferences in design
// I plan on using these css classes in the next stages of developmen, after having finished the JS functionality requirements 

window.onload = () => {
    if (window.matchMedia('(prefers-reduced-motion)').matches) body.classList.add('reduced-motion');
    if (window.matchMedia('(prefers-color-scheme: light)').matches) body.classList.add('light-theme');

    // I may use this if I have time to handle bugs or orientation change events after the initial build and requirements are fullfilled
    if (window.matchMedia('only screen and (hover: none) and (pointer: coarse)').matches) {
        body.classList.add('mobile');
        mobile = true;
    }
};

const trigger = document.querySelector('.js-info-trigger');
const infoContent = document.querySelector('.js-info-content');

trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    infoContent.classList.toggle('visible');
});

infoContent.addEventListener('click', e => e.stopPropagation());

body.addEventListener('click', _ => infoContent.classList.remove('visible'));

// Global debounce function

function debounce(callback, interval) {
    let debounceTimeoutId;

    return function (e) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => callback, interval);
    };
}

// Compute Screen height 

const computeHeight = !(() => {
    body.style.setProperty('--screenHeight', window.innerHeight + 'px');
    body.style.setProperty('--headerHeight', header.clientHeight + 'px');
})();

window.addEventListener('resize', debounce(computeHeight, 300));