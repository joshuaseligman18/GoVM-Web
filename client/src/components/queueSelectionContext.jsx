import { createContext } from "react";

const QueueContext = createContext({
    selectedProg: {},
    updateProg: () => {},
    queue: {}
})

export default QueueContext