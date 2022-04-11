import Default from "../../../components/Layout/Default";
import axios from "axios";
import { useUser } from "../../../context/UserContext";



export default function Cart({data})
{


    return(
        <Default>
            {data.name}
            {data.description}
        </Default>
    )
}


// export async function getStaticProps(context)
// {
//     const id  = context.params.id;
//     const res = await axios.get(`http://localhost:3000/products/${id}`);
//     const data = res.data;

//     return{
//         props: {
//             data
//         }
//     }
// }



// export async function getStaticPaths()
// {
    
//     const res = await axios.get("http://localhost:3000/products/");
//     const data = res.data;

//     const paths = data.map((value) => ({
//         params:{
//             id: value._id.toString()
//         }
//     }))

//     // console.log(paths);



//     return{

//         paths,
//         fallback: false,

//     }
// }


export async function getServerSideProps(context)
{
    console.log(context)
    const id  = context.params.id;
    const res = await fetch(`http://localhost:3000/products/${id}`)    
    const data = await res.json()

    return{
        props: {
            data
        }
    }
}
