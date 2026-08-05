import CategoryService from '../services/category.service';
import { useEffect, useState } from 'react'

function CategoriesList({ value, onChange, placeholder = 'categorias', className = '' }) {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        CategoryService.getAll()
            .then((res) => setCategorias(res.data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={className}
            >
                <option value="">{placeholder}</option>
                {categorias.map(category => (
                    <option key={category.id} value={category.id}>{category.nome}</option>
                ))}
            </select>
            {error && <p className='error text-sm'>{error}</p>}
        </>
    );
}

export default CategoriesList;