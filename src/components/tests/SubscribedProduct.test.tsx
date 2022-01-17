import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import SubscribedProduct from '../SubscribedProduct';

const store: any = {
    socket: {
        subscribedProductId: "PI_ETHUSD"
    },
    dispatch: () => { },
    getState: () => {
        return { socket: store.socket }
    },
    subscribe: () => { },
    replaceReducer: () => { },
}

test("It renders properly", () => {
    const { getAllByText } = render(
        <Provider store={store}>
            <SubscribedProduct />
        </Provider>
    );
    const productId = getAllByText("PI_ETHUSD")
    expect(productId.length).toEqual(1)
})