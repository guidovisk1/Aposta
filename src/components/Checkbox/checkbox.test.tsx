import { render, screen } from '@testing-library/react';
import Checkbox from '.';

import '@testing-library/jest-dom';

test('Renders the component with its child', () => {
  render(<Checkbox labelText="Testing checkbox" />);

  const checkElement = screen.getByTestId('checkbox-input');
  const labelElement = screen.getByTestId('checkbox-label');

  expect(screen.getByTestId('checkbox-wrapper')).toContainElement(checkElement);
  expect(screen.getByTestId('checkbox-wrapper')).toContainElement(labelElement);
});

test('Tests if the text in the label is being right rendered', () => {
  render(<Checkbox labelText="Testing checkbox" />);

  expect(screen.getByTestId('checkbox-label')).toHaveTextContent(
    'Testing checkbox',
  );
});
