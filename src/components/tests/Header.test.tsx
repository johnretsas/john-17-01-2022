import { render } from '@testing-library/react';
import Header from '../Header';
import { Provider } from "react-redux";

const store: any = {
    socket: {
        asks: [[1000, 100], [2000, 100], [3000, 100]],
        totalAsks: [100, 200, 300],
        bids: [[1500, 100], [2500, 100], [3500, 100]],
        totalBids: [100, 200, 300],
        totalMax: 300
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
            <Header />
        </Provider>
    );

    const spread = getAllByTestId("spread");
    expect(spread.length).toEqual(1);
    expect(spread[0].innerHTML).toEqual("Spread: 500.00000 (40.00) %");
})