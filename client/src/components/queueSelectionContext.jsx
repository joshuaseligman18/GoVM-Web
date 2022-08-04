import { createContext } from "react";

const QueueSelectionContext = createContext({
    id: 0,
    updateId: () => {}
})

export default QueueSelectionContext