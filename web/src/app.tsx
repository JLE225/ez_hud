import React, { useState } from "react";
import { debugData } from "./utils/debugData";
import { isEnvBrowser } from "./utils/misc";
import { useNuiEvent } from "./hooks/useNuiEvent";
import DevWrap from "./features/dev/DevWrap";
import NotifyWrap from "./features/Notify/NotifyWrap";
import ProgbarWrap from "./features/Progbar/ProgbarWrap";
import CircleProgbarWrap from "./features/Progbar/CircleProgbarWrap";
import TextUiWrap from "./features/TextUI/TextUiWrap";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      {isEnvBrowser() && <DevWrap />}
      <NotifyWrap />
      <ProgbarWrap />
      <CircleProgbarWrap />
      <TextUiWrap />
    </div>
  );
};

export default App;
