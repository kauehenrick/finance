import AvatarDropdownMenu from "../AvatarDropdownMenu";
import logoImg from "../../assets/logo_soprus.png"

export default function Header() {
    return (
        <div className="max-sm:hidden bg-blue flex justify-between items-center w-full px-10 h-24 mb-5">
            <img src={logoImg} alt="Finance Logo" className="logoImg w-52"/>
            <AvatarDropdownMenu />
        </div>
    )
}