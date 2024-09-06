import AvatarDropdownMenu from "../AvatarDropdownMenu";
import logoImg from "../../assets/finance_logo.png"

export default function Header() {
    return (
        <div className="max-sm:hidden bg-dark-800 flex justify-between items-center w-full px-10 h-24 mb-10">
            <img src={logoImg} alt="Finance Logo" className="logoImg w-52"/>
            <AvatarDropdownMenu />
        </div>
    )
}