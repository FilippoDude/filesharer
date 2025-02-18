import React ,{createContext, useContext} from "react";

// In this component we define the main context
// We first use the function createContext to create one
const LocalAppContext = createContext<undefined>(undefined); 

// Over here we define a const that contains an arrow function which has in the parameters the children
// By children we are referring to the elements inside the BrowserRouter element
/*
<BrowserRouter>
    <AppContextProvider>
        <Routes>
                <Route path='/' element={<MainPage/>}></Route>
        </Routes>
    </AppContextProvider>
</BrowserRouter>
*/
// Since we are using typescript we also need to specify that the elements are of type React.ReactNode like i've done here
export const AppContextProvider = ({children} : {children : React.ReactNode}) => {

    return(
        // In here we are forced to assign a value to "value" but since we don't actually need it we just put "undefined"
        <LocalAppContext.Provider value={undefined}>
            {children}
        </LocalAppContext.Provider>
    )
}


// This function is completly optional but its done just to avoid writing a few lines of code more
// If we need to use the context in any of our components we will import this
export const appContext = () => {

    const context = useContext(LocalAppContext);

    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
};

// by default if not specified we export the component
export default {AppContextProvider};