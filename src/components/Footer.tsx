import React,{memo} from 'react'
import Link from 'next/link'

const Footer = memo(() => {
  return (
  <footer className="bg-gray-800 text-white py-10 px-5">
    <div className="max-w-5xl mx-auto flex justify-between">
      <div>
        <h3 className="text-lg">SoftTennisAceReviews</h3>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div className="space-y-2">
        {/* <Link href="/terms">
          <a className="text-white hover:text-gray-300">Terms & Conditions</a>
        </Link>
        <Link href="/privacy">
          <a className="text-white hover:text-gray-300">Privacy Policy</a>
        </Link>
        <Link href="/contact">
          <a className="text-white hover:text-gray-300">Contact Us</a>
        </Link> */}
      </div>
    </div>
  </footer>
  )
})

export default Footer
