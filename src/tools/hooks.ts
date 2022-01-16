import { getIsDocumentHidden, getBrowserVisibilityProp } from "./helpers";
import { useState, useEffect } from "react";

export function usePageVisibility() {
    const [isVisible, setIsVisible] = useState(getIsDocumentHidden())
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())

    useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp()

        document.addEventListener(visibilityChange!, onVisibilityChange, false)

        return () => {
            document.removeEventListener(visibilityChange!, onVisibilityChange)
        }
    })

    return isVisible
}