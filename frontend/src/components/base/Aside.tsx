import {
    MdDashboard,
    MdInventory,
    MdExitToApp,
    MdAssignmentReturn,
    MdCompareArrows
} from "react-icons/md";


export default function Aside() {
    return (
        <aside className="w-[279px] h-screen bg-[#29854A] rounded-md shadow-md">
            <nav>
                <ul className="text-white text-[25px]">
                    <li className="hover:bg-[#246f3f] p-8 flex items-center gap-4 cursor-pointer">
                        <MdDashboard size={28} />
                        Dashboard
                    </li>

                    <li className="hover:bg-[#246f3f] p-8 flex items-center gap-4 cursor-pointer">
                        <MdInventory size={28} />
                        Produtos
                    </li>

                    <li className="hover:bg-[#246f3f] p-8 flex items-center gap-4 cursor-pointer">
                        <MdExitToApp size={28} />
                        Saídas
                    </li>

                    <li className="hover:bg-[#246f3f] p-8 flex items-center gap-4 cursor-pointer">
                        <MdAssignmentReturn size={28} />
                        Empréstimos
                    </li>

                    <li className="hover:bg-[#246f3f] p-8 flex items-center gap-4 cursor-pointer">
                        <MdCompareArrows size={28} />
                        Movimentações
                    </li>
                </ul>
            </nav>
        </aside>
    )
}