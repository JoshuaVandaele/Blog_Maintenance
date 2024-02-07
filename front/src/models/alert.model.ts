export interface Alert {
    title: string
    text: string,
    typeAlert?: "error" | "success" | "warning" | "info"
}

export const factoryAlert = (title: string, text: string, typeAlert?: "error" | "success" | "warning" | "info"): Alert => {
    return {
        title,
        text,
        typeAlert
    }
}

export const factoryAlertSuccess = (title: string, text: string): Alert => {
    return factoryAlert(title, text, "success");
}  
