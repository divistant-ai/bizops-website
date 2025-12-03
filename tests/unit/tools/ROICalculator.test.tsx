// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ROICalculator from '@/components/tools/ROICalculator';

describe('ROI Calculator', () => {
  it('should render calculator form', () => {
    render(<ROICalculator />);

    expect(screen.getByText(/ROI Calculator/i)).toBeInTheDocument();
  });

  it('should calculate ROI correctly', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    // Fill in form fields
    const annualRevenueInput = screen.getByLabelText(/annual revenue/i);
    await user.type(annualRevenueInput, '1000000000');

    const efficiencyGainInput = screen.getByLabelText(/efficiency gain/i);
    await user.type(efficiencyGainInput, '15');

    // Submit form
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    await user.click(calculateButton);

    // Wait for results
    await waitFor(() => {
      expect(screen.getByText(/ROI/i)).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    await user.click(calculateButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });
});
