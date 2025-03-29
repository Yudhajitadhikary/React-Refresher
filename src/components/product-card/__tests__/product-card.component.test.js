import { screen,fireEvent } from "@testing-library/react";
import ProductCard from "../product-card.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
describe("Product Card tests", () => {
    test("it should add the item to the cart when the button is clicked",async () => {
        const item = {
            id: 1,
            name: "Test Product",
            imageUrl: "test.jpg",
            price: 10,
        };
        const { store } = renderWithProviders(<ProductCard product={item} />, {
            preloadedState: {
                cart: {
                    cartItems:[]
                },
            },
        });
const addtoCartButtonElement=screen.getByText(/add to cart/i);
        await fireEvent.click(addtoCartButtonElement);
        expect(store.getState().cart.cartItems.length).toBe(1);
    });

    });