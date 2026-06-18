import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import banner from "../assets/pcos-banner.jpg";
function Home() {
return (
<> <Navbar />


  {/* Hero Section */}

  <section
    className="
    min-h-screen
    bg-gradient-to-r
    from-violet-50
    to-purple-100
    flex
    items-center
    justify-center
    px-8
    "
  >
    <div
      className="
      max-w-7xl
      mx-auto
      grid
      md:grid-cols-2
      gap-12
      items-center
      "
    >
      <div>

        <h1
          className="
          text-5xl
          md:text-6xl
          font-bold
          text-violet-600
          mb-6
          "
        >
          PCOS Detection
        </h1>

        <p
          className="
          text-xl
          text-gray-700
          mb-6
          leading-relaxed
          "
        >
          "Early awareness leads to better health outcomes.
          Detect PCOS risks with the power of Artificial
          Intelligence."
        </p>

        <p
          className="
          text-gray-600
          mb-8
          "
        >
          Our AI-powered platform helps women assess
          their PCOS risk based on symptoms, lifestyle,
          and medical history.
        </p>

        <Link
          to="/signup"
          className="
          bg-violet-500
          hover:bg-violet-600
          text-white
          px-8
          py-4
          rounded-xl
          font-semibold
          shadow-lg
          transition
          "
        >
          Start Assessment
        </Link>

      </div>

      <div>

        

<img
  src={banner}
  alt="PCOS Banner"
  className="rounded-3xl shadow-2xl w-full"
/>

      </div>

    </div>
  </section>

  {/* Features Section */}

  <section className="py-20 bg-white">

    <div className="max-w-6xl mx-auto px-6">

      <h2
        className="
        text-4xl
        font-bold
        text-center
        text-violet-600
        mb-12
        "
      >
        Why Choose Our System?
      </h2>

      <div
        className="
        grid
        md:grid-cols-4
        gap-8
        "
      >

        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h3 className="font-bold text-xl mb-3">
            AI Prediction
          </h3>
          <p>
            Machine learning based PCOS risk prediction.
          </p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h3 className="font-bold text-xl mb-3">
            Early Detection
          </h3>
          <p>
            Identify risk factors before complications arise.
          </p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h3 className="font-bold text-xl mb-3">
            Personalized Assessment
          </h3>
          <p>
            Questions tailored to symptoms and lifestyle.
          </p>
        </div>

        <div className="bg-pink-50 p-6 rounded-2xl shadow">
          <h3 className="font-bold text-xl mb-3">
            Secure Records
          </h3>
          <p>
            Assessment history stored safely in Firebase.
          </p>
        </div>

      </div>

    </div>

  </section>

  {/* About Section */}

  <section className="py-20 bg-purple-50">

    <div className="max-w-5xl mx-auto px-6">

      <h2
        className="
        text-4xl
        font-bold
        text-center
        text-purple-600
        mb-8
        "
      >
        About PCOS
      </h2>

      <p
        className="
        text-lg
        text-gray-700
        leading-relaxed
        text-center
        "
      >
        Polycystic Ovary Syndrome (PCOS) is one of the
        most common hormonal disorders affecting women.
        Symptoms may include irregular periods, acne,
        weight gain, hair fall, and fertility issues.
        Early identification can significantly improve
        health management and quality of life.
      </p>

    </div>

  </section>

  <Footer />
</>


);
}

export default Home;
