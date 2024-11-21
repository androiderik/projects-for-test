import {render, screen, fireEvent } from '@testing-library/react';
import {LimitedCounter} from './index'


test('renders limited counter component', () => {
    render(<LimitedCounter />);
    const ButtonText = screen.getByText(/Increment/i);
    expect(ButtonText).toBeInTheDocument();
  });
  

  test('calls onClick increment counter', () => {

    const setup = () => {
        const component = render(<LimitedCounter />)
        const input = screen.getByLabelText('increment')
        return {
          input,
         ...component,
        }
      }
    const {input} = setup()
    fireEvent.click(input)
    screen.getByText(/1/i)
    expect(input.value).toBe('1')

  });
  


  test('calls onClick decrement counter', () => {

    const setup = () => {
        const component = render(<LimitedCounter />)
        const input = screen.getByLabelText('decrement')
        return {
          input,
         ...component,
        }
      }
    const {input} = setup()
    fireEvent.click(input)
    screen.getByText(/0/i)
    expect(input.value).toBe('0')

  });
  