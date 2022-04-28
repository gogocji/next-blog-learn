import styles from './index.module.scss'
import { useState } from 'react'
interface IProps {
  isShow: boolean,
  onClose: Function
}

const Login = (props: IProps) => {
  console.log(props)
  const { isShow = false, onClose } = props;
  const [ form, setForm ] = useState({
    phone: '',
    varify: ''
  })

  const handleClose = () => {
    onClose && onClose()
  }

  const handleGetVerifyCode = () => {

  }

  const handleLogin = () => {
    console.log(setForm)
  }

  const handleOAuthGithub = () => {

  }

  const handleFormChange = (e) => {
    const { name, value} = e?.target
    setForm({
      ...form,
      [name]: value
    })
  }
  return (
    isShow && (
      <div className={styles.loginArea}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>
            <p>手机登录</p>
            <div className={styles.close} onClick={handleClose}>
              x
            </div>
          </div>
          <input type="text" placeholder="请输入手机号" value={form.phone} onChange={handleFormChange}/>
          <div className={styles.verifyCodeArea}>
            <input type="text" placeholder="请输入验证码" value={form.varify} onChange={handleFormChange}/>
            <span className={styles.verifyCode} onClick={handleGetVerifyCode}>获取验证码</span>
          </div>
          <div className={styles.loginBtn} onClick={handleLogin}>登录</div>
          <div className={styles.otherLogin} onClick={handleOAuthGithub}>使用 Github 登录</div>
          <div className={styles.loginPrivacy}>
            注册登录即表示同意{' '}
            <a
              href="https://moco.imooc.com/privacy.html"
              target="_blank"
              rel="noreferrer"
            >
              隐私政策
            </a>
          </div>
        </div>
      </div>
    )
  );
}

export default Login

