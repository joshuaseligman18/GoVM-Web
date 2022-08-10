import { createContext } from "react";

// Context for the queue
const QueueContext = createContext({
    selectedProg: {},
    updateProg: () => {},
    queue: {}
})

export default QueueContext