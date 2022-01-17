import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import Orderbook from '../Orderbook';

const store: any = {
    socket: {
        asks: [[1000, 100], [2000, 100], [3000, 100]],
        totalAsks: [100, 200, 300],
        bids: [[1500, 100], [2500, 100], [3500, 100]],
        totalBids: [100, 200, 300],
        totalMax: 300,
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
    
    const { getAllByTestId } = render(
        <Provider store={store}>
            <Orderbook ws={{} as WebSocket} isVisible={true} />
        </Provider>
    );

    const asksBids = getAllByTestId("asksbids");
    const utilities = getAllByTestId("utilities");
    
    expect(asksBids.length).toEqual(1);
    expect(utilities.length).toEqual(1);

})