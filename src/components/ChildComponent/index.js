const ChildItem = props => {
  const {details} = props
  const {website, name, password} = details
  return (
    <li>
      <p>{website}</p>
      <p>{name}</p>
      <p>{password}</p>
    </li>
  )
}
export default ChildItem
