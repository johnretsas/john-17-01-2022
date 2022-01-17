import { render } from '@testing-library/react';
import Asks from '../Asks';
import { Provider } from "react-redux";

const store: any = {
    socket: {
        asks: [["firstAsk", 100], ["secondAsk", 100], ["thirdAsk", 100]],
        totalAsks: [100, 200, 300],
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
            <Asks />
        </Provider>
    );

    const first = getAllByText('firstAsk');
    const second = getAllByText('secondAsk');
    const third = getAllByText('thirdAsk');

    expect(first.length).toEqual(1);
    expect(second.length).toEqual(1);
    expect(third.length).toEqual(1);

})