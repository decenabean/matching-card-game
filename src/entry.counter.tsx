import { render } from '@builder.io/qwik';
// Adds flip counter
import { FlipCounter } from './components/FlipCounter/FlipCounter';

// Attachs Qwik component onto the html page
render(document.getElementById('counter-root')!, <FlipCounter />);

// Console message for troubleshooting
console.log("Qwik counter entry loaded!");
