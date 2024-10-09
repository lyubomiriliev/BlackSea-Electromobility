import React from 'react'
import { Link } from 'react-router-dom'
import { norwayLogo, okolnaSreda } from '../assets'
import { muncipalities } from '../constants/constants'
import { Trans, useTranslation } from 'react-i18next'

const Partners = () => {

const {t} = useTranslation()

  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <div className="w-full py-10 mt-10 flex items-center bg-secondary">
                <h2 className="w-full text-2xl font-bold text-white text-center font-heading">{t('home.partners')}</h2>
            </div>
            <h2 className="text-xl font-medium mb-6"></h2>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-5">
               {muncipalities.map((muncipality, index) => (
                <Link to={muncipality.url} key={index} >
                    <img src={muncipality.logo} alt="PartnerLogo" className="w-22 md:w-32 h-22 md:h-32" />
                </Link>
               ))}
            </div>
            <div className="w-full flex flex-col md:w-1/3">
                <div className="flex justify-center items-center gap-2 mt-10">
                    <Link to="https://pudoos.bg/">
                        <img className="w-20" src={okolnaSreda} alt="okolnaSreda" />
                    </Link>
                    <h2 className="text-center">{t('home.program')}</h2>
                    <Link to="https://www.eeagrants.bg/bg/2009-2014/%d0%bf%d1%80%d0%be%d0%b3%d1%80%d0%b0%d0%bc%d0%b8">
                        <img className="w-20" src={norwayLogo} alt="norwayLogo" />
                    </Link>
                </div>
                <div className="text-center mt-5">
                    <p>{t('home.programDesc')}</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg text-center mt-4">
                        <Trans i18nKey="home.workTogether">
                            Работим заедно за
                            <span className="text-green-600">по-зелена</span>
                            <span className="text-red-600">по-конкурентна</span>
                            <span className="text-blue-600">по-приобщаваща</span> Европа!
                        </Trans>
                    </h2>
                    <Link to="https://www.eeagrants.bg" className="text-center">
                    <p className="text-blue-600 cursor-pointer mt-4">https://www.eeagrants.bg</p>
                    </Link>
                </div>
            </div>
    </div>
  )
}

export default Partners