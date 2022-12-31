import { createContext, useContext, useState } from "react";

export const CategoryContext = createContext()
CategoryContext.displayName = 'Category'

export default function CategoryProvider({ children }) {

    const [categories, setCategories] = useState([])

    return (
        <CategoryContext.Provider
            value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    )

}

export function useCategoryContext() {

    const { categories, setCategories } = useContext(CategoryContext)

    function addCategory(newCategory) {
        const categoryExists = categories.some(category => category.idCategory === newCategory.idCategory)

        let newListCategories = [...categories]

        if (!categoryExists) {
            newListCategories.push(newCategory)
            return setCategories(newListCategories)
        }
        else {
            newListCategories.splice(newListCategories.indexOf(newCategory), 1)
            return setCategories(newListCategories)
        }
    }
    return {
        categories, addCategory
    }
}