import Layout from '@/components/Layout'

const AboutPage = () => {
  return (
    <Layout title="このサイトについて">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-center">About</h1>
        <p className="mt-2">
          何かしらのイベントを作ったり見つけたりするサイトです
        </p>
        <p className="text-sm">Version: 1.0.0</p>
      </div>
    </Layout>
  )
}

export default AboutPage
