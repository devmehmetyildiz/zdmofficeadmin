import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import ProtectedRoute from './Components/Common/ProtectedRoutes';

const Categories = lazy(() => import('./Pages/Categories'));
const CategoriesCreate = lazy(() => import('./Pages/Categories/Create'));
const CategoriesEdit = lazy(() => import('./Pages/Categories/Edit'));

const Subcategories = lazy(() => import('./Pages/Subcategories'));
const SubcategoriesCreate = lazy(() => import('./Pages/Subcategories/Create'));
const SubcategoriesEdit = lazy(() => import('./Pages/Subcategories/Edit'));

const Productgroups = lazy(() => import('./Pages/Productgroups'));
const ProductgroupsCreate = lazy(() => import('./Pages/Productgroups/Create'));
const ProductgroupsEdit = lazy(() => import('./Pages/Productgroups/Edit'));

const Products = lazy(() => import('./Pages/Products'));
const ProductsCreate = lazy(() => import('./Pages/Products/Create'));
const ProductsEdit = lazy(() => import('./Pages/Products/Edit'));

const Companies = lazy(() => import('./Pages/Company'));
const CompaniesCreate = lazy(() => import('./Pages/Company/Create'));
const CompaniesEdit = lazy(() => import('./Pages/Company/Edit'));

const Files = lazy(() => import('./Pages/Files'));
const FilesCreate = lazy(() => import('./Pages/Files/Create'));
const FilesEdit = lazy(() => import('./Pages/Files/Edit'));

const Error404 = lazy(() => import('./Pages/error-pages/Error404'));
const Error500 = lazy(() => import('./Pages/error-pages/Error500'));
const Login = lazy(() => import('./User/Login'));
const Register = lazy(() => import('./User/Register'));
const Lockscreen = lazy(() => import('./User/Lockscreen'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <ProtectedRoute exact path="/Categories" component={ Categories } />
          <ProtectedRoute exact path="/Categories/Create" component={ CategoriesCreate } />
          <ProtectedRoute exact path="/Categories/:Id" component={ CategoriesEdit } />

          <ProtectedRoute exact path="/Companies" component={ Companies } />
          <ProtectedRoute exact path="/Companies/Create" component={ CompaniesCreate } />
          <ProtectedRoute exact path="/Companies/:Id" component={ CompaniesEdit } />

          <ProtectedRoute exact path="/Subcategories" component={ Subcategories } />
          <ProtectedRoute exact path="/Subcategories/Create" component={ SubcategoriesCreate } />
          <ProtectedRoute exact path="/Subcategories/:Id" component={ SubcategoriesEdit } />

          <ProtectedRoute exact path="/Products" component={ Products } />
          <ProtectedRoute exact path="/Products/Create" component={ ProductsCreate } />
          <ProtectedRoute exact path="/Products/:Id" component={ ProductsEdit } />

          <ProtectedRoute exact path="/Files" component={ Files } />
          <ProtectedRoute exact path="/Files/Create" component={ FilesCreate } />
          <ProtectedRoute exact path="/Files/:Id" component={ FilesEdit } />

          <ProtectedRoute exact path="/Productgroups" component={ Productgroups } />
          <ProtectedRoute exact path="/Productgroups/Create" component={ ProductgroupsCreate } />
          <ProtectedRoute exact path="/Productgroups/:Id" component={ ProductgroupsEdit } />

          <Route exact path="/Login" component={ Login } />       
          <Route exact path="/User/Register" component={ Register } />
          <Route exact path="/User/lockscreen" component={ Lockscreen } />
          <Route exact path="/error-pages/error-404" component={ Error404 } />
          <Route exact path="/error-pages/error-500" component={ Error500 } />
          <Redirect to="/Categories" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;