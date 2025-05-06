import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.less";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { unstableSetRender } from "antd";
import AppInitializer from "./components/AppInitializer.tsx";

declare global {
  interface Element {
    _reactRoot?: ReturnType<typeof createRoot>;
  }
  interface DocumentFragment {
    _reactRoot?: ReturnType<typeof createRoot>;
  }
}

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppInitializer>
        <Router>
          <App />
        </Router>
      </AppInitializer>
    </Provider>
  </StrictMode>
);
