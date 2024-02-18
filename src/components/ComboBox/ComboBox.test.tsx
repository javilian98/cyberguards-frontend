import { ComboBox } from '@/components/ComboBox/ComboBox';
import { render, screen, fireEvent } from "@/utils/test-utils";

describe('ComboBox', () => {
    it('renders correctly on desktop', () => {
      render(<ComboBox />);
      const button = screen.getByRole('button', { name: /Select Assignee/i });
      expect(button).toBeInTheDocument();
    });
  
    it('opens the popover when clicked on desktop', () => {
      render(<ComboBox />);
      const button = screen.getByRole('button', { name: /Select Assignee/i });
      fireEvent.click(button);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  
    it('selects a status from the list', () => {
      render(<ComboBox />);
      const button = screen.getByRole('button', { name: /Select Assignee/i });
      fireEvent.click(button);
      const backlogOption = screen.getByText('Backlog');
      fireEvent.click(backlogOption);
      expect(screen.getByRole('option', { name: 'Backlog' })).toBeInTheDocument();
    });
  
    it('filters status items by typing in the input field', () => {
      render(<ComboBox />);
      const button = screen.getByRole('button', { name: /Select Assignee/i });
      fireEvent.click(button);
      const filterInput = screen.getByPlaceholderText('Filter status...');
      fireEvent.change(filterInput, { target: { value: 'Do' } });
      expect(screen.getByText('Todo')).toBeInTheDocument();
      expect(screen.queryByText('Backlog')).not.toBeInTheDocument();
    });
  
    it('displays "No results found." when no matching status items are found', () => {
      render(<ComboBox />);
      const button = screen.getByRole('button', { name: /Select Assignee/i });
      fireEvent.click(button);
      const filterInput = screen.getByPlaceholderText('Filter status...');
      fireEvent.change(filterInput, { target: { value: 'Invalid' } });
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });
  });