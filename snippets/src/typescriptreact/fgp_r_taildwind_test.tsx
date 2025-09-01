export default function TailwindTestCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🚀 Hola Tailwind</h1>
        <p className="text-gray-600 mb-4">Si ves estilos bonitos, ¡TailwindCSS funciona!</p>
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Probar Botón
        </button>
      </div>
    </div>
  );
}
