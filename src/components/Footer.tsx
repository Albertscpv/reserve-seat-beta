import { InstagramIcon, FacebookIcon, TwitterIcon} from '../Icons/IconsManager'


const Footer = () =>{
    return(
        <>
        <div className='bg-white text-black rounded-sm p-4 flex justify-between '>
            <span>Powered by Samo.</span>
        <div className='flex text-black justify-end'>
            <ul className='flex flex-row gap-6'>
                <li><a href='#'><InstagramIcon/></a></li>
                <li><a href='#'><FacebookIcon/></a></li>
                <li><a href='#'><TwitterIcon/></a></li>
            </ul>
        </div>
        </div>
        </>
    )
}

export default Footer;