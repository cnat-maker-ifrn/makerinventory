import { MdSearch } from "react-icons/md";

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
    return (
        <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-lg shadow">
            <MdSearch size={28} className="text-gray-600" />
            <input
                type="text"
                className="flex-1 outline-none text-[18px]"
                placeholder={placeholder || "Buscar..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
