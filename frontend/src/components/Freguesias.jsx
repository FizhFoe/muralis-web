// import Axios from "axios"
// import { useEffect, useState } from "react"

// function Freguesias() {
//     const [freguesias, setFreguesias] = useState([])

//     const fetchFreguesias = async () => {
//         const { data } = await Axios.get("https://json.geoapi.pt/municipio/leiria/freguesias")

//         const freguesias = data;
//         setFreguesias(freguesias)
//         console.log(freguesias)
//     };

//     useEffect(() => {
//         fetchFreguesias()
//     }, []);

//     return (
//         <div>
//             { freguesias.map(( freguesia ) => {
//                 <p></p>
//             })}
//         </div>
//     )
// }