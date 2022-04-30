import styles from './index.module.scss'
import { ChangeEvent, useState } from 'react'
import { message } from 'antd'
import { useStore } from 'store/index'
import CountDown from 'components/CountDown'
import request from 'service/fetch'
import { observer } from "mobx-react-lite"

interface IProps {
  isShow: boolean,
  onClose: Function
}

const Login = (props: IProps) => {
  const store = useStore()
  const { isShow = false, onClose } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  const [ form, setForm ] = useState({
    phone: '',
    verify: ''
  })

  const handleClose = () => {
    onClose && onClose()
  }

  const handleGetVerifyCode = () => {
    // setIsShowVerifyCode(true)
    // 校验用户输入的手机号
    if (!form?.phone) {
      message.warning('请输入手机号')
      return
    }

    request.post('/api/user/sendVerifyCode', {
      to: form?.phone,
      templateId: 1
    }).then((res: any) => {
      if (res?.code === 0) {
        setIsShowVerifyCode(true)
      } else {
        message.error(res?.msg || '未知错误')
      }
    })
  }

  const handleLogin = () => {
    request.post('/api/user/login', {
      ...form,
      identity_type: 'phone'
    }).then((res: any) => {
      if (res?.code === 0) {
        // 登录成功
         store.user.setUserInfo(res?.data)
         console.log("1111", store)
        onClose && onClose()
      } else {
        message.error(res?.msg || '未知错误')
      }
    })
  }

  // client-id:b38643ee814f81945179
  // client-secret: c137a9e7f13b334e8f7bcc7d90fa3c2357aa1a79
  const handleOAuthGithub = () => {
    const githubClientId = 'b38643ee814f81945179'
    const redirectUrl = 'http://localhost:3000/api/oauth/redirect'
    window.open(`https://github.com/login/oauth/authorize?client_id${githubClientId}&redirect_uri=${redirectUrl}`)
  }

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false)
  }
  return (
    isShow ? 
      (
        <div className={styles.loginArea}>
          <div className={styles.loginBox}>
            <div className={styles.loginTitle}>
              <p>手机登录</p>
              <div className={styles.close} onClick={handleClose}>
                x
              </div>
            </div>
            <input type="text" placeholder="请输入手机号" name="phone" value={form.phone} onChange={handleFormChange}/>
            <div className={styles.verifyCodeArea}>
              <input type="text" placeholder="请输入验证码" name="verify" value={form.verify} onChange={handleFormChange}/>
              <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
                { isShowVerifyCode ? <CountDown time={60} onEnd={handleCountDownEnd} /> : '获取验证码'}
              </span>
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
    : null
  );
}

export default observer(Login)

