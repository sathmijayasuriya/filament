import React from 'react'
import CategoryHeader from '../components/categories/CategoryHeader';
import CategoryTable from '../components/categories/CategoryTable';

 const Categories = () => {
  return (
    <div className="m-1 mx-40"> 
      <CategoryHeader/>
      <CategoryTable/>
    </div>
  )
}

export default Categories;