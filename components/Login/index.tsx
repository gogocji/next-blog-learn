interface IProps {
  isShow: boolean,
  onClose: Function
}

const Login = (props: IProps) => {
  console.log(props)
  return <div>登录弹窗</div>
}

export default Login