import { configure } from '@storybook/react';
import '../src/assets/css/styles.scss'

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
