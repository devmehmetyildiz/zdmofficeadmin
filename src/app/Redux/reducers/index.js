import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginReducer";
import { CategoriesReducer } from "./CategoriesReducer"
import { ProductgroupsReducer } from "./ProductgroupsReducer"
import { ProductsReducer } from "./ProductsReducer"
import { SubcategoriesReducer } from "./SubcategoriesReducer"
import { FileReducer } from "./FileReducer"
import { CompanyReducer } from "./CompanyReducer";

const reducers = combineReducers({
    ActiveUser: loginReducer,
    Categories: CategoriesReducer,
    Productgroups :ProductgroupsReducer,
    Products : ProductsReducer, 
    Subcategories : SubcategoriesReducer, 
    Files: FileReducer,
    Companies : CompanyReducer
});

export default reducers;