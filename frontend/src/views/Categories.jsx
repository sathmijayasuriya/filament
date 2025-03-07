import React,{useState} from 'react'
import CategoryHeader from '../components/categories/CategoryHeader';
import CategoryTable from '../components/categories/CategoryTable';

 const Categories = () => {
  const [categoryCreated, setCategoryCreated] = useState(false);

  const handleCategoryCreated = () => {
      setCategoryCreated(!categoryCreated);
  };

  return (
    <div className="m-1 mx-40"> 
            <CategoryHeader onCategoryCreated={handleCategoryCreated} />
            <CategoryTable categoryCreated={categoryCreated} />
    </div>
  )
}

export default Categories;