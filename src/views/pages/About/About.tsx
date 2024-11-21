
const About = () => {
  return (
    <div className="bg-black text-white py-10 px-6 text-justify">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-bold mb-6 border-b-2 border-gray-700 pb-2">Quiénes somos</h1>
        <p className="text-lg leading-7 mb-8">
          En <strong>BikeHub</strong>, creemos que el ciclismo no es solo un deporte o una actividad recreativa, sino una pasión
          que merece ser vivida con el mejor equipamiento y las herramientas adecuadas. Somos una plataforma de e-commerce
          innovadora que transforma la manera en que los ciclistas compran bicicletas y accesorios, ofreciendo una experiencia
          personalizada y confiable para cada uno de nuestros usuarios.
        </p>

        {/* Mission Section */}
        <h2 className="text-3xl font-semibold mb-4">Nuestra misión</h2>
        <p className="text-lg leading-7 mb-8">
          Nuestra misión es revolucionar el comercio digital en el mundo del ciclismo. Nos esforzamos por proporcionar una
          experiencia de compra fluida y adaptada a las necesidades de cada ciclista, combinando recomendaciones personalizadas
          con la opción de agendar pruebas de manejo para garantizar decisiones informadas y satisfactorias.
        </p>

        {/* History Section */}
        <h2 className="text-3xl font-semibold mb-4">Nuestra historia</h2>
        <p className="text-lg leading-7 mb-4">
          <strong>BikeHub</strong> nació como respuesta a una necesidad clara en el mercado: crear una plataforma que uniera
          tecnología de punta con la pasión por el ciclismo. Inspirados por estudios recientes sobre la optimización del
          e-commerce y los avances en gestión logística, hemos diseñado un espacio donde cada paso del proceso de compra está
          orientado a maximizar la satisfacción del cliente.
        </p>
        <p className="text-lg leading-7 mb-8">
          La pandemia de COVID-19 marcó un antes y un después en el comercio digital, acelerando la transición hacia plataformas
          online. Aprendimos de ejemplos exitosos en diferentes industrias y adaptamos estas prácticas al ciclismo, permitiendo
          a nuestros usuarios disfrutar de una experiencia de compra eficiente y segura.
        </p>

        {/* What We Do Section */}
        <h2 className="text-3xl font-semibold mb-4">Lo que hacemos</h2>
        <p className="text-lg leading-7 mb-4">
          Ofrecemos bicicletas y accesorios de alta calidad, seleccionados cuidadosamente para satisfacer las expectativas de
          los ciclistas más exigentes. Nuestra plataforma se distingue por:
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg mb-8">
          <li>
            <strong>Recomendaciones personalizadas:</strong> Analizamos tu perfil para ofrecerte opciones que se ajusten a tus
            necesidades y estilo de vida.
          </li>
          <li>
            <strong>Pruebas de manejo:</strong> Agenda una prueba para estar seguro de que tu compra es la indicada.
          </li>
          <li>
            <strong>Compra segura:</strong> Priorizamos la seguridad y facilidad en cada transacción, para que tu experiencia sea
            lo más conveniente posible.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
