import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../payment-form.component';
import { loadStripe } from '@stripe/stripe-js';

// filepath: /Users/yudhajitadhikary/Desktop/React-Refresher/React-Refresher/src/components/payment-form/__tests__/payment-form.component.test.jsx

jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: () => <div data-testid="card-element" />,
  useStripe: jest.fn(),
  useElements: jest.fn(),
}));

const mockStore = configureStore([]);
const stripePromise = loadStripe('test-key');

describe('PaymentForm Component', () => {
  let store;
  let mockStripe;
  let mockElements;

  beforeEach(() => {
    store = mockStore({
      cart: { total: 100 },
      user: { currentUser: { displayName: 'Test User' } },
    });

    mockStripe = {
      confirmCardPayment: jest.fn(),
    };
    mockElements = {
      getElement: jest.fn(),
    };

    require('@stripe/react-stripe-js').useStripe.mockReturnValue(mockStripe);
    require('@stripe/react-stripe-js').useElements.mockReturnValue(mockElements);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ paymentIntent: { client_secret: 'test-secret' } }),
      })
    );

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders PaymentForm component', () => {
    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    expect(screen.getByText(/Credit Card Payment:/i)).toBeInTheDocument();
    expect(screen.getByTestId('card-element')).toBeInTheDocument();
    expect(screen.getByText(/Pay Now/i)).toBeInTheDocument();
  });

  test('handles payment process successfully', async () => {
    mockStripe.confirmCardPayment.mockResolvedValue({
      paymentIntent: { status: 'succeeded' },
    });

    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Pay Now/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/.netlify/functions/create-payment-intent', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 10000 }),
      });
    });

    await waitFor(() => {
      expect(mockStripe.confirmCardPayment).toHaveBeenCalledWith('test-secret', {
        payment_method: {
          card: mockElements.getElement(),
          billing_details: { name: 'Test User' },
        },
      });
    });

    expect(window.alert).toHaveBeenCalledWith('Payment Successful!');
  });

  test('handles payment error', async () => {
    mockStripe.confirmCardPayment.mockResolvedValue({
      error: { message: 'Payment failed' },
    });

    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Pay Now/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockStripe.confirmCardPayment).toHaveBeenCalled();
    });

    expect(window.alert).toHaveBeenCalledWith('Payment failed');
  });

  test('disables button during processing', async () => {
    mockStripe.confirmCardPayment.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ paymentIntent: { status: 'succeeded' } }), 1000))
    );

    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Pay Now/i));

    expect(screen.getByText(/Pay Now/i)).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/Pay Now/i)).toBeEnabled();
    });
  });

  test('does not proceed if stripe or elements are not loaded', async () => {
    require('@stripe/react-stripe-js').useStripe.mockReturnValue(null);
    require('@stripe/react-stripe-js').useElements.mockReturnValue(null);

    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Pay Now/i));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(mockStripe.confirmCardPayment).not.toHaveBeenCalled();
  });

  test('handles missing current user gracefully', async () => {
    store = mockStore({
      cart: { total: 100 },
      user: { currentUser: null },
    });

    mockStripe.confirmCardPayment.mockResolvedValue({
      paymentIntent: { status: 'succeeded' },
    });

    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Pay Now/i));

    await waitFor(() => {
      expect(mockStripe.confirmCardPayment).toHaveBeenCalledWith('test-secret', {
        payment_method: {
          card: mockElements.getElement(),
          billing_details: { name: 'Yihua Zhang' },
        },
      });
    });

    expect(window.alert).toHaveBeenCalledWith('Payment Successful!');
  });
});