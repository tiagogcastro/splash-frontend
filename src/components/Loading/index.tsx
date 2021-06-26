import React, { useCallback, useState } from 'react'
import styles from './styles.module.scss'
import { AiOutlineLoading } from 'react-icons/ai'
interface ILoadingProps {
  size?: number
  hasHover?: boolean
}
const Loading: React.FC<ILoadingProps> = ({ size = 20, hasHover }) => {
  const [color, setColor] = useState('#222329')

  const handleMouseEnter = useCallback(
    () => {
      if(!!hasHover)
        setColor('#ffffff')
    },
    [],
  )
  const handleMouseLeave = useCallback(
    () => {
      setColor('#222329')
    },
    [],
  )
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.container}
      >
        <AiOutlineLoading color={color} size={size} />
      </div>
    </>
  )
}
export default Loading
