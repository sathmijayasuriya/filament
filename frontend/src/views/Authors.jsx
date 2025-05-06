import React from 'react'
// import AuthorsTableHeader from '../components/Authors/AuthorsTableHeader'
import AuthorsTable from '../components/Authors/AuthorsTable'
import AuthorsTableHeader from '../components/Authors/AuthorsTableHeader'

export default function Authors() {
  return (
    <div>
            <div className="m-1 mx-40 bg-gray-100 h-full"> 
              <AuthorsTableHeader/>
              <AuthorsTable/>
            </div>
    </div>
  )
}
