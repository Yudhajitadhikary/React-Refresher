import { render, screen } from '@testing-library/react';
import Button from '../button.component';
import { BUTTON_TYPES_CLASSES } from '../button.component';
describe('Button Component', () => {
    test('renders button component', () => {
        render(<Button>Test</Button>);
        const buttonElement = screen.getByText(/test/i);
        expect(buttonElement).toHaveStyle('background-color: white');
        const button = screen.getByRole('button');
        expect(button).toHaveStyle('background-color: white');
    });
    test('should render google button when passed google button type',()=>{
        render(<Button buttonType={BUTTON_TYPES_CLASSES.google}/>);
        const button = screen.getByRole('button');
        expect(button).toHaveStyle( 'color: white;');
    })
    test('should render inverted button when passed inverted button type',()=>{
        render(<Button buttonType={BUTTON_TYPES_CLASSES.inverted}/>);
        const button = screen.getByRole('button');
        expect(button).toHaveStyle( 'color: white;');
    })
    test("should be disabled when loading",()=>{
        render(<Button isLoading={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    })
});