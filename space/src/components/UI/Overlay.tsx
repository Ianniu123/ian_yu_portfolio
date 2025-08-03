'use client'
import Menu from "./Menu"
type Props = {}

const Overlay = ({}: Props) => {
  return (
    <div className="fixed -bottom-51 -right-51">
      <Menu />
    </div>
  )
}

export default Overlay