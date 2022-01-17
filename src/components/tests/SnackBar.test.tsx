import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import SnackBar from '../SnackBar';

const store: any = {
    socket: {
        hasNotification: {
            message: "Test message to show."
        }
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
            <SnackBar hasNotification={store.socket.hasNotification} />
        </Provider>
    );
    const productId = getAllByText(store.socket.hasNotification.message)
    expect(productId.length).toEqual(1)
})