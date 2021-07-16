import { useState } from 'react'
import { API_URL } from '@/config/index'

const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold">画像をアップロードする</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="w-full mt-4 btn-red" />
      </form>
    </div>
  )
}

export default ImageUpload
