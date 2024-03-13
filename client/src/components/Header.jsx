import { logoBlackSea, qrCode, searchIcon } from "../assets"

const Header = () => {
    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400">
            <div className="w-full h-full flex items-center justify-between">
                <img className="w-14" src={searchIcon} alt="searchIcon" />
                <div>
                    <img className="w-52" src={logoBlackSea} alt="mainLogo" />
                </div>
                <img className="w-14" src={qrCode} alt="QRcode" />
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header
