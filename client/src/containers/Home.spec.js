import { render, screen } from '@testing-library/vue';
import Home from './Home.vue';

test('Renders home', async () => {
  render(Home);

  expect(screen.getByText('Tree Chart')).toBeDefined();
});
