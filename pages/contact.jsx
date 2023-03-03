import Layout from './Components/Layout/Layout'
import Contact from './Components/Contact';
function contactPage() {
  const heading ={
    fontWeight: 200,
    fontSize: '32px',
    margin:'0px'
    }
  return (
    <Layout>
      <div>
        <h1 style={heading}>Contact us!</h1>
      </div>
      <Contact/>
    </Layout>)
}

export default contactPage