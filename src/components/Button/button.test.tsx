import { render, screen } from '@testing-library/react';
import Button from '.';

import '@testing-library/jest-dom';

test('Renders the component with its child', () => {
  render(<Button>Button</Button>);

  expect(screen.getByRole('button')).toHaveTextContent('Button');
});

test('Tests if the button is really disabled', () => {
  render(<Button disabled>Button</Button>);

  expect(screen.getByRole('button')).toHaveTextContent('Button');
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByRole('button')).toHaveStyle('cursor: not-allowed');
  expect(screen.getByRole('button')).toHaveStyle('background-color: #c6c6c6');
});

test('Tests if the button is set to secondary', () => {
  render(<Button>Button</Button>);

  expect(screen.getByRole('button')).toHaveTextContent('Button');
  expect(screen.getByRole('button')).toHaveStyle('background-color: #ff5427');
  expect(screen.getByRole('button')).toHaveStyle('color: #fff');
});
