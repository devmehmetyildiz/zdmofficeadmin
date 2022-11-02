export const ROUTES = {
    AUTH: 'Auth',
    CATEGORIES: 'Categories',
    SUBCATEGORIES: 'Subcategories',
    PRODUCTGROUPS: 'Productgroups',
    PRODUCTS: 'Products',
    FILE: 'File',
    COMPANY : 'Company'
}

export const COLUMNTYPES = {
    NUMBER: 1,
    TEXT: 2,
    DATE: 3
}

export const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#8e8d8d" : null,
        };
    }
};