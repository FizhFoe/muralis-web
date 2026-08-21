import { useEffect, useState } from "react";
import FreguesiaService from "../services/freguesias.service";
import { Select } from "radix-ui"
import { Check, ChevronDown } from "lucide-react";
import ArrowDown from '../assets/icons/arrow-down-icon.svg?react'

export default function FreguesiasList({ value, onChange, placeholder = 'freguesias' }) {
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
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger className="w-full flex items-center justify-between outline-none rounded-xl p-3 h-9 gap-2 text-gray-400">
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon>
                        <ArrowDown className="h-5 w-5" />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content position="popper" sideOffset={4} className="z-50 overflow-hidden" >
                        <Select.Viewport className=" max-h-60 overflow-y-auto">
                            {freguesias.map(item => (
                                <Select.Item
                                    key={item.id}
                                    value={item.id}
                                    className="relative flex items-center justify-between py-1 px-3 pr-8 select-none data-highlighted:bg-[#D8A852] data-highlighted:text-white outline-none data-[state=checked]:text-font bg-register">
                                    <Select.ItemText className="data-hightlighted:text-font">{item.nome}</Select.ItemText>
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
