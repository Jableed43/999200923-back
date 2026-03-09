export const registerHelpers = (Handlebars) => {
    Handlebars.registerHelper("eq", function (a, b) {
        return a === b
    })

    Handlebars.registerHelper("toString", function (value) {
        if(value){
            return value.toString()
        } else {
            return ""
        }
    })

    Handlebars.registerHelper("and", function (a, b) {
        return a && b    
    })
}