import { Route, Routes } from "react-router-dom";

import Main from "./Main";

export default function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </>
  );
}
