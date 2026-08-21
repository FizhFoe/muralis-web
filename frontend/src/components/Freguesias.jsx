import { useEffect, useState } from "react";
import FreguesiaService from "../services/freguesias.service";
import { Select } from "radix-ui"
import { Check } from "lucide-react";
import ArrowDown from '../assets/icons/arrow-down-icon.svg?react'

export default function FreguesiasList({ value, onChange, placeholder = 'freguesias' }) {
    const [freguesias, setFreguesias] = useState([]);
    const [error, setError] = useState(null);

    function abreviarFreguesias(nome) {
        if (!nome) return nome;

        let abreviado = nome.replace(
            /^Uni(ã|a)o (d[as]s?) ?Freguesias? de \s*/i,
            ''
        );

        return abreviado.trim();
    }

    useEffect(() => {
        let ignore = false;
        async function listaFreguesias() {
            try {
                const response = await FreguesiaService.getAll();

                const lista = (response.data.freguesias || []).map((nome) => ({
                    id: nome,
                    nome: abreviarFreguesias(nome),
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
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger className={`w-full flex items-center justify-between outline-none rounded-xl p-3 h-9 gap-2
                    ${value ? 'text-font' : 'text-gray-400'}`}> {/* quando Trigger tem valor no value, muda de cor (ou seja, quando é selecionada uma freguesia) */}
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon>
                        <ArrowDown className="h-5 w-5" />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content position="popper" sideOffset={4} className="z-50 overflow-hidden" >
                        <Select.Viewport className="max-h-60 overflow-y-auto bg-register rounded-xl">
                            {freguesias.map(item => (
                                <Select.Item
                                    key={item.id}
                                    value={item.id}
                                    className="relative flex items-center justify-between py-1 px-5 select-none data-highlighted:rounded-xl data-highlighted:bg-[#D8A852] data-highlighted:text-white outline-none ">
                                    <Select.ItemText>{item.nome}</Select.ItemText>
                                    <Select.ItemIndicator>
                                        <Check size={14} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
            {/* <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={className}
            >

                <option value="">{placeholder}</option>
                {freguesias.map(item => (
                    <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
            </select> */}
            {error && <p className="error text-sm">{error}</p>}
        </>
    )
};
