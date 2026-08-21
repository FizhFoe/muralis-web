export default function NovidadesBox({ title }) {

    return (
        <>
            <div className="w-full bg-register rounded-xl h-full">
                <div id="title" className="px-5 py-3 h-auto">
                    <h1 className="text-2xl lowercase font-bold tracking-wide">{title}</h1>
                </div>
            </div>
        </>
    )
}