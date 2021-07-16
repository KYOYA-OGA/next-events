import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75 outline-none focus:outline-none">
      <div className="z-100 relative bg-white w-full h-[450px] md:w-[500px] md:h-[600px] rounded-xl p-5">
        <header className="flex justify-end text-right">
          <a href="#" onClick={handleClose}>
            <FaTimes className="text-2xl" />
          </a>
        </header>
        {title && <h3 className="text-2xl text-center">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}

export default Modal
