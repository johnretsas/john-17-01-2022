import { render } from '@testing-library/react';
import Bids from '../Bids';
import { Provider } from "react-redux";

const store: any = {
    socket: {
        bids: [["firstBid", 100], ["secondBid", 100], ["thirdBid", 100]],
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
    const { getAllByText } = render(
        <Provider store={store}>
            <Bids />
        </Provider>
    );

    const first = getAllByText('firstBid');
    const second = getAllByText('secondBid');
    const third = getAllByText('thirdBid');

    expect(first.length).toEqual(1);
    expect(second.length).toEqual(1);
    expect(third.length).toEqual(1);


})