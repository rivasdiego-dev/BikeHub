
const Contact = () => {
  return (
    <div className=" text-white py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">Contáctanos</h1>
        <p className="text-lg leading-7 mb-8">
          Estamos aquí para ayudarte. Si tienes preguntas sobre nuestros productos, necesitas soporte o simplemente quieres
          conocernos mejor, no dudes en ponerte en contacto con nosotros.
        </p>

        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Correo electrónico</h2>
            <p className="text-lg">
              <a
                href="mailto:contact@bikehub.com"
                className="text-primary hover:underline"
              >
                contact@bikehub.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Teléfono</h2>
            <p className="text-lg">
              <a href="tel:+50312345678" className="text-primary hover:underline">
                +503 1234-5678
              </a>
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">¡Estamos para ayudarte!</h2>
          <p className="text-lg">
            Escríbenos o llámanos en cualquier momento. Nuestro equipo responderá lo antes posible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
