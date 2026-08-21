import CategoryService from '../services/category.service';
import { useEffect, useState } from 'react'
import { Select } from "radix-ui"
import ArrowDown from '../assets/icons/arrow-down-icon.svg?react'
import { Check } from "lucide-react";

function CategoriesList({ value, onChange, placeholder = 'categorias'}) {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        CategoryService.getAll()
            .then((res) => setCategorias(res.data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <>
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger className={`w-full flex items-center justify-between outline-none rounded-xl p-3 h-9 gap-2
                    ${value ? 'text-font' : 'text-gray-400'}`}> {/* quando Trigger tem valor no value, muda de cor (ou seja, quando é selecionada uma categoria) */}
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon>
                        <ArrowDown className="h-5 w-5" />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content position="popper" sideOffset={4} className="z-50 overflow-hidden" >
                        <Select.Viewport className="max-h-60 overflow-y-auto bg-register rounded-xl">
                            {categorias.map(categoria => (
                                <Select.Item
                                    key={categoria.id}
                                    value={categoria.id}
                                    className="relative flex items-center justify-between py-1 px-5 select-none data-highlighted:rounded-xl data-highlighted:bg-[#D8A852] data-highlighted:text-white outline-none ">
                                    <Select.ItemText>{categoria.nome}</Select.ItemText>
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
                {categorias.map(category => (
                    <option key={category.id} value={category.id}>{category.nome}</option>
                ))}
            </select> */}
            {error && <p className='error text-sm'>{error}</p>}
        </>
    );
}

export default CategoriesList;