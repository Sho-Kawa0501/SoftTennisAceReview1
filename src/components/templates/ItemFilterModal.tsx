import React, { useState,useContext,useMemo } from 'react'
import Modal from 'react-modal'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { setFilter,selectFilterdSeries} from 'features/item/itemSlice'
import { Position } from 'types/itemTypes'
import { ItemContext } from 'pages'
import { setActiveModal, selectActiveModal } from 'features/app/appSlice'
import CheckBox from 'components/molecules/CheckBox'
import AppButton from 'components/Atoms/AppButton'
import { Series,Brand } from 'types/itemTypes'


//将来的にbrandとpositionを絞り込みに使用する可能性あり
const ItemFilterModal = () => {
  const dispatch = useDispatch()
  const activeModal = useSelector(selectActiveModal)
  const filterdSeries = useSelector(selectFilterdSeries)
  const modalIsOpen = activeModal === 'ItemFilterModal'
  const { brands, series, positions } = useContext(ItemContext)
  const [selectedSeries, setSelectedSeries] = useState<Series[]>(filterdSeries || [])
  const [initialSelectedSeries, setInitialSelectedSeries] = useState<Series[]>([])
  useEffect(() => {
    setSelectedSeries(filterdSeries || [])
  }, [filterdSeries])

  useEffect(() => {
    if (modalIsOpen) {
      setInitialSelectedSeries(selectedSeries)
      console.log("modalopenitemfilterseries/"+selectedSeries)
    }
  }, [modalIsOpen,])
  
  const [selectedBrand, setSelectedBrand] = useState<Brand[]>([])
  const [selectedPosition,setSelectedPosition] = useState<Position[]>([])

  //ブランドごとにシリーズをまとめる
  const seriesByBrand = useMemo(() => {
    return series.reduce((acc: Record<number, Series[]>, s) => {
      const brandId = s.brand.id
      if (!acc[brandId]) {
        acc[brandId] = []
      }
      acc[brandId] = [...acc[brandId], s]
      return acc
    }, {})
  }, [series])
  
  const selectAllSeries = () => {
    setSelectedSeries(series)
  }

  const handleCheck = (value: Series, setter: React.Dispatch<React.SetStateAction<Series[]>>) => 
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setter(prev => {
      if (checked) {
        return [...prev, value] // チェックされた項目を追加
      } else {
        return prev.filter(v => v.id !== value.id) // チェックが外れた項目を除外
      }
    })
  }

  const closeModal = () => {
    dispatch(setActiveModal(null))
    setSelectedSeries(initialSelectedSeries)
  }

  const handleFilter = () => {
    closeModal()
    dispatch(setFilter({ 
      item_brand: selectedBrand, 
      item_series: selectedSeries, 
      position: selectedPosition
    }))
  }

  const clearAll = () => {
    setSelectedBrand([])
    setSelectedSeries([])
    setSelectedPosition([])
  }
  return (
    <>
      <Head>
        <title>SoftTennisAceReview</title>
      </Head>
      <AppButton onClick={() => dispatch(setActiveModal('ItemFilterModal'))} text="Search" type="submit" color="green"/>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => dispatch(setActiveModal(null))} 
        ariaHideApp={false}
        contentLabel="Delete Confirmation"
        className="w-4/5 mt-20 mx-auto bg-white p-6 rounded"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        shouldCloseOnOverlayClick={false}
        shouldFocusAfterRender={true}
      >
        <div>
          <h2 className="text-lg font-bold">Filter Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map(brand => (
            <div key={brand.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              <div className="mt-2">
              {seriesByBrand[brand.id]?.map(s => (
                <CheckBox 
                  key={s.id} 
                  label={s.name} 
                  isChecked={selectedSeries.some(selected => selected.id === s.id)} 
                  onChange={handleCheck(s, setSelectedSeries)}
                />
              ))}
              </div>
            </div>
          ))}
          </div>
          <div>
            <AppButton text="絞り込む" onClick={handleFilter} type="button" color="blue" className="w-full"/>
          </div>
          <AppButton text="全て選択" onClick={selectAllSeries} type="button" color="blue" />
          <AppButton text="選択を全て外す" onClick={clearAll} type="button" color="blue" />
          <AppButton text="閉じる" onClick={closeModal} type="button" color="blue" />
        </div>
      </Modal>
    </>
  )
}

export default ItemFilterModal
