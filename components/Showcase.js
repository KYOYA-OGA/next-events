import Image from 'next/image'

const Showcase = () => {
  return (
    <div className="relative grid place-content-center h-80">
      <Image
        src="/images/showcase-bg.jpeg"
        layout="fill"
        alt="イベントの様子"
        className="absolute z-10 object-cover w-full h-full filter brightness-50"
      />
      <div className="z-20 font-bold text-center text-white">
        <h1 className="text-2xl md:text-4xl">e-VENTSにようこそ！</h1>
        <h2 className="mt-2">お気に入りのイベントを探しましょう！</h2>
      </div>
    </div>
  )
}

export default Showcase
