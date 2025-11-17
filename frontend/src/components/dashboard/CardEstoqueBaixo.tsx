import { MdError } from "react-icons/md";

export default function CardEstoqueBaixo(){
    return(
        <>
            <div className="bg-[#FFE3E3] w-[705px] h-[294px] p-4 rounded-md shadow-md">
                <h2 className="flex text-[#DF0A0A] items-center gap-2">
                    <MdError size={28}/>
                    Alertas de estoque baixo
                </h2>
            </div>
        </>
    )
}