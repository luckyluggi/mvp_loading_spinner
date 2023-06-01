import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance, Piral, createStandardApi, SetComponent } from 'piral';
import { layout, errors } from './layout';
import { createBlazorApi } from 'piral-blazor';
import { standardStrategy } from 'piral-base';
import { LoadingSpinner } from './components/LoadingSpinner';

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = 'https://feed.piral.cloud/api/v1/pilet/empty';

const instance = createInstance({
  state: {
    components: layout,
    errorComponents: errors,
  },
  plugins: [
    ...createStandardApi(),
    createBlazorApi({lazy: false}),
  ],
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
  async: (options, pilets) => {
    standardStrategy(options, pilets);
    return new Promise(resolve => {
      window.addEventListener('loaded-blazor-pilet', (ev: CustomEvent) => {
        console.log("loaded-blazor-pilet as been fired", ev.detail.name);
        if (ev.detail.name === '@myorg/someapp') {
          // The layout has been loaded completely. We can now hide the spinner and show the app.
          resolve();
        }
      });
    });
  },
});

const root = createRoot(document.querySelector('#app'));

root.render(<Piral instance={instance}>
  <SetComponent name="LoadingIndicator" component={LoadingSpinner} />
</Piral>);