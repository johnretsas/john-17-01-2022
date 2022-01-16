import './App.css';
import { Provider, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { FEED, INFO, SUBSCRIBED } from './app/actions/socket/types';
import Header from "./components/Header";
import { createSocketInfoAction, createSocketSaveFeedAction, createSocketSubscribedAction, createSocketUnsubscribedAction } from "./app/actions/socket";
import { store } from "./app/store";
import Orderbook from "./components/Orderbook";

import { usePageVisibility } from "./tools/hooks";

const ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");


const App = () => {

  const dispatch = useDispatch();
  const isVisible = usePageVisibility();

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      ws.send(JSON.stringify({ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["PI_XBTUSD"] }))
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.event === "info") {
        dispatch(createSocketInfoAction(data))
      } else if (data.event === "subscribed") {
        dispatch(createSocketSubscribedAction(data))
      } else if (data.event === "unsubscribed") {
        dispatch(createSocketUnsubscribedAction(data))
      } else if (data.feed) {
        dispatch(createSocketSaveFeedAction(data))
      }
    };
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Orderbook ws={ws} isVisible={isVisible}/>
      </Provider>
    </div>
  );
}

export default App;
