import React,{memo} from 'react'

const Footer = memo(() => {
  return (
  <footer className="bg-gray-800 text-white py-10 px-5 w-full mt-16">
    <div className="max-w-5xl mx-auto">
      <div>
        <h3 className="text-lg">SoftTennisAceReview</h3>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
})

Footer.displayName = "Footer"
export default Footer
