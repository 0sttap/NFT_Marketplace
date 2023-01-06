import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    modal: 'scale-0',
    showModal: 'scale-0',
    updateModal: 'scale-0',
    loadModal: {show: false, msg: '' },
    alert: { show: false, msg: '', color: ''},
    connectedAccount: '',
    nft: null,
    nfts: [],
    transactions: []
})

const setAlert = (msg, color='green') => {
    setGlobalState('loadModal', {show: false, msg: ''})
    setGlobalState('alert', {show: true, msg, color})
    setTimeout(() => {
        setGlobalState('alert', {show: false, msg, color})
    }, 6000)
}

const setLoadModalMsg = (msg) => {
    setGlobalState('loadModal', { show: true, msg })
}

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }

export {
    useGlobalState, 
    setGlobalState, 
    getGlobalState, 
    setLoadModalMsg,
    setAlert,
    truncate
}
