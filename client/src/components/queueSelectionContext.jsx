import { createContext } from "react";

const QueueSelectionContext = createContext({
    selectedProg: {},
    updateProg: () => {}
})

export default QueueSelectionContext