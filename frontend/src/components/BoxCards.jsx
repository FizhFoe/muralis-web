export default function NovidadesBox({ title }) {

    return (
        <>
            <div id="box" className="w-full bg-register rounded-xl max-h-60">
                <div id="title" className="px-5 py-2">
                    <h1 className="text-2xl lowercase font-bold tracking-wide">{title}</h1>
                </div>
            </div>
        </>
    )
}