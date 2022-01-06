import react, { createContext, useRef } from "react";

import DivList from "./main/list/DivList";
import DivContent from "./main/content/DivContent";
import { BrowserRouter } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const refListUpdate = useRef(null);

  function createItemList(data) {
    refListUpdate.current(data);
  }

  function updateList(callback) {
    refListUpdate.current = callback;
  }


  return (
    <div className="wrap_content_all">
      <header>
        {
          /*
          кнопка регистрации, время, дата, название сайта....
           */
        }
      </header>
      <main>
        <BrowserRouter>
          <AppContext.Provider value={{ createItemList, updateList }}>
            <DivList />
            <DivContent />
          </AppContext.Provider>
        </BrowserRouter>
      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;
