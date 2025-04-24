import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const FlipCounter = component$(() => {
  const count = useSignal(0);

  // I used a LOT of qwik tutorials
  useVisibleTask$(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      count.value = customEvent.detail;
    };
    // Gets updated flip count from game.js
    window.addEventListener('flipCountUpdated', handler);

    return () => window.removeEventListener('flipCountUpdated', handler);
  });

  // Returns piece of html to index.html
  return (
    <div id="info">
      Flips: {count.value}
    </div>
  );
});


