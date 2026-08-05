import { useEffect, useState } from "react";
import FreguesiaService from "../services/freguesias.service";

export default function FreguesiasList({value, onChange, placeholder = 'freguesias', className=''}) {
    const [freguesias, setFreguesias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function listaFreguesias() {
            try {
                const response = await FreguesiaService.getAll();

                const lista = (response.data.freguesias || []).map((nome) => ({
                    id: nome,
                    nome
                }));
                if (!ignore)
                    setFreguesias(lista);
            } catch (e) {
                setError(e.message)
            }
        };


        listaFreguesias();

        return () => {
            ignore = true;
        };
    }, []);


    return (
        <>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={className}
            >

                <option value="">{placeholder}</option>
                {freguesias.map(item => (
                    <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
            </select>
            {error && <p className="error text-sm">{error}</p>}
        </>
    )
};
