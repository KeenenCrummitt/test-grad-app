import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginProvider from "./store/LoginProvider";

import Header from "./componenets/Layout/Header";
import CheckIn from "./Pages/CheckIn";
import People from "./Pages/People";
import FourOhFour from "./Pages/FourOhFour";
import Managers from "./Pages/Managers";
import Sync from "./sync/Sync";
import There from "./Pages/There";
import AddDepartment from "./Pages/AddDepartment";
import { c } from "./functions/utils";

//Development
const PATH = `${process.env.REACT_APP_SERVER_URL}/index.php`;
console.log(PATH);

function App() {
  return (
    <div className={c("App")}>
      <LoginProvider>
        <Header>
          <Sync />
        </Header>

        <main>
          <Routes>
            <Route path="/" element={<CheckIn />} />
            <Route path="check-in" element={<CheckIn />} />
            <Route path="attendees" element={<People />} />
            <Route path="managers" element={<Managers />} />
            <Route path="departments" element={<AddDepartment />} />
            <Route path="there" element={<There />} />
            <Route path="/*" element={<FourOhFour />} />
          </Routes>
        </main>
      </LoginProvider>
    </div>
  );
}

export default App;
