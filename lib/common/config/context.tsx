import React from "react";

export const HoverPanelContext = React.createContext<{
  closePanel: () => void;
}>({
  closePanel() {
    return null;
  },
});
