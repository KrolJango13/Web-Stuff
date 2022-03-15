// You have to use this while on docs.google.com because of CORS. (Request is blocked if method is no-cors)
window.JangoFormHelper = {
    // Get the fields of the form you are on
    getFormEntries(){
        var fields = [...document.querySelector("form > div > div").children];
        return fields.map(x => Object.fromEntries([[x.name,x.value]])).reduce((x,y) => Object.assign(y,x));
    },
    
    // Submit a form with the specified key
    submitToForm: (formKey,entries) => fetch(`https://docs.google.com/forms/u/0/d/e/${formKey}/formResponse?${new URLSearchParams(entries).toString()}&submit=Submit`),
    
    // Get the key of the form you are on
    getFormKey: () => location.pathname.split("/")[4],
    
    // Submit the form you are on
    submit: () => submitToForm(JangoFormHelper.getFormKey(),JangoFormHelper.getFormEntries())
}
