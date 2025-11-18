export default function MagiaDoJSX (){

    const magia = <strong> HTML dentro de JavaScript!</strong>
    const tecnologias = "React e Next.js"

    return (
        <div className="bg-blue-300 p-3 m-3 rounded-xl">
            <p className="text-gray-600">Este é o meu componente MagiaDoJSX.</p>
            <p className="text-gray-600">Um componente é uma função que retorna JSX - {magia}.</p>
            <p className="text-gray-600">Os componentes são usados em {tecnologias}</p>
        </div>
    )

}