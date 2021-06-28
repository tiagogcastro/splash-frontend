import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
interface ISponsorship {
  amount: number;
  allow_withdrawal: boolean;
  sponsorship_code: string;
}
interface ISponsorshipContext {
  sponsorship?: ISponsorship,
  setSponsorship: Dispatch<SetStateAction<ISponsorship>>
}

const SponsorshipContext = createContext<ISponsorshipContext>({} as ISponsorshipContext)

const SponsorshipProvider: React.FC = ({ children }) => {
  const [sponsorship, setSponsorship] = useState<ISponsorship>(() => {
    const sponsorship = Cookies.get('@Lavimco:sponsorship')

    if(!sponsorship) {
      return {} as ISponsorship
    }

    return JSON.parse(sponsorship)
  })
  useEffect(() => {
    if(!!sponsorship)
      Cookies.set('@Lavimco:sponsorship', JSON.stringify(sponsorship))
  }, [sponsorship])

  return <SponsorshipContext.Provider value={{sponsorship, setSponsorship}}>{children}</SponsorshipContext.Provider>
}
export default SponsorshipProvider

export function useSponsorship(): ISponsorshipContext {
  const context = useContext(SponsorshipContext)

  if(!context) throw new Error('useSponsorship must be used within a SponsorshipContext')

  return context
}
