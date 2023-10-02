import React, { useState,useContext } from 'react'
import Modal from 'react-modal'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { setFilter } from 'features/item/itemSlice'
import { selectItems } from 'features/item/itemSlice'
import { AppDispatch,RootState } from 'app/store'
import { Brand,Series,Position } from 'types'
import { ItemContext } from 'pages'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import CheckBox from 'components/CheckBox'
import AppSubmitButton from 'components/AppSubmitButton'
import AppBackButton from 'components/AppBackButton'


// Modal.setAppElement('#root')

//型定義はどのように行えばよいのか

export interface ItemProps {
  brand: Brand,
  id: number,
  item_name: string,
  item_photo: string,
  item_position: Position,
  release_date: Date,
  series: Series,
  slug: string,
}

interface BSP {
  id:number,
  name:string,
}

//型を指定せよ
const ItemFilterModal = () => {
  const { brands, series, positions } = useContext(ItemContext)
  const activeModal = useSelector(selectActiveModal)
  const originItem = useSelector(selectItems) //使わないかもしれない
  const modalIsOpen = activeModal === 'ItemFilterModal'

  const [selectedBrand, setSelectedBrand] = useState<Brand[]>([])
  const [selectedSeries, setSelectedSeries] = useState<Series[]>([])
  const [selectedPosition,setSelectedPosition] = useState<Position[]>([])
  const filteredItems = useSelector((state: RootState) => state.item.filteredItems)

  const loading = false
  
  const dispatch = useDispatch()
  const router = useRouter()

  const handleCheck = 
  (value: BSP, setter: React.Dispatch<React.SetStateAction<BSP[]>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked
      setter(prev => checked ? [...prev, value] : prev.filter(v => v !== value))
    }

    const closeModal = () => {
      dispatch(setActiveModal(null))
    }

  const handleFilter = () => {
    closeModal()
    dispatch(setFilter({ 
      item_brand: selectedBrand, 
      item_series: selectedSeries, 
      item_position: selectedPosition 
    }))
  }

  const clearAll = () => {
    setSelectedBrand([]);
    setSelectedSeries([]);
    setSelectedPosition([]);
  }

  return (
    <>
      <Head>
        <title>AceRacketRealm</title>
      </Head>
      <AppSubmitButton onClick={() => dispatch(setActiveModal('ItemFilterModal'))}text="Search" />
      <Modal isOpen={modalIsOpen} onRequestClose={() => dispatch(setActiveModal(null))} ariaHideApp={false}>
        <div>
          <h2>Filter items</h2>
          {brands.map(brand => (
              <CheckBox 
                key={brand.id} 
                label={brand.name} 
                isChecked={selectedBrand.includes(brand)} 
                onChange={handleCheck(brand, setSelectedBrand)}
              />
            
          ))}
            {series.map(series => (
              <CheckBox 
                key={series.id} 
                label={series.name} 
                isChecked={selectedSeries.includes(series)} 
                onChange={handleCheck(series, setSelectedSeries)}
            />
            ))
          }

          {positions.map(position => (
            <CheckBox 
              key={position.id} 
              label={position.name} 
              isChecked={selectedPosition.includes(position)} 
              onChange={handleCheck(position, setSelectedPosition)}
            />
          ))}
          <AppSubmitButton text="ALLCLEAR" onClick={clearAll} />
          <AppBackButton text='戻る' className="button-yellow" onClick={closeModal} />
          <AppSubmitButton text="送信" onClick={handleFilter} />
        </div>
      </Modal>
    </>
  )
}

export default ItemFilterModal
