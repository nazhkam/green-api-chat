import useStore from '../../store/store';
import './style.css'
import React from 'react'
import useApi from '../../services/useApi';

export const GreenApi = () => {
  const {getStateInstance} = useApi()
  const { apiUrl, instanceId, apiToken, setApiUrl, setInstanceId, setApiToken, setAccess } = useStore();
const checkApi = async () => {
  try{
    
    const data = await getStateInstance()
    if (data.stateInstance === 'authorized') setAccess(true)
    alert(`Состояние аккаунта: ${data.stateInstance}`)
  }
  catch(e){
    alert(`Произошла ошибка ${e.message}`)
    setAccess(false)
  }

}

  return (
    <div className='block'>
      <input className='blockInput' placeholder='ApiUrl' value={apiUrl} onChange={(e) => setApiUrl(e.target.value)}></input>
      <input className='blockInput' placeholder='InstanceId' value={instanceId} onChange={(e) => setInstanceId(e.target.value)}></input>
      <input className='blockInput' placeholder='ApiToken' value={apiToken} onChange={(e) => setApiToken(e.target.value)}></input>
      <button className='blockBtn' onClick={checkApi}> Проверить состояние аккаунта </button>

    </div>
  )
}
