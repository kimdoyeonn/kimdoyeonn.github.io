import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="text-lg">
      <h2>길을 잃으셨군요!</h2>
      <Link href="/">Home</Link>
    </div>
  )
}

export default NotFound
