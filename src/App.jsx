import React, { useEffect } from 'react'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Artworks from './components/Artworks'
import Transactions from './components/Transactions'
import Footer from './components/Footer'
import CreateNFT from './components/CreateNFT'
import ShowNFT from './components/ShowNFT'
import UpdateNFT from './components/UpdateNFT'
import Loading from './components/Loading'
import Alert from './components/Alert'
import { getAllNFTs, isWalletConncted } from './Blockchain.services'

const App = () => {

  useEffect(async () => {
    await isWalletConncted()
    await getAllNFTs()

  }, [])
  
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks />
      <Transactions />
      <Footer />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      <Loading />
      <Alert />
    </div>
  )
}

export default App
